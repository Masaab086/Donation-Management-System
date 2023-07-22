import express from "express";
import * as donationController from "../controllers/donation";

const router = express.Router();

router.get("/", donationController.getDonations);
router.post("/", donationController.addDonation);
router.delete("/:id", donationController.deleteDonation);
router.put("/:id", donationController.updateDonation);
router.get("/:id", donationController.getDonation);

export default router;
