import express from "express";
import cors from "cors";
import {
  signin,
  signup,
  google,
  signout,
  forgotPassword,
  resetPassword,
} from "../controllers/authControllers.js";

const router = express.Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

export default router;
