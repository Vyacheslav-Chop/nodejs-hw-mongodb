import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshContactsSesssionController,
  registerUserController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshContactsSesssionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/send-reset-email');

export default authRouter;
