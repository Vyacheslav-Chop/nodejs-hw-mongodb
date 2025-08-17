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
});
