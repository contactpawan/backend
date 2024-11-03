import "babel-polyfill";
import express from "express";
import cors from "cors";
import createRouter from "./router.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(createRouter());
const port = 8000;
app.listen(port);
console.log("App is running on port: ", port);
