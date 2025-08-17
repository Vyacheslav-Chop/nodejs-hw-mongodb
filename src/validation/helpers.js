import Joi from 'joi';
import { CONTACT_TYPE } from '../constants/constants.js';

export const nameValidation = () => Joi.string().min(3).max(20);

export const phoneNumberValidation = () =>
  Joi.string().pattern(/^\+[1-9][0-9]{7,14}$/);

export const emailValidation = () =>
  Joi.string().pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

export const isFavouriteValidation = () =>
  Joi.bool().messages({
    'boolean.base': '"isFavorite" must be a boolean (true or false)',
  });

export const contactTypeValidation = () =>
  Joi.string().valid(...Object.values(CONTACT_TYPE));
