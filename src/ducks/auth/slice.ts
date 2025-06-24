import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./thunk";
import { Profile } from "@/types/types";

interface InitialState {
  accessToken?: string;
  refreshToken?: string;
  user?: Profile;
}

const initialState: InitialState = {
  accessToken: localStorage.getItem("access") || undefined,
  refreshToken: localStorage.getItem("refresh") || undefined,
};
// создаем slice который будет хранить данные
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // все action которые будут использоваться с этим слайсом будут асинхроными и созданны с помощью санков thank
  extraReducers(builder) {
    builder.addMatcher(signUp.fulfilled.match, (state, action) => {});
    builder.addMatcher(signIn.fulfilled.match, (_, action) => {
      console.log("action", action);
      console.log("action.meta.requestStatus", action.meta.requestStatus);
    });
  },
});
