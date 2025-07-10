import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./thunk";
import { Profile } from "@/types/types";

const initialState: Profile = {
  id: 0,
  username: "",
  email: "",
  date: "",
  isBlocked: false,
  roles: [],
  phoneNumber: "",
};
// создаем slice который будет хранить данные
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
      }
    });
  },
});
