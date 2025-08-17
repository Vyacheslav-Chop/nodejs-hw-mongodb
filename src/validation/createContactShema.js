import Joi from 'joi';
import {
  contactTypeValidation,
  emailValidation,
  isFavouriteValidation,
  nameValidation,
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
});
