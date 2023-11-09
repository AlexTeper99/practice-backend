import express from 'express';
import { handleErrors } from '../midldlewares';
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

router.get('/:id', (request, response, _next) => {
  const id = Number(request.params.id);
  const user = users.filter((user) => user.id === id);
  if (!user.length) response.status(404).json({ msg: 'User not found' });
  response.status(200).json(user);
});

router.delete('/:id', (request, response) => {
  const id = Number(request.params.id);
  users = users.filter((user) => user.id !== id);
  response.status(204).end();
});

// router.get("/", (_req, _res, next) => {
//   setTimeout(() => {
//     try {
//       throw new Error("BROKEN");
//     } catch (err) {
//       next(err);
//     }
//   }, 0);
// });

router.use(handleErrors);
