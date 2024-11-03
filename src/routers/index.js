import express from "express";
const router = express.Router();

router.get("/", function(req, res, next) {
  // Here we can add our handler on what needs to be done
  res.send("Welcome to Backend Server");
});

export default router;
