import createHttpError from 'http-errors';
import {
  createContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
} from '../services/contacts.js';
import { buildContactsFilter } from '../utils/buildContactsFilter.js';
import { handlePhotoUpload } from '../utils/handlePhotoUpload.js';

export const getAllContactsController = async (req, res) => {
  const filters = buildContactsFilter(req.validatedQuery);
  filters.userId = req.user._id;

  const contacts = await getAllContacts({
    page: req.validatedQuery.page,
    perPage: req.validatedQuery.perPage,
    sortBy: req.validatedQuery.sortBy,
    sortOrder: req.validatedQuery.sortOrder,
    filters,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photoUrl = req.file ? await handlePhotoUpload(req.file) : undefined;

  const contact = await createContact({
    ...req.body,
    userId: req.user._id,
    ...(photoUrl && { photo: photoUrl }),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const photoUrl = req.file ? await handlePhotoUpload(req.file) : undefined;

  const contact = await updateContactById(contactId, {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  });

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

export const deleteContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContactById(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};
