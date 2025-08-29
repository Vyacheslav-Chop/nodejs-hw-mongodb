import Joi from 'joi';
import {
  contactTypeValidation,
  emailValidation,
  isFavouriteValidation,
  nameValidation,
  objectIdValidation,
  phoneNumberValidation,
} from './helpers.js';

export const createContactSchema = Joi.object({
  name: nameValidation().required().messages({
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: phoneNumberValidation().required().messages({
    'string.pattern.base':
      'Phone number must be a valid international number starting with + and 8-15 digits. Example: +380931112233',
    'any.required': 'Phone number is required!',
  }),
  email: emailValidation().messages({
    'string.pattern.base':
      'Email must be a valid email address.  Example: john.doe@example.com',
  }),
  isFavourite: isFavouriteValidation(),
  contactType: contactTypeValidation().required().messages({
    'any.only': 'Contact type must be one of: work, home, personal.',
    'any.required': 'Contact type is required!',
  }),
  userId: objectIdValidation(),
});

export const updateContactSchema = Joi.object({
  name: nameValidation().messages({
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  phoneNumber: phoneNumberValidation().messages({
    'string.pattern.base':
      'Phone number must be a valid international number starting with + and 8-15 digits',
  }),
  email: emailValidation().messages({
    'string.pattern.base':
      'Email must be a valid email address.  Example: john.doe@example.com',
  }),
  isFavourite: isFavouriteValidation(),
  contactType: contactTypeValidation().messages({
    'any.only': 'Contact type must be one of: work, home, personal.',
  }),
  userId: objectIdValidation(),
});

export const getContactsQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1).messages({
    'number.base': '"page" must be a number',
    'number.min': '"page" must be at least 1',
  }),
  perPage: Joi.number().min(1).max(50).default(8).messages({
    'number.base': '"perPage" must be a number',
    'number.min': '"perPage" must be at least 1',
    'number.max': '"perPage" cannot be greater than 50',
  }),
  sortBy: Joi.string()
    .valid('_id', 'name', 'createdAt', 'updatedAt')
    .default('_id')
    .messages({
      'any.only':
        '"sortBy" must be one of "_id", "name", "createdAt", "updatedAt"',
    }),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc').messages({
    'any.only': '"sortOrder" must be either "asc" or "desc"',
  }),
  type: contactTypeValidation().messages({
    'any.only': '"type" must be one of "work", "home", "personal"',
  }),
  isFavourite: isFavouriteValidation(),
});
