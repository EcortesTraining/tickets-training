import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SLICES_NAMES } from "./constants";

export interface Ticket {
  id: string;
  user: string;
  priority: "hight" | "medium" | "low";
  status: "open" | "closed";
  subject: string;
  comments: string;
  files: string[];
}

interface TicketsState {
  tickets: Ticket[];
  ticket: Ticket | undefined;
}

const initialState: TicketsState = {
  tickets: [],
  ticket: undefined,
};

export const ticketsSlice = createSlice({
  name: SLICES_NAMES.tickets,
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tickets[index] = action.payload;
    },
    clearTickets: (state) => {
      state.tickets = [];
    },
    setTicket: (state, action: PayloadAction<Ticket | undefined>) => {
      state.ticket = action.payload;
    },
  },
});

export const {
  addTicket,
  removeTicket,
  updateTicket,
  clearTickets,
  setTicket,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
