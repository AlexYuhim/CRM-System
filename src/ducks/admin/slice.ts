import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/types";
import { getAllUsers, getUserPages, updateUser } from "./thunk";

interface PaginationConfig {
  totalAmount: number;
  currentPage: number;
  pageSize: number;
}

interface initialStateAdminPanel {
  allUser: User[];
  user: User;
  paginationData: PaginationConfig;
}

const initialState: initialStateAdminPanel = {
  allUser: [],
  user: {
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: [],
    phoneNumber: "",
  },
  paginationData: {
    totalAmount: 0,
    currentPage: 1,
    pageSize: 20,
  },
};
// создаем slice который будет хранить данные всех юзеров
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // обработка синхронщины
  },
  extraReducers(builder) {
    // обработка асинхронщины
    builder.addMatcher(getAllUsers.fulfilled.match, (state, action) => {
      console.log("action.payload", action.payload.meta);

      state.allUser = [...action.payload.data];
      state.paginationData.totalAmount = action.payload.meta.totalAmount;
    });
    builder.addMatcher(getUserPages.fulfilled.match, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
    // builder.addMatcher(updateUser.rejected.match, (state, action) => {
    //   if (action.payload) {
    //     state.error = action.payload as string;
    //   }
    // });
  },
});
