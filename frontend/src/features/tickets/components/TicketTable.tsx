import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { TICKETS_ROWS } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRouter } from "next/navigation";

import {
  selectTickets,
  selectTicketsPagination,
} from "@/store/selectors/ticketsSelectors";
import { deleteTicket, getTickets } from "@/store/actions/fakeFetchTickets";
import type { AppDispatch } from "@/store/store";
import dayjs from "dayjs";

export const TicketTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const tickets = useSelector(selectTickets);
  const pagination = useSelector(selectTicketsPagination);

  React.useEffect(() => {
    dispatch(
      getTickets({
        page: pagination.page,
        perPage: pagination.perPage,
      }),
    );
  }, [dispatch, pagination.page, pagination.perPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(
      getTickets({
        page: newPage,
        perPage: pagination.perPage,
      }),
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const perPage = +event.target.value;
    dispatch(
      getTickets({
        page: 0,
        perPage,
      }),
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {TICKETS_ROWS.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={ticket.id}>
                {TICKETS_ROWS.map((column) => {
                  switch (column.id) {
                    case "subject":
                      return (
                        <TableCell key={column.id}>{ticket.subject}</TableCell>
                      );
                    case "priority":
                      return (
                        <TableCell key={column.id}>{ticket.priority}</TableCell>
                      );
                    case "createdAt":
                      return (
                        <TableCell key={column.id}>
                          {dayjs(ticket.createdAt).format("DD/MM/YYYY HH:mm")}
                        </TableCell>
                      );
                    case "status":
                      return (
                        <TableCell key={column.id}>{ticket.status}</TableCell>
                      );
                    case "actions":
                      return (
                        <TableCell key={column.id}>
                          <IconButton
                            aria-label="Editar ticket"
                            size="small"
                            onClick={() =>
                              router.push(`/dashboard/tickets/${ticket.id}/edit`)
                            }
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            aria-label="Eliminar ticket"
                            size="small"
                            onClick={() =>
                              dispatch(
                                deleteTicket({
                                  id: ticket.id,
                                  page: pagination.page,
                                  perPage: pagination.perPage,
                                }),
                              )
                            }
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      );
                    default:
                      return <TableCell key={column.id}></TableCell>;
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.perPage}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
