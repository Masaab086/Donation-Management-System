import * as expanseController from "../controllers/expanse";
import express from "express";

const router = express.Router();

router.post("/", expanseController.addExpanse);
router.get("/", expanseController.getExpanses);
router.get("/:id", expanseController.getExpanseById);
router.put("/:id", expanseController.updateExpanse);
router.delete("/:id", expanseController.deleteExpanse);

export default router;
