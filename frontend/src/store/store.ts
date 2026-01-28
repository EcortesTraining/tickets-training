import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./ticketSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
