import mongoose from "mongoose";

const signinHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  signinDate: {
    type: Date,
    default: Date.now,
  },
});

const SigninHistory = mongoose.model("SigninHistory", signinHistorySchema);
export default SigninHistory;
