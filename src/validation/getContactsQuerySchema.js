import Joi from 'joi';

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
});
