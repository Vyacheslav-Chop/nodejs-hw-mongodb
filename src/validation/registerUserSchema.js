import Joi from 'joi';
import { emailValidation, nameValidation, passwordValidation } from './helpers.js';

export const registerUserSchema = Joi.object({
  name: nameValidation().required().messages({
    'string.empty': 'Name field cannot be empty',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: emailValidation().required().messages({
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email field is required',
    'string.pattern.base':
      'Email must be a valid email address.  Example: john.doe@example.com',
  }),
  password: passwordValidation().required().messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password should have at least {#limit} characters',
    'any.required': 'Password is required',
  }),
});


