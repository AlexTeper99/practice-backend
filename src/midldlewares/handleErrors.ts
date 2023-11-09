import { NextFunction, Request, Response } from "express";

export const handleErrors = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error.name === "CastError") {
    console.log("Cast error");
    response.status(400).send({ error: "id used is malformed" });
  } else if (error.name === "ValidationError") {
    response.status(409).send({
      error: error.message,
    });
  } else {
    response.status(500).send({ error: error.message });
  }
};
