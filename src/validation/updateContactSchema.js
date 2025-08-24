import Joi from 'joi';
import {
  contactTypeValidation,
  emailValidation,
  isFavouriteValidation,
  nameValidation,
  objectIdValidation,
  phoneNumberValidation,
} from './helpers.js';

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
