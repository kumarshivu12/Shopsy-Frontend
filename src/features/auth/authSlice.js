import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  createUser,
  loginUser,
  signOut,
  //   resetPasswordRequest,
  //   resetPassword,
} from "./authApi";

const initialState = {
  status: "idle",
  loggedInUserToken: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
  error: null,
};

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await loginUser(userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const signOutAsync = createAsyncThunk("auth/signOut", async () => {
  try {
    const response = await signOut();
    return response.data;
  } catch (error) {
    throw error;
  }
});

// export const resetPasswordRequestAsync = createAsyncThunk(
//   "user/resetPasswordRequest",
//   async (email, { rejectWithValue }) => {
//     try {
//       const response = await resetPasswordRequest(email);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);
//     }
//   }
// );

// export const resetPasswordAsync = createAsyncThunk(
//   "user/resetPassword",
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await resetPassword(data);
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || "something went wrong";
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = "idle";
      });

    //   .addCase(resetPasswordRequestAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.mailSent = true;
    //   })
    //   .addCase(resetPasswordAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(resetPasswordAsync.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.passwordReset = true;
    //   })
    //   .addCase(resetPasswordAsync.rejected, (state, action) => {
    //     state.status = "idle";
    //     state.error = action.payload;
    //   });
  },
});

// export const { } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;
