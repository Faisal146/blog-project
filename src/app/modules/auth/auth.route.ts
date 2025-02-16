import { Router } from 'express';
import validationReq from '../../middleware/validateRequest';
import { userValidations } from '../user/user.validation';
import { authControllers } from './auth.controller';

const router = Router();

router.post(
  '/register',
  validationReq(userValidations.createUserValidationSchema),
  authControllers.createUser,
);

router.post('/login', authControllers.loginUser);

export const authRoutes = router;
