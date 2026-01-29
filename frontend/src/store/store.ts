import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./ticketSlice";
import authReducer from "./authSlice";
import { ticketsApi } from "./api/ticketsApi";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    auth: authReducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ticketsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
