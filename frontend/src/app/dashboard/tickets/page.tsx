"use client";

import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import type { Ticket } from "@/store/ticketSlice";
import type { RootState } from "@/store/store";

const getPriorityColor = (priority: Ticket["priority"]) => {
  switch (priority) {
    case "hight":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "default";
  }
};

const getPriorityLabel = (priority: Ticket["priority"]) => {
  switch (priority) {
    case "hight":
      return "Alta";
    case "medium":
      return "Media";
    case "low":
      return "Baja";
    default:
      return priority;
  }
};

const getStatusColor = (status: Ticket["status"]) => {
  return status === "open" ? "success" : "default";
};

const getStatusLabel = (status: Ticket["status"]) => {
  return status === "open" ? "Abierto" : "Cerrado";
};

export default function MyTicketsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const tickets = useSelector((state: RootState) => {
    console.log(state.tickets);
    return state.tickets.tickets;
  });

  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesPriority =
        filterPriority === "all" || ticket.priority === filterPriority;
      const matchesStatus =
        filterStatus === "all" || ticket.status === filterStatus;
      return matchesPriority && matchesStatus;
    });
  }, [filterPriority, filterStatus]);

  const handleTicketClick = (ticket: Ticket) => {
    console.log("Ticket clicked:", ticket);
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <FilterIcon color="action" />
              <TextField
                label="Filtrar por Prioridad"
                select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                sx={{ minWidth: 200 }}
                size="small"
              >
                <MenuItem value="all">Todas</MenuItem>
                <MenuItem value="hight">Alta</MenuItem>
                <MenuItem value="medium">Media</MenuItem>
                <MenuItem value="low">Baja</MenuItem>
              </TextField>

              <TextField
                label="Filtrar por Estado"
                select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ minWidth: 200 }}
                size="small"
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="open">Abierto</MenuItem>
                <MenuItem value="closed">Cerrado</MenuItem>
              </TextField>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: "auto" }}
              >
                {filteredTickets.length} ticket(s) encontrado(s)
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {filteredTickets.length === 0 ? (
          <Alert severity="info">
            {filteredTickets.length === 0
              ? "No tienes tickets creados. ¡Crea tu primer ticket!"
              : "No hay tickets que coincidan con los filtros seleccionados."}
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {filteredTickets.map((ticket) => (
              <Grid item xs={12} md={6} key={ticket.id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                  onClick={() => handleTicketClick(ticket)}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="h6" component="h3" noWrap>
                          {ticket.subject}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={getPriorityLabel(ticket.priority)}
                            color={getPriorityColor(ticket.priority)}
                            size="small"
                          />
                          <Chip
                            label={getStatusLabel(ticket.status)}
                            color={getStatusColor(ticket.status)}
                            size="small"
                          />
                        </Stack>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {ticket.comments}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          ID: {ticket.id}
                        </Typography>
                        {ticket.files.length > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {ticket.files.length} archivo(s)
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
