import express from 'express';
import { handleErrors, validateSchema } from '../midldlewares';
import { UserSchema, idParamSchema } from '../schemas/UserSchema';
import { IUser } from '../types';

export let users: IUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'James Doe',
    email: 'Jamesdoe@gmail.com',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Jane Doe',
    email: 'Janedoe@gmail.com',
    password: '123456',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const router = express.Router();

router.get('/', (_request, response, _next) => {
  if (!users.length) response.status(404).json({ msg: 'Users not found' });
  response.status(200).json(users);
});

router.get('/:id', validateSchema(idParamSchema), (request, response, _next) => {
  const id = Number(request.params.id);
  const user = users.filter((user) => user.id === id);
  if (!user.length) response.status(404).json({ msg: 'User not found' });
  response.status(200).json(user);
});

router.put('/:id', validateSchema(UserSchema), (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  const user = users.filter((user) => user.id === id);
  if (!user.length) response.status(404).json({ msg: 'User not found' });
  user[0] = { ...user[0], ...body.body };
  const index = users.findIndex((user) => user.id === id);
  users[index] = user[0];
  response.status(204).end();
});

router.delete('/:id', validateSchema(idParamSchema), (request, response) => {
  const id = Number(request.params.id);
  users = users.filter((user) => user.id !== id);
  response.status(204).end();
});

router.use(handleErrors);
