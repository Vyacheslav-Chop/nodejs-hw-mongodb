import { ContactsCollection } from '../db/models/contact.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 8,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const skip = perPage * (page - 1);

  const contacts = await ContactsCollection.find()
    .limit(perPage)
    .skip(skip)
    .sort({ [sortBy]: sortOrder });

  const contactsCount = await ContactsCollection.find().countDocuments();

  return {
    data: contacts,
    ...createPaginationData(contactsCount, page, perPage),
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);

  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);

  return contact;
};

export const updateContactById = async (contactId, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return contact;
};

export const deleteContactById = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);

  return contact;
};
