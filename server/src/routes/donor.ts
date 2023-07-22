import * as donorRouter from "../controllers/donor";
import express from "express";

const router = express.Router();

router.post("/", donorRouter.addDonor);
router.get("/", donorRouter.getDonors);
router.get("/:id", donorRouter.getDonor);
router.delete("/:id", donorRouter.deleteDonor);
router.put("/:id", donorRouter.updateDonor);

export default router;
