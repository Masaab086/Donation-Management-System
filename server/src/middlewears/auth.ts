import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { responseObject } from "../types/response";
import env from "../utils/validateEnv";
import userModel from "../models/user";
import { User } from "../types/user";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1) Get the headers and check whether there is jwt or not

  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token || token === "logged_out") {
    return res.status(401).json({
      code: "logged_out",
      status: "fail",
      message: "You are not logged in",
    });
  }

  // 2) verfication of token
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch (err) {
    console.log("Error : ", err);

    const response: responseObject = {
      code: "unauthenticated",
      status: "fail",
      message: "Invalid Token provided",
    };

    return res.status(401).json(response);
  }

  // 3) check if user still exist
  const currentUser: User | null = await userModel.findById(decoded.id);

  if (!currentUser) {
    const response: responseObject = {
      code: "unauthenticated",
      status: "fail",
      message: "You are not logged in",
    };

    return res.status(400).json(response);
  }

  // 5) Grant Accces To Protected Route
  req.body.currentUser = currentUser;
  return next();
};
