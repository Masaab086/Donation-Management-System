import { Request, RequestHandler, Response } from "express";
import { addDonorSchema } from "../schemas/donor";
import donorModel from "../models/donor";
import donationModel from "../models/donation";
import { responseObject } from "../types/response";
import mongoose from "mongoose";

export const addDonor: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { error, value } = addDonorSchema.validate(req.body);

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };

      return res.status(401).json(response);
    }

    const newDonor = await donorModel.create(value);

    if (newDonor) {
      const response: responseObject = {
        code: "record_created",
        status: "success",
        message: "Donor record added successfully",
        data: { donor: newDonor },
      };
      res.status(201).json(response);
    }
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };
    res.status(500).json(response);
    console.log(error);
  }
};

// get donros controller to get donors
export const getDonors: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const LIMIT = 10;
    const search = req.query.search || "";

    const donors = await donorModel
      .find({ donorName: { $regex: search, $options: "i" } })
      .skip(page * LIMIT)
      .limit(LIMIT)
      .exec();

    const totalRecords = await donorModel.countDocuments({
      donorName: { $regex: search, $options: "i" },
    });

    const pageCount = Math.ceil(totalRecords / LIMIT);
    const response: responseObject = {
      code: "record_founded",
      status: "success",
      data: {
        donors: donors,
        total: totalRecords,
        pageCount,
        currentPage: Number(page) + 1,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };
    res.status(500).json(response);
    console.log(error);
  }
};

// get donor with id controller to get donors
export const getDonor: RequestHandler = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Invalid donor id",
      };

      return res.status(401).json(response);
    }

    const donor = await donorModel.findById(id).exec();

    if (donor) {
      // Finding all the donations associated with donor
      const donations = await donationModel.find({ donorId: id });

      const donorInfo = {
        ...donor.toObject(),
        donations: [...donations],
      };
      const response: responseObject = {
        code: "record_founded",
        status: "success",
        data: donorInfo,
      };
      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We dont found the donor with the provided id",
      };
      res.status(404).json(response);
    }
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };
    res.status(500).json(response);
    console.log(error);
  }
};

// Delete donor controller to get donors
export const deleteDonor: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Invalid donor id",
      };

      return res.status(401).json(response);
    }

    const donor = await donorModel.findByIdAndDelete(id).exec();

    if (donor) {
      const response: responseObject = {
        code: "record_founded",
        status: "success",
        message: "Donor deleted successfully",
        data: donor,
      };
      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We cannot found the donor with the provided id",
      };
      res.status(404).json(response);
    }
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };
    res.status(500).json(response);
    console.log(error);
  }
};

// Update donor to update the donor with the id
export const updateDonor: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id;

    const { error, value } = addDonorSchema.validate(req.body);

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };

      return res.status(401).json(response);
    }
    if (!mongoose.isValidObjectId(id)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Invalid donor id",
      };

      return res.status(401).json(response);
    }

    const donor = await donorModel.findByIdAndUpdate(id, value).exec();

    if (donor) {
      const response: responseObject = {
        code: "record_founded",
        status: "success",
        message: "Donor deleted successfully",
        data: donor,
      };
      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We donot found the donor with the provided id",
      };
      res.status(404).json(response);
    }
  } catch (error) {
    const response: responseObject = {
      code: "internal_server_error",
      status: "error",
      message: "Something went very wrong",
    };
    res.status(500).json(response);
    console.log(error);
  }
};
