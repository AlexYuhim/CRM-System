import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { profileReducer } from "./users";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([]);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
