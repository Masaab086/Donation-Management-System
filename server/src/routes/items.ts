import express from "express";
import * as itemController from "../controllers/items";

const router = express.Router();

router.post("/", itemController.addItem);
router.get("/", itemController.getItems);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);
router.get("/:id", itemController.getItem);

export default router;
