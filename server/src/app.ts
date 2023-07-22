import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/user";
import donorRouter from "./routes/donor";
import donationRouter from "./routes/donation";
import itemRouter from "./routes/items";
import statsRouter from "./routes/stats";
import expanseRouter from "./routes/expanse";
import morgan from "morgan";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import { authRouter } from "./routes/auth";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/donor", donorRouter);
app.use("/api/item", itemRouter);
app.use("/api/donation", donationRouter);
app.use("/api/stats", statsRouter);
app.use("/api/expanse", expanseRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unkown error occered";
  let statusCode = 500;

  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  res.status(statusCode).json({ errorMessage: errorMessage });
});

export default app;
