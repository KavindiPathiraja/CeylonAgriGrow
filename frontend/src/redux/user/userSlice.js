import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, resetPassword } from '../auth/authActions';


const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    forgotPasswordStatus: null,
    resetStatus: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state, action) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state, action) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        resetForgotPasswordStatus: (state) => {
            state.forgotPasswordStatus = null;
        },
        resetResetStatus: (state) => {
            state.resetStatus = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordStatus = 'loading';
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.forgotPasswordStatus = 'success';
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPasswordStatus = 'error';
            })
            .addCase(resetPassword.pending, (state) => {
                state.resetStatus = 'loading';
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.resetStatus = 'success';
            })
            .addCase(resetPassword.rejected, (state) => {
                state.resetStatus = 'error';
            });

    },
});

export const {
    signOut,
    signInStart,
    signInFailure,
    signInSuccess,
    signInStdelete,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    resetForgotPasswordStatus,
    resetResetStatus
} = userSlice.actions;
export default userSlice.reducer;