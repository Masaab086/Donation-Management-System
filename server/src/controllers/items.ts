import { Request, Response } from "express";
import mongoose from "mongoose";
import itemModel from "../models/items";
import { addItemSchema } from "../schemas/item";
import { responseObject } from "../types/response";

// Add Item function that add new item to the db
export const addItem = async (req: Request, res: Response) => {
  const { error, value } = addItemSchema.validate(req.body);

  if (error) {
    const response: responseObject = {
      code: "invalid_credintials",
      status: "fail",
      message: error.details[0].message,
    };
    return res.status(401).json(response);
  }

  try {
    res.status(200).json({ status: "success", data: value });
    const newItem = await itemModel.create(value);

    const response: responseObject = {
      code: "record_created",
      status: "success",
      data: newItem,
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);

    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very worong",
    };
    res.status(500).json(response);
  }
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await itemModel.find().exec();
    const response: responseObject = {
      code: "record_founded",
      status: "success",
      data: items,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);

    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very worong",
    };
    res.status(500).json(response);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { error, value } = addItemSchema.validate(req.body);

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };
      return res.status(401).json(response);
    }
    const id = req.params.id;

    // Checking if the params id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: responseObject = {
        code: "invalid_id",
        status: "fail",
        message: "The provided it is not valid",
      };
      return res.status(401).json(response);
    }

    // Updating the data in mongoose
    const udpateItem = await itemModel
      .findByIdAndUpdate(id, value, { new: true })
      .exec();

    // Checking if the updated item is null
    if (!udpateItem) {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We could not found the item with the provided id",
      };

      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_updated",
        status: "success",
        data: udpateItem,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);

    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very worong",
    };
    res.status(500).json(response);
  }
};

// Function that will delete item from the database using the provided id
export const deleteItem = async (req: Request, res: Response) => {
  const _id: string = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      const response: responseObject = {
        code: "invalid_id",
        status: "fail",
        message: "The provided it is not valid",
      };
      return res.status(401).json(response);
    }
    const deletedItem = await itemModel.findByIdAndDelete(_id).exec();

    if (!deletedItem) {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We could not found the item with provided id",
      };
      res.status(402).json(response);
    } else {
      const response: responseObject = {
        code: "record_deleted",
        status: "success",
        message: "Item record deleted successfully",
      };
      res.status(402).json(response);
    }
  } catch (error) {
    console.log(error);

    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very worong",
    };
    res.status(500).json(response);
  }
};

// Function that will get the information of one item
export const getItem = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const response: responseObject = {
        code: "invalid_id",
        status: "fail",
        message: "The provided it is not valid",
      };
      return res.status(401).json(response);
    }

    const item = await itemModel.findById(id).exec();

    if (item) {
      const response: responseObject = {
        code: "record_founded",
        status: "success",
        message: "Record founded successfully",
        data: item,
      };

      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "Sorry we donot found the item with the provided id",
      };

      res.status(200).json(response);
    }
  } catch (error) {
    console.log(error);

    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very worong",
    };
    res.status(500).json(response);
  }
};
