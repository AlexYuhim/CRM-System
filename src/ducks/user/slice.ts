import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./thunk.ts";
import { Profile } from "@/entities/user/model/types.ts";

const initialState: Profile = {
  id: 0,
  username: "",
  email: "",
  date: "",
  isBlocked: false,
  roles: [],
  phoneNumber: "",
  isLoaded: false,
};
// создаем slice который будет хранить данные пользователя
export const profileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    // обработка синхронщины
  },
  extraReducers(builder) {
    // обработка асинхронщины
    builder.addMatcher(getProfile.fulfilled.match, (state, action) => {
      if (action.payload) {
        Object.assign(state, action.payload);
        state.isLoaded = true;
      }
    });
  },
});
