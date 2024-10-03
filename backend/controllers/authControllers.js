import dotenv from "dotenv";
import User from "../models/user.js";
import SigninHistory from "../models/signin.history.js";
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

dotenv.config();

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, password, email, address } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = await User.create({
    username,
    address,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const signinEntry = {
      username: validUser.username,
      email: validUser.email,
      signinDate: new Date(),
    };
    await SigninHistory.create(signinEntry);

    const isAdmin = process.env.ADMIN_EMAILS.includes(email);

    const token = jwt.sign(
      { id: validUser._id, isAdmin },
      process.env.JWT_SECRET
    );
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.RESET_SECRET,
      { expiresIn: "1h" }
    );

    user.resetToken = resetToken;
    await user.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jiniseha@gmail.com",
        pass: "xsga zcjt tkae nmke", // Ideally, use environment variables for security
      },
    });

    let mailOptions = {
      from: "jiniseha@gmail.com",
      to: email,
      subject: "Password Reset Request for Global Bites",
      text: `Hello,\n\nYou requested a password reset for your account. Please click on the following link to reset your password: http://localhost:5173/resetpassword?token=${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return next(errorHandler(500, "Failed to send email"));
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json({ message: "Reset password link sent to your email" });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { resetToken, newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(resetToken, process.env.RESET_SECRET);
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const hashedPassword = bcryptjs.hashSync(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Signout success!");
};
