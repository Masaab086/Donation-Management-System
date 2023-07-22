import { Request, Response } from "express";
import { addExpanseSchema } from "../schemas/expanse";
import { responseObject } from "../types/response";
import expanseModel from "../models/expanse";
import { ResolvePathType } from "mongoose/types/inferschematype";
export const addExpanse = async (req: Request, res: Response) => {
  //   const { error, value } =

  try {
    const { error, value } = addExpanseSchema.validate(req.body);

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };

      return res.status(400).json(response);
    }

    const newExpanse = await expanseModel.create(value);

    const response: responseObject = {
      code: "record_created",
      status: "success",
      message: "Expanse record created successfully",
      data: newExpanse,
    };

    res.status(200).json(response);
  } catch (err) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };

    console.log(response);

    return res.status(500).json(response);
  }
};

// Delete expanse record by id

export const deleteExpanse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    console.log(id);
    const deleteExpanse = await expanseModel.findByIdAndDelete(id).exec();

    if (deleteExpanse) {
      const response: responseObject = {
        code: "record_deleted",
        status: "success",
        message: "Expanse deleted successfully",
        data: deleteExpanse,
      };

      return res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "Expanse record not founded with the id",
        data: deleteExpanse,
      };

      return res.status(404).json(response);
    }
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };

    console.log(response);

    return res.status(500).json(response);
  }
};

// Get all expanses

export const getExpanses = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const LIMIT = 10;
    // const search = req.query.search || "";

    const dateFilter = req.query.dateFilter;
    const type = req.query.type;

    console.log(type);
    // Determine the date range based on the 'dateFilter' value
    const query: any = {};

    if (type != undefined && type != "" && type != "all") {
      query.type = type;
    }
    if (dateFilter != undefined && dateFilter != "all" && dateFilter != "") {
      console.log("Exec");
      let startDate, endDate;

      if (dateFilter === "month") {
        startDate = new Date();
        startDate.setDate(1); // Start of the current month
        endDate = new Date();
      } else if (dateFilter === "year") {
        startDate = new Date();
        startDate.setMonth(0); // Start of the current year
        startDate.setDate(1);
        endDate = new Date();
      }
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    console.log(query);
    const expanses = await expanseModel
      .find(query)
      .skip(page * LIMIT)
      .limit(LIMIT)
      .exec();

    const totalRecords = await expanseModel.countDocuments();

    const pageCount = Math.ceil(totalRecords / LIMIT);

    // const donations = await donationModel.find().exec();

    const resposne: responseObject = {
      code: "record_founded",
      status: "success",
      data: {
        expanses,
        pageCount,
        total: totalRecords,
        currentPage: page + 1,
      },
    };

    return res.status(200).json(resposne);
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

// Get expanse by id

export const getExpanseById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const expanse = await expanseModel.findById(id);

    if (expanse) {
      const response: responseObject = {
        code: "record_founded",
        status: "success",
        message: "Expanse record founded",
        data: expanse,
      };

      return res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "Expanse record not founded",
      };

      return res.status(404).json(response);
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

// Update expanse

export const updateExpanse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { error, value } = addExpanseSchema.validate(req.body);

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };

      return res.status(400).json(response);
    }
    const updatedExpanse = await expanseModel.findByIdAndUpdate(id, {
      ...value,
    });

    if (updatedExpanse) {
      const response: responseObject = {
        code: "record_updated",
        status: "success",
        message: "Expanse updated successfully",
        data: updatedExpanse,
      };

      return res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "Expanse record not founded with the provided id",
        data: updatedExpanse,
      };

      return res.status(404).json(response);
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
