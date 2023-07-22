import express from "express";
import * as statsController from "../controllers/stats";

const router = express.Router();

router.get("/", statsController.getDashboard);

export default router;
