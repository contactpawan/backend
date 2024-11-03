import bodyParser from "body-parser";
import express from "express";

import indexRouter from "../src/routers/index.js";
import usersRouter from "../src/routers/users.js";
import { ApplicationError } from "./lib/errors.js";

export default function createRouter() {
  const router = express.Router();
  router.use(bodyParser.json());

  // // *****************
  // // * API ENDPOINTS *
  // // *****************
  router.use("/", indexRouter);
  router.use("/user", usersRouter);

  router.all("/*", (req, res, next) => {
    next(new ApplicationError("Not Found", 404));
    res.status(400).send({
      message: "Not Found",
      statusCode: 400
    });
  });

  router.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).send({
        message: err.message,
        statusCode: err.statusCode,
        data: err.data || {}
      });
      return;
    }
    res.status(500).send({
      message: "Uncaught error",
      statusCode: 500
    });
  });
  return router;
}
