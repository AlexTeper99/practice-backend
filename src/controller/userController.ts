import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword, generateId, hashPassword } from '../utils';
import { users } from '../mockedData/users';

const secret = process.env.SECRET || 'dashduiah5d41as5d';

export const userController = {
  getAllUsers: (_request: Request, response: Response, _next: NextFunction) => {
    try {
      if (!users.length) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'User not found',
          },
        });
      }

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          users,
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
  getUserById: (request: Request, response: Response, _next: NextFunction) => {
    const id = Number(request.params.id);
    try {
      const user = users.filter((user) => user.id === id);
      if (!user.length) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'User not found',
          },
        });
      }

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          user,
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
  createUser: async (request: Request, response: Response) => {
    const { body } = request.body;
    try {
      const user = users.filter((user) => user.email === body.email);
      if (user.length) {
        return response.status(500).json({
          message: null,
          code: '2000',
          details: null,
          object: {
            msg: 'User already exist',
          },
        });
      }
      const newUser = {
        id: generateId(),
        ...body,
        password: await hashPassword(body.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          msg: 'User created',
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
  updateUser: (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const { body } = request.body;
    try {
      const userIndex = users.findIndex((user) => user.id === id);
      let user = users[userIndex];
      if (!user) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'User not found',
          },
        });
      }
      user = { ...user, ...body };
      users[userIndex] = user;

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          msg: 'User updated',
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
  updateUserPassword: async (request: Request, response: Response) => {
    const id = Number(request.params.id);
    const { body } = request.body;
    try {
      const userIndex = users.findIndex((user) => user.id === id);
      let user = users[userIndex];

      if (!user) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'User not found',
          },
        });
      }

      const isValidPassword = await comparePassword(body.currentPassword, user.password);

      if (!isValidPassword) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'The current password you entered do not match',
          },
        });
      }

      if (body.newPassword !== body.confirmationNewPassword) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'The new password and the confirmation do not match',
          },
        });
      }
      user = { ...user, password: await hashPassword(body.newPassword, 10) };
      users[userIndex] = user;

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          msg: 'Password updated',
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
  deleteUserById: (request: Request, response: Response) => {
    const id = Number(request.params.id);
    try {
      const userIndex = users.findIndex((user) => user.id === id);
      let user = users[userIndex];
      if (!user) {
        return response.status(409).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'User not found',
          },
        });
      }
      user = { ...user, isDeleted: true };
      users[userIndex] = user;

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          msg: 'User deleted',
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
  userLogin: async (request: Request, response: Response) => {
    try {
      const { body } = request.body;
      const { email, password } = body;

      const user = users.find((user) => user.email === email);

      if (!user) {
        return response.status(401).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'Invalid credentials',
          },
        });
      }

      const isValidPassword = await comparePassword(password, user.password);

      if (!isValidPassword) {
        return response.status(401).json({
          message: null,
          code: '1000',
          details: null,
          object: {
            msg: 'Invalid credentials',
          },
        });
      }

      const { firstName, lastName } = user;

      const token = jwt.sign({ email: user.email, firstName }, secret, {
        expiresIn: '30 days',
      });

      return response.status(200).json({
        message: null,
        code: '0000',
        details: null,
        object: {
          msg: 'User logged successfully',
          token,
          firstName,
          lastName,
        },
      });
    } catch (error) {
      return response.status(500).json({
        message: null,
        code: '2000',
        details: null,
        object: {
          msg: error,
        },
      });
    }
  },
};
