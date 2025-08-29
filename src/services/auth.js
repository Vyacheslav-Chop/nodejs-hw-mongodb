import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { createSession, resetPasswordTemplate } from '../helpers/auth.js';
import { sendEmail } from '../utils/sendEmail.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/constants.js';
import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });

  if (existingUser) throw createHttpError(409, 'Email in use!');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  return newUser;
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) throw createHttpError(401, 'User not found');

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteOne({ userId: user._id });

  return SessionsCollection.create(createSession(user._id));
};

export const refreshContactsSession = async (sessionId, refreshToken) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSesionTokenExpirde =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSesionTokenExpirde) {
    await SessionsCollection.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Sesion token expired!');
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    await SessionsCollection.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session not found');
  }

  await SessionsCollection.findByIdAndDelete(sessionId);

  const newSession = SessionsCollection.create(createSession(user._id));

  return newSession;
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

export const requestResetEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) throw createHttpError(404, 'User not found!');

  const host = getEnvVar(ENV_VARS.APP_DOMAIN);
  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
    },
    getEnvVar(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordLink = `${host}/reset-pwd?token=${token}`;

  const template = Handlebars.compile(resetPasswordTemplate);

  const html = template({
    name: user.name,
    link: resetPasswordLink,
    year: new Date().getFullYear(),
  });

  await sendEmail({
    to: email,
    subject: 'Reset your password!',
    html,
  });
};

export const resetPassword = async (token, password) => {
  let entries;
  try {
    entries = jwt.verify(token, getEnvVar(ENV_VARS.JWT_SECRET));
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Token is expired or invalid.');
    }
    if (err instanceof Error) {
      throw createHttpError(401, err.message);
    }
  }

  const user = await UsersCollection.findById(entries.sub);

  if (!user) throw createHttpError(404, 'User not found');

  user.password = await bcrypt.hash(password, 10);

  await user.save();
};
