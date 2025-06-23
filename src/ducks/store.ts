import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat([]);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
