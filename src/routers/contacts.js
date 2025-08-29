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
import { isValidId } from '../middlewares/isValidId.js';
import { validateQuery } from '../middlewares/validateQuery.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkPermissionsToInteractWithContact } from '../middlewares/checkPermissionsToInteractWithContact.js';
import { createContactSchema, getContactsQuerySchema, updateContactSchema } from '../validation/contacts.js';


const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.use(
  '/:contactId',
  isValidId,
  checkPermissionsToInteractWithContact,
);

contactsRouter.get(
  '/',
  validateQuery(getContactsQuerySchema),
  ctrlWrapper(getAllContactsController),
);

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactByIdController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactByIdController));

export default contactsRouter;
