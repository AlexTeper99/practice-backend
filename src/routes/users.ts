import express from "express";
import { handleErrors } from "../midldlewares";

export const router = express.Router();

router.get("/", (_req, _res, next) => {
  setTimeout(() => {
    try {
      throw new Error("BROKEN");
    } catch (err) {
      next(err);
    }
  }, 0);
});

router.use(handleErrors);
