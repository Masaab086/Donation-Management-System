import { Request, Response } from "express";
import { loginSchema } from "../schemas/auth";
import { responseObject } from "../types/response";
import { User } from "../types/user";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import env from "../utils/validateEnv";
import { getSafeObject } from "../utils/getSafeObject";

export const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };
      return res.status(401).json(response);
    }

    console.log("Passing");
    // Fetching the user by its email

    const User = await userModel.findOne({ email: value.email });

    console.log(User);

    if (!User) {
      console.log(User);
      const response: responseObject = {
        code: "unauthenticated",
        status: "fail",
        message: "Incorrect email or password",
      };
      return res.status(401).json(response);
    }

    // Now checking the password

    if (!(await bcrypt.compare(value.password, User.password))) {
      const response: responseObject = {
        code: "unauthenticated",
        status: "fail",
        message: "Incorrect email or password",
      };

      return res.status(401).json(response);
    }

    // If it is valid then signing the jwt

    const token = await jwt.sign(
      { _id: User._id, email: User.email },
      env.JWT_SECRET
    );

    const userObject = User.toObject();
    const safeObject = getSafeObject(userObject, ["password"]);

    const response: responseObject = {
      code: "login_success",
      status: "success",
      message: "User Login successfully",
      data: {
        user: safeObject,
        jwt: token,
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };

    console.log(error);

    return res.status(500).json(response);
  }
};

export const requestToResetPassword = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Finding the user with the id

    const user = userModel.findOneAndUpdate({ _id: id }, {});

    if (!user) {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "User doesnot founded with the provided id",
      };

      return res.status(401).json(response);
    }
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };

    console.log(error);

    return res.status(500).json(response);
  }
};
