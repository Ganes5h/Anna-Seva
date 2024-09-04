import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isTokenExpired } from "../../utils/token";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      console.log("Logging out...");
      state.user = null;
      state.token = null;
    },
    setCredentials: (state, action) => {
      console.log("Setting credentials...");
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        console.log("Login request pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Login request fulfilled...");
        const { token, user } = action.payload;
        if (isTokenExpired(token)) {
          state.error = "Session expired, please log in again";
          state.user = null;
          state.token = null;
        } else {
          state.user = user;
          state.token = token;
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Login request rejected...");
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
