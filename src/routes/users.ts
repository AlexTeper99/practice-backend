import express from 'express';
import jwt from 'jsonwebtoken';
import { handleErrors, validateSchema } from '../midldlewares';
import {
  UserPasswordPutSchema,
  UserPostSchema,
  UserPutSchema,
  IdParamSchema,
  UserLoginSchema,
} from '../schemas/UserSchema';
import { IUser } from '../types';
import { comparePassword, generateId, hashPassword } from '../utils';

const secret = process.env.SECRET || 'dashduiah5d41as5d';

export let users: IUser[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    firstNameKana: 'John',
    lastNameKana: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '123456789',
    gender: 'male',
    newsletterSuscribed: true,
    newsletterPartnersSuscribed: true,
    password: 'asdfghjk',
    birthDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName: 'Erica',
    lastName: 'Doe',
    firstNameKana: 'Erica',
    lastNameKana: 'Doe',
    email: 'ericadoe@gmail.com',
    phoneNumber: '123456789',
    gender: 'female',
    newsletterSuscribed: false,
    newsletterPartnersSuscribed: false,
    password: 'asdfghjk',
    birthDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Doe',
    firstNameKana: 'Jane',
    lastNameKana: 'Doe',
    email: 'janedoe@gmail.com',
    phoneNumber: '123456789',
    gender: 'female',
    newsletterSuscribed: true,
    newsletterPartnersSuscribed: true,
    password: 'asdfghjk',
    birthDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const router = express.Router();

router.get('/', (_request, response, _next) => {
  try {
    if (!users.length) response.status(404).json({ msg: 'Users not found' });
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ msg: error }).end();
  }
});

router.get('/:id', validateSchema(IdParamSchema), (request, response, _next) => {
  const id = Number(request.params.id);
  try {
    const user = users.filter((user) => user.id === id);
    if (!user.length) response.status(404).json({ msg: 'User not found' });
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ msg: error }).end();
  }
});

router.post('/', validateSchema(UserPostSchema), async (request, response) => {
  const { body } = request.body;
  try {
    const user = users.filter((user) => user.email === body.email);
    if (user.length) response.status(500).json({ msg: 'User already exist' }).end();
    const newUser = {
      id: generateId(),
      ...body,
      password: await hashPassword(body.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    response.status(201).json({ msg: 'User created' }).end();
  } catch (error) {
    response.status(500).json({ msg: error }).end();
  }
});

router.put('/:id', validateSchema(UserPutSchema), (request, response) => {
  const id = Number(request.params.id);
  const { body } = request.body;
  try {
    const userIndex = users.findIndex((user) => user.id === id);
    let user = users[userIndex];
    if (!user) response.status(409).json({ msg: 'User not found' });
    user = { ...user, ...body };
    users[userIndex] = user;
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ msg: error }).end();
  }
});

router.put(
  '/update-password/:id',
  validateSchema(UserPasswordPutSchema),
  async (request, response) => {
    const id = Number(request.params.id);
    const { body } = request.body;
    try {
      const userIndex = users.findIndex((user) => user.id === id);
      let user = users[userIndex];
      if (!user) response.status(409).json({ msg: 'User not found' });
      const isValidPassword = await comparePassword(body.currentPassword, user.password);
      if (!isValidPassword)
        response.status(409).json({ msg: 'The current password you entered do not match' });
      if (body.newPassword !== body.confirmationNewPassword)
        response.status(409).json({ msg: 'The new password and the confirmation do not match' });
      user = { ...user, password: await hashPassword(body.newPassword, 10) };
      users[userIndex] = user;
      response.status(204).end();
    } catch (error) {
      response.status(500).json({ msg: error }).end();
    }
  }
);

router.delete('/:id', validateSchema(IdParamSchema), (request, response) => {
  const id = Number(request.params.id);
  try {
    const userIndex = users.findIndex((user) => user.id === id);
    let user = users[userIndex];
    user = { ...user, isDeleted: true };
    users[userIndex] = user;
    response.status(204).end();
  } catch (error) {
    response.status(500).json({ msg: error }).end();
  }
});

router.post('/login', validateSchema(UserLoginSchema), async (request, response) => {
  try {
    const { body } = request.body;
    const { email, password } = body;

    const user = users.find((user) => user.email === email);

    if (!user) {
      return response.status(401).json({ msg: 'Invalid credentials' }).end();
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return response.status(401).json({ msg: 'Invalid credentials' }).end();
    }

    const { firstName, lastName } = user;

    const token = jwt.sign({ email: user.email, firstName }, secret, {
      expiresIn: '30 days',
    });

    response
      .status(201)
      .json({ msg: 'User logged successfully', token, firstName, lastName })
      .end();
  } catch (error) {
    response.status(500).json({ msg: error }).end();
  }
});

router.use(handleErrors);
