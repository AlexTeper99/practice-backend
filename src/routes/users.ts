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

router.get('/', (_req, res, _next) => {
  res.json(users);
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
