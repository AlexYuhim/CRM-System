import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  authenticated?: boolean;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("access") || undefined,
  refreshToken: localStorage.getItem("refresh") || undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
