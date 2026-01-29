import { createApi } from "@reduxjs/toolkit/query/react";

import { fakeBaseQuery } from "./fakeBaseQuery";
import type { Ticket } from "../ticketSlice";
import type { User } from "../authSlice";

type StoredTicket = Ticket & { createdAt: string };

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

type CreateTicketRequest = Omit<StoredTicket, "id" | "createdAt">;
type UpdateTicketRequest = Partial<Omit<StoredTicket, "id" | "createdAt">>;

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    getTickets: builder.query<StoredTicket[], void>({
      query: () => ({
        url: "/tickets",
        method: "GET",
      }),
      providesTags: ["Tickets"],
    }),

    createTicket: builder.mutation<StoredTicket, CreateTicketRequest>({
      query: (body) => ({
        url: "/tickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tickets"],
    }),

    getTicket: builder.query<StoredTicket, string>({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "GET",
      }),
    }),

    updateTicket: builder.mutation<StoredTicket, { id: string; data: UpdateTicketRequest }>({
      query: ({ id, data }) => ({
        url: `/tickets/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tickets"],
    }),

    deleteTicket: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useGetTicketQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsApi;
