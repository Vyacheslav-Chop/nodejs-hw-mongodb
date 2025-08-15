import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactController,
  deleteContactByIdController,
  getAllContactsController,
  getContactByIdController,
  updateContactByIdController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/createContactShema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.use('/contacts/:contactId', isValidId);

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/contacts/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);

contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactByIdController),
);

export default contactsRouter;
