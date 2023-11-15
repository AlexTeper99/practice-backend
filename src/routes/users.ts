import express from 'express';
import { handleErrors, validateSchema } from '../midldlewares';
import {
  UserPasswordPutSchema,
  UserPostSchema,
  UserPutSchema,
  IdParamSchema,
  UserLoginSchema,
} from '../schemas/UserSchema';
import { userController } from '../controller/userController';

export const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:id', validateSchema(IdParamSchema), userController.getUserById);

router.post('/', validateSchema(UserPostSchema), userController.createUser);

router.put('/:id', validateSchema(UserPutSchema), userController.updateUser);

router.put(
  '/update-password/:id',
  validateSchema(UserPasswordPutSchema),
  userController.updateUserPassword
);

router.delete('/:id', validateSchema(IdParamSchema), userController.deleteUserById);

router.post('/login', validateSchema(UserLoginSchema), userController.userLogin);

router.use(handleErrors);
