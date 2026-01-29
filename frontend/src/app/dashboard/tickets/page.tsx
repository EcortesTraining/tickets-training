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
import { TicketTable } from "@/features/tickets/components";

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
  return <TicketTable />;
}
