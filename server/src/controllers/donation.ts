import { Request, Response } from "express";
import mongoose from "mongoose";
import donation from "../models/donation";
import donationModel from "../models/donation";
import donorModel from "../models/donor";
import { donationSchema, updateDonationSchema } from "../schemas/donation";
import { Donation } from "../types/donations";
import { responseObject } from "../types/response";

// Get donations controller to get all donations
export const getDonations = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) - 1 || 0;
    const LIMIT = 10;
    // const search = req.query.search || "";

    const dateFilter = req.query.dateFilter;
    const type = req.query.type;

    // Determine the date range based on the 'dateFilter' value
    const query: any = {};

    if (type != "" && type != "all") {
      if (type === "inkind") {
        query.donationType = "In Kind";
      } else if (type === "money") {
        query.donationType = "Money";
      }
    }
    if (dateFilter != "all" && dateFilter != "") {
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

    // Construct the query based on the date range

    // if (startDate && endDate) {
    //   query.createdAt = { $gte: startDate, $lte: endDate };
    // }

    const donations = await donationModel
      .find(query)
      .skip(page * LIMIT)
      .limit(LIMIT)
      .exec();

    const totalRecords = await donationModel.countDocuments();

    const pageCount = Math.ceil(totalRecords / LIMIT);

    // const donations = await donationModel.find().exec();

    if (donations) {
      const resposne: responseObject = {
        code: "record_founded",
        status: "success",
        data: {
          donations,
          pageCount,
          total: totalRecords,
          currentPage: page + 1,
        },
      };
      res.status(200).json(resposne);
    } else {
      const resposne: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We cannot found any donation data",
      };
      res.status(404).json(resposne);
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

// Add doantion function

export const addDonation = async (req: Request, res: Response) => {
  try {
    // Extracting the value
    const { error, value } = donationSchema.validate(req.body);

    // Checking the validation errors
    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };
      return res.status(401).json(response);
    }
    const info: Donation = {
      donorId: value.donorId,
      ammount: value.ammount,
      description: value.description,
      donationType: value.donationType,
    };
    // Checking if the donorid is valid
    if (!mongoose.isValidObjectId(value.donorId)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Please provide a valid donor Id",
      };
      return res.status(401).json(response);
    }
    // Checking if the donor exists
    const isDonorExists = await donorModel.exists({ _id: value.donorId });
    if (!isDonorExists) {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "We donot found the donor with the provided donor Id",
      };
      return res.status(404).json({ response });
    }
    // Now add the new donation in db
    const newDonation = await donationModel.create(info);

    const response: responseObject = {
      code: "record_created",
      status: "success",
      data: newDonation,
    };
    res.status(201).json(response);
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

// GetDonation by id controller to get a donation
export const getDonation = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Checking if the id is valid id

    if (!mongoose.isValidObjectId(id)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Invalid donation id",
      };

      return res.status(404).json(response);
    }

    const donation = await donationModel.findById(id).exec();

    // Checking if found the donation
    if (!donation) {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message:
          "We do not found the record for donation with the provided donation Id",
      };

      res.status(404).json(response);
    } else {
      const response: responseObject = {
        code: "record_founded",
        status: "success",
        message: "Donation record founded successfully",
        data: donation,
      };

      res.status(200).json(response);
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

// Delete donation controller to delete a donation from the db
export const deleteDonation = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    if (!mongoose.isValidObjectId(id)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Please provide a valid donation id",
      };
      return res.status(401).json(response);
    }

    const donation = await donationModel.findByIdAndDelete(id);

    if (donation) {
      // Now removing from the donor table
      await donorModel.updateMany(
        { donations: donation._id },
        { $pull: { donations: donation._id } }
      );

      const response: responseObject = {
        code: "record_deleted",
        status: "success",
        message: "Donation record deleted",
        data: donation,
      };

      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "Donation record not founded",
      };

      res.status(404).json(response);
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
// Update donation controller to update a donation from the db
export const updateDonation = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { error, value } = updateDonationSchema.validate(req.body);
  try {
    if (!mongoose.isValidObjectId(id)) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: "Please provide a valid donation id",
      };
      return res.status(401).json(response);
    }

    if (error) {
      const response: responseObject = {
        code: "invalid_credintials",
        status: "fail",
        message: error.details[0].message,
      };
      return res.status(401).json(response);
    }

    const donation = await donationModel.findByIdAndUpdate(id, value);
    if (donation) {
      const response: responseObject = {
        code: "record_updated",
        status: "success",
        message: "Donation record updated successfully",
        data: donation,
      };

      res.status(200).json(response);
    } else {
      const response: responseObject = {
        code: "record_not_founded",
        status: "fail",
        message: "Donation record not founded",
      };

      res.status(404).json(response);
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
