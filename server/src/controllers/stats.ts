import { responseObject } from "../types/response";
import donationModel from "../models/donation";
import expanseModel from "../models/expanse";
import donorModel from "../models/donor";
import { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const totalDonations = await donationModel
      .aggregate([
        {
          $group: {
            _id: null,
            totalMoney: { $sum: "$ammount" },
          },
        },
      ])
      .exec();

    // Counting total Donations

    const donationCount = await donationModel.countDocuments();

    // Getting the total Donors
    const donorCount = await donorModel.countDocuments();

    // Fetching the total expanse

    const totalExpanse = await expanseModel
      .aggregate([
        {
          $group: {
            _id: null,
            totalMoney: { $sum: "$ammount" },
          },
        },
      ])
      .exec();

    const donations = await donationModel.find().exec();
    const expanse = await expanseModel.find().exec();

    const data: any = {
      donationCount: 0,
      donationAmount: 0,
      expanseAmount: 0,
      donorCount: 0,
      donations: [],
      expanses: [],
    };

    data.donationCount = donationCount;
    data.donationAmount =
      totalDonations.length > 0 ? totalDonations[0].totalMoney : 0;
    data.expanseAmount =
      totalExpanse.length > 0 ? totalExpanse[0].totalMoney : 0;
    data.donorCount = donorCount;
    data.donations = donations;
    data.expanses = expanse;

    const response: responseObject = {
      code: "record_founded",
      message: "Dashboard data fetched",
      status: "success",
      data,
    };

    return res.status(200).json(response);
  } catch (err) {
    const response: responseObject = {
      code: "internal_server_error",
      message: "Something went very wrong",
      status: "error",
    };
    console.log(err);

    return res.status(500).json(response);
  }
};
