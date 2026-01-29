import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SLICES_NAMES } from "./constants";

export interface Ticket {
  id: string;
  user: string;
  priority: "hight" | "medium" | "low";
  createdAt: string;
  status: "open" | "closed";
  subject: string;
  comments: string;
  files: string[];
}

interface TicketsState {
  tickets: Ticket[];
  ticket: Ticket | undefined;
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

const initialState: TicketsState = {
  tickets: [],
  ticket: undefined,
  pagination: {
    page: 0,
    perPage: 10,
    total: 0,
    totalPages: 0,
  },
};

export const ticketsSlice = createSlice({
  name: SLICES_NAMES.tickets,
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    setPagination: (
      state,
      action: PayloadAction<TicketsState["pagination"]>,
    ) => {
      state.pagination = action.payload;
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
  setTickets,
  setPagination,
  setTicket,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
