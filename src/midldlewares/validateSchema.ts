import { NextFunction, Request, Response } from 'express';

export const validateSchema =
  (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: request.body.body,
        params: request.params,
      });
      return next();
    } catch (err: any) {
      return response.status(500).json({ type: err.name, message: err.message });
    }
  };
