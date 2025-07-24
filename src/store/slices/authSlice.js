// File: src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register as apiRegister,
  verifyOtp as apiVerifyOtp,
  login as apiLogin,
  loginVerifyOtp as apiLoginVerifyOtp,
  fetchCurrentUser as apiFetchCurrentUser,
} from "../../config/api";

// Thunks for each auth step
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email }, { rejectWithValue }) => {
    try {
      const response = await apiRegister({ username, email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ username, email, otp }, { rejectWithValue }) => {
    try {
      const response = await apiVerifyOtp({ username, email, otp });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await apiLogin({ email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginVerifyOtp = createAsyncThunk(
  "auth/loginVerifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await apiLoginVerifyOtp({ email, otp });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetchCurrentUser();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("milklogs_token"),
    status: "idle",
    error: null,
    isAuthenticated: !!localStorage.getItem("milklogs_token"),
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("milklogs_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "otpSent";
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.status = "succeeded";
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("milklogs_token", token);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "otpSent";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginVerifyOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginVerifyOtp.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.status = "succeeded";
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("milklogs_token", token);
      })
      .addCase(loginVerifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("milklogs_token");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
