import type { RootState } from "../store";

export const selectTickets = (state: RootState) => state.tickets.tickets;
export const selectTicketsPagination = (state: RootState) =>
  state.tickets.pagination;

