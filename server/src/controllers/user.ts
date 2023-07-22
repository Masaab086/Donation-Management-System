import { NextFunction, Request, RequestHandler, Response } from "express";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import { addUserSchema } from "../schemas/user";
import { responseObject } from "../types/response";
import { getSafeObject } from "../utils/getSafeObject";
import { User } from "../types/user";

export const getUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const LIMIT = 10;
    const search = req.query.search || "";

    const users = await userModel
      .find({ firstName: { $regex: search, $options: "i" } })
      .skip(page * LIMIT)
      .limit(LIMIT)
      .exec();

    const total = await userModel.countDocuments({
      firstName: { $regex: search, $options: "i" },
    });

    const pageCount = Math.ceil(total / LIMIT);
    const response: responseObject = {
      code: "record_founded",
      status: "success",
      message: "All users fetched",
      data: { users: users, currentPage: page + 1, total, pageCount },
    };
    res.json(response).status(200);
  } catch (error) {
    next();
  }
};

//  add user contolerr
export const addUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error, value } = addUserSchema.validate(req.body);

    if (error) {
      const resposne: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };

      console.log(resposne.message);
      return res.status(401).json(resposne);
    }

    // Checking weather user exists or not

    const isFind: User | null = await userModel.findOne({ email: value.email });

    if (isFind) {
      const response: responseObject = {
        code: "email_taken",
        status: "fail",
        message: "Another user exists with this email",
      };
      return res.status(401).json(response);
    }

    const hashPassword: string = await bcrypt.hash(value.password, 10);

    const user = await userModel.create({
      ...value,
      password: hashPassword,
    });

    const userObject = user.toObject();
    const safeUser = getSafeObject(userObject, ["password"]);

    const response: responseObject = {
      code: "user_created",
      status: "success",
      message: "User record added successfully",
      data: { user: safeUser },
    };
    res.status(201).json(response);
  } catch (error) {
    next();
  }
};
//  update user contolerr
export const updateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;

  try {
    console.log({
      firstName,
      lastName,
      email,
      phone,
    });
    const user = await userModel
      .findByIdAndUpdate(_id, {
        firstName,
        lastName,
        email,
        phone,
      })
      .exec();

    res.status(201).json({
      status: "success",
      code: "record_updated",
      data: { user: user },
    });
  } catch (error) {
    next();
  }
};
//  delete user contolerr
export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const user = await userModel.findByIdAndDelete(id).exec();

    res.status(201).json({
      status: "success",
      code: "record_deleted",
      data: { user: user },
    });
  } catch (error) {
    next();
  }
};

// get user controller
export const getUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);

    const response: responseObject = {
      code: "record_founded",
      status: "success",
      message: "All users fetched",
      data: { user: user },
    };
    res.status(200).json(response);
  } catch (error) {
    next();
  }
};
