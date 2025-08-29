import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contact.js';

export const checkPermissionsToInteractWithContact = async (req, res, next) => {
  const contact = await ContactsCollection.findById(req.params.contactId);

  if (!contact?.userId?.equals(req.user._id))
    throw createHttpError(
      403,
      'You do not have permission to access this contact',
    );

  next();
};
