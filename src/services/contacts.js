import { ContactsCollection } from '../db/models/contact.js';
import { createPaginationData } from '../utils/createPaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 8,
  sortBy = '_id',
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = perPage * (page - 1);

  const contactsConditions = ContactsCollection.find();

  if (filters.type) {
    contactsConditions.where('contactType').equals(filters.type);
  }

  if (typeof filters.isFavourite === 'boolean') {
    contactsConditions.where('isFavourite').equals(filters.isFavourite);
  }

  if (filters.userId) {
    contactsConditions.where('userId').equals(filters.userId);
  }

  const [contacts, contactsCount] = await Promise.all([
    ContactsCollection.find()
      .merge(contactsConditions)
      .limit(perPage)
      .skip(skip)
      .sort({ [sortBy]: sortOrder }),
    ContactsCollection.find().merge(contactsConditions).countDocuments(),
  ]);

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
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );

  return contact;
};

export const deleteContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
