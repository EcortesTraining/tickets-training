"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Stack,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Container,
} from "@mui/material";
import {
  ConfirmationNumber as TicketIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
  PriorityHigh as PriorityHighIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { ROUTES } from "@/constants/routes";
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

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: "primary" | "success" | "error" | "warning" | "info";
  subtitle?: string;
}

function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}.light`,
              borderRadius: "50%",
              p: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: `${color}.main`,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const tickets = useSelector((state: RootState) => state.tickets.tickets);

  // Filtrar tickets del usuario actual
  const userTickets = useMemo(() => {
    return tickets.filter(
      (ticket) => ticket.user === user?.email || ticket.user === user?.id,
    );
  }, [tickets, user]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    const total = userTickets.length;
    const open = userTickets.filter((t) => t.status === "open").length;
    const closed = userTickets.filter((t) => t.status === "closed").length;
    const highPriority = userTickets.filter(
      (t) => t.priority === "hight",
    ).length;
    const mediumPriority = userTickets.filter(
      (t) => t.priority === "medium",
    ).length;
    const lowPriority = userTickets.filter((t) => t.priority === "low").length;

    return {
      total,
      open,
      closed,
      highPriority,
      mediumPriority,
      lowPriority,
      openPercentage: total > 0 ? (open / total) * 100 : 0,
      closedPercentage: total > 0 ? (closed / total) * 100 : 0,
    };
  }, [userTickets]);

  // Obtener tickets recientes (últimos 5)
  const recentTickets = useMemo(() => {
    return [...userTickets]
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .slice(0, 5);
  }, [userTickets]);

  return (
    <Container maxWidth={"lg"}>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Bienvenido, {user?.name || "Usuario"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Aquí tienes un resumen de tus tickets
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total de Tickets"
              value={stats.total}
              icon={<TicketIcon />}
              color="primary"
              subtitle="Todos tus tickets"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tickets Abiertos"
              value={stats.open}
              icon={<ScheduleIcon />}
              color="warning"
              subtitle={`${stats.openPercentage.toFixed(0)}% del total`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Tickets Cerrados"
              value={stats.closed}
              icon={<CheckCircleIcon />}
              color="success"
              subtitle={`${stats.closedPercentage.toFixed(0)}% del total`}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Alta Prioridad"
              value={stats.highPriority}
              icon={<PriorityHighIcon />}
              color="error"
              subtitle="Requieren atención"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Distribución por Prioridad
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      Alta Prioridad
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stats.highPriority} tickets
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      stats.total > 0
                        ? (stats.highPriority / stats.total) * 100
                        : 0
                    }
                    color="error"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      Media Prioridad
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stats.mediumPriority} tickets
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      stats.total > 0
                        ? (stats.mediumPriority / stats.total) * 100
                        : 0
                    }
                    color="warning"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      Baja Prioridad
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stats.lowPriority} tickets
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      stats.total > 0
                        ? (stats.lowPriority / stats.total) * 100
                        : 0
                    }
                    color="info"
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Tickets recientes */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Tickets Recientes
                </Typography>
                <Button
                  size="small"
                  onClick={() => router.push(ROUTES.MY_TICKETS)}
                >
                  Ver todos
                </Button>
              </Box>
              {recentTickets.length === 0 ? (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 4,
                    color: "text.secondary",
                  }}
                >
                  <TicketIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                  <Typography variant="body2">No tienes tickets aún</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mt: 2 }}
                    onClick={() => router.push(ROUTES.REPORT_TICKET)}
                  >
                    Crear tu primer ticket
                  </Button>
                </Box>
              ) : (
                <List>
                  {recentTickets.map((ticket, index) => (
                    <Box key={ticket.id}>
                      <ListItem
                        sx={{
                          px: 0,
                          py: 1.5,
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "action.hover",
                            borderRadius: 1,
                          },
                        }}
                        onClick={() => router.push(ROUTES.MY_TICKETS)}
                      >
                        <ListItemIcon>
                          <TicketIcon color="action" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight="medium"
                              noWrap
                            >
                              {ticket.subject}
                            </Typography>
                          }
                          secondary={
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                              <Chip
                                label={getPriorityLabel(ticket.priority)}
                                color={getPriorityColor(ticket.priority)}
                                size="small"
                                sx={{ height: 20, fontSize: "0.7rem" }}
                              />
                              <Chip
                                label={
                                  ticket.status === "open"
                                    ? "Abierto"
                                    : "Cerrado"
                                }
                                color={
                                  ticket.status === "open"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                                sx={{ height: 20, fontSize: "0.7rem" }}
                              />
                            </Stack>
                          }
                        />
                      </ListItem>
                      {index < recentTickets.length - 1 && <Divider />}
                    </Box>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
