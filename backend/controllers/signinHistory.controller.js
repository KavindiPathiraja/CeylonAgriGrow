import SigninHistory from "../models/signin.history.js";

export const getSigninHistory = async (req, res, next) => {
  try {
    const signinHistory = await SigninHistory.find().sort({ signinDate: -1 });
    res.status(200).json(signinHistory);
  } catch (error) {
    next(error);
  }
};
