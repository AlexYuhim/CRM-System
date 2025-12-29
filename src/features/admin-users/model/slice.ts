import { User } from "@/entities/user/model/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers, getUserPages } from "./thunk.ts";

interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isBlocked?: boolean | string;
  limit?: number; // сколько на странице
  page?: number; // номер пачки
  totalAmount?: number;
}

interface initialStateAdminPanel {
  allUser: User[];
  user: User;
  userFilters: UserFilters;
  error: string | null;
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
  userFilters: {},
  error: null,
};
// создаем slice который будет хранить данные всех юзеров
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    saveUserFiltersQueryParams(
      state,
      action: PayloadAction<Partial<UserFilters>>
    ) {
      state.userFilters = { ...state.userFilters, ...action.payload };
    },
    // обработка синхронщины
  },
  extraReducers(builder) {
    // обработка асинхронщины
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUser = action.payload.data ? [...action.payload.data] : [];
        state.userFilters.totalAmount = action.payload.meta.totalAmount;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    builder.addMatcher(getUserPages.fulfilled.match, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    });
  },
});

export const { saveUserFiltersQueryParams, clearError } = adminSlice.actions;
