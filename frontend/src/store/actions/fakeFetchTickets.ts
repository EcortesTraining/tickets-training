import { ticketsApi } from "../api/ticketsApi";
import { setPagination, setTickets } from "../ticketSlice";
import type { AppDispatch } from "../store";

export type GetTicketsArgs = {
  page: number;
  perPage: number;
};

export const getTickets =
  ({ page, perPage }: GetTicketsArgs) =>
  async (dispatch: AppDispatch) => {
    const result = await dispatch(ticketsApi.endpoints.getTickets.initiate());

    if ("data" in result && result.data) {
      const total = result.data.length;
      const totalPages = perPage > 0 ? Math.ceil(total / perPage) : 0;
      const start = page * perPage;
      const end = start + perPage;

      dispatch(setTickets(result.data.slice(start, end)));
      dispatch(
        setPagination({
          page,
          perPage,
          total,
          totalPages,
        }),
      );
    }
  };

export const deleteTicket =
  (args: { id: string; page: number; perPage: number }) =>
  async (dispatch: AppDispatch) => {
    await dispatch(ticketsApi.endpoints.deleteTicket.initiate(args.id));

    // Re-cargar lista y ajustar página si quedó fuera de rango
    const after = await dispatch(ticketsApi.endpoints.getTickets.initiate());
    if (!("data" in after) || !after.data) return;

    const total = after.data.length;
    const totalPages = args.perPage > 0 ? Math.ceil(total / args.perPage) : 0;
    const safePage =
      totalPages === 0 ? 0 : Math.min(args.page, Math.max(totalPages - 1, 0));

    const start = safePage * args.perPage;
    const end = start + args.perPage;

    dispatch(setTickets(after.data.slice(start, end)));
    dispatch(
      setPagination({
        page: safePage,
        perPage: args.perPage,
        total,
        totalPages,
      }),
    );
  };
