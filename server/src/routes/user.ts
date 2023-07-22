import * as usersController from "../controllers/user";
import express from "express";

const router = express.Router();
router.get("/", usersController.getUsers);
router.get("/:userId", usersController.getUser);
router.post("/", usersController.addUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

export default router;
