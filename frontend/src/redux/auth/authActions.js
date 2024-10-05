import { createAsyncThunk } from "@reduxjs/toolkit";

export const RESET_PASSWORD_START = "RESET_PASSWORD_START";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const resetPasswordStart = () => ({
  type: RESET_PASSWORD_START,
});

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordFailure = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5556/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while resetting the password"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotpassword",
  async (email, { rejectWithValue }) => {
    try {
      // Ensure email is sent as a string
      const emailString = email.email;

      const response = await fetch(
        "http://localhost:5556/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailString }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset password email");
      }

      return { message: "Reset password link sent to your email", ...data };
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while sending reset password email"
      );
    }
  }
);
