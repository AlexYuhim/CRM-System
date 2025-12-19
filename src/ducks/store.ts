import { authReducer } from "@/features/auth/model/index.ts";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./user/index.ts";
import { adminReducer } from "./admin/index.ts";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  admin: adminReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([]);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};
