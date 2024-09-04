import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isTokenExpired } from "../../utils/token";

const initialState = {
  admin: null,
  adminToken: null,
  loading: false,
  error: null,
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogout: (state) => {
      console.log("Logging out admin...");
      state.admin = null;
      state.adminToken = null;
    },
    setAdminCredentials: (state, action) => {
      console.log("Setting admin credentials...");
      state.admin = action.payload.admin;
      state.adminToken = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        console.log("Admin login request pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log("Admin login request fulfilled...");
        const { token, message } = action.payload;
        if (isTokenExpired(token)) {
          state.adminToken = token;
          state.error = null;
          // Optionally, you may want to decode and use the token for further actions
        } else {
          state.error = message;
        }
        state.loading = false;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        console.log("Admin login request rejected...");
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { adminLogout, setAdminCredentials } = adminSlice.actions;
export default adminSlice.reducer;
