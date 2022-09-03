import "dotenv/config";
import express from "express";
import helmet from "helmet";
// to not send sensative information

import cors from "cors";
// 1. first initialize express
const app = express();

// 2. doing this so that we get data from post method.
app.use(express.json());

// 3. doing this for the middle ware so that our api will go to client
app.use(cors());

// using helmet for protection
app.use(helmet());

const PORT = process.env.PORT || 8000;

dbConfig();

// apis
import adminUserRouter from "./src/routers/adminUserRouter.js";
import categoryRouter from "./src/routers/categoryRouter.js";
import { dbConfig } from "./src/config/dbConfig.js";
app.use("/api/v1/admin-user", adminUserRouter);
app.use("/api/v1/category", categoryRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Hi there, you got lost?",
  });
});

app.use("/", (req, res, next) => {
  res.json({
    status: "name",
  });
});

// instead of handling error from every router we are creating global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.status || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

// 2. listen for server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
