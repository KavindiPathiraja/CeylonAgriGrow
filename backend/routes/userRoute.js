import express from "express";
import cors from "cors";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  deleteOneUser,
  updateOneUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.use(cors());

router.get("/users", getAllUsers);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.delete("/deleteone/:id", deleteOneUser);
router.put("/updateone/:id", updateOneUser);

export default router;
