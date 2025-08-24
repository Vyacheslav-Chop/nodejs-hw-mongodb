import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader)
    throw createHttpError(401, 'Please provide Authorization header');

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken)
    throw createHttpError(401, 'Token should be of type Bearer');

  const session = await SessionsCollection.findOne({ accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    await SessionsCollection.findByIdAndDelete(session._id);
    throw createHttpError(401, 'User, associated with session, not found');
  }

  req.user = user;

  next();
};
