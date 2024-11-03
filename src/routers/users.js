import express from "express";
const router = express.Router();
import { addUser, deleteUser, getUsers } from "../controllers/user.controller.js";
import { HTTP_CODES, RESPONSE_MESSAGES } from "../lib/constants.js";

router.get("/", function(req, res, next) {
  //Here we can specify what needs to happen if server is getting request as /user
  res.send("User route has been called.");
});

router.post("/add", async function(req, res, next) {
  const response = await addUser(req.body);
  let message = RESPONSE_MESSAGES.ADDED;
  let statusCode = HTTP_CODES.SUCCESS;
  switch (response) {
    case HTTP_CODES.BAD_REQUEST:
        message = RESPONSE_MESSAGES.BAD_REQUEST;
        statusCode = HTTP_CODES.BAD_REQUEST;
      break;
    case HTTP_CODES.INTERNAL_SERVER_ERROR:
        message = RESPONSE_MESSAGES.ERROR;
        statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
      break;
  }
  res.status(statusCode).send({
    message,
    statusCode
  });
});

router.delete("/remove/:id", async function(req, res, next) {
  const response = await deleteUser(req.params.id);
  let message = RESPONSE_MESSAGES.REMOVED;
  let statusCode = HTTP_CODES.SUCCESS;
  switch (response) {
    case HTTP_CODES.BAD_REQUEST:
        message = RESPONSE_MESSAGES.BAD_REQUEST;
        statusCode = HTTP_CODES.BAD_REQUEST;
      break;
    case HTTP_CODES.INTERNAL_SERVER_ERROR:
        message = RESPONSE_MESSAGES.ERROR;
        statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
      break;
    case HTTP_CODES.NOT_FOUND:
      message = RESPONSE_MESSAGES.NOT_FOUND;
      statusCode = HTTP_CODES.SUCCESS;
      break;
  }
  res.status(statusCode).send({
    message,
    statusCode
  });
});

router.get("/list", async function(req, res, next) {
  const response = await getUsers();
  if(response) {
    res.send({
      data: response,
      statusCode: HTTP_CODES.SUCCESS
    });
  } else {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
      message: RESPONSE_MESSAGES.ERROR,
      statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR
    });
  }  
});

export default router;