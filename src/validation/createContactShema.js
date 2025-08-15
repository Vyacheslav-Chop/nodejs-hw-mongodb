import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+[1-9][0-9]{7,14}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be a valid international number starting with + and 8-15 digits. Example: +380931112233',
      'any.required': 'Phone number is required!',
    }),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base':
        'Email must be a valid email address.  Example: john.doe@example.com',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of: work, home, personal.',
      'any.required': 'Contact type is required!',
    }),
});
