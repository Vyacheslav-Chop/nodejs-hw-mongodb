import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../db/models/session.js';
import { createSession } from '../helpers/auth.js';

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
