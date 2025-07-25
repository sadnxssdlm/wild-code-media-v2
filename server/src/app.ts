import cors from "cors";
import express from "express";
import router from "./router";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use(router);

import type { ErrorRequestHandler } from "express";

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};

app.use(logErrors);

const handleHttpError: ErrorRequestHandler = (err, req, res, next) => {
  let { message } = err;
  let status = 500;

  if (err.isAxiosError === true && err.response) {
    ({ message } = err.response.data);
    ({ status } = err.response);
  }

  res.status(status).json({ error: message });
};

app.use(handleHttpError);

export default app;
