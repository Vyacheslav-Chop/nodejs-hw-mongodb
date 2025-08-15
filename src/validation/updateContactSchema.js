import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+[1-9][0-9]{7,14}$/)
    .messages({
      'string.pattern.base':
        'Phone number must be a valid international number starting with + and 8-15 digits',
    }),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      'string.pattern.base':
        'Email must be a valid email address.  Example: john.doe@example.com',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of: work, home, personal.',
  }),
});
