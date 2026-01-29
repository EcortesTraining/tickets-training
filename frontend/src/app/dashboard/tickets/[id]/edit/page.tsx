"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ROUTES } from "@/constants/routes";
import { useGetTicketQuery, useUpdateTicketMutation } from "@/store/api/ticketsApi";

export default function EditTicketPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = useMemo(() => params?.id ?? "", [params]);

  const { data: ticket, isLoading: isLoadingTicket, isError } = useGetTicketQuery(id, {
    skip: !id,
  });
  const [updateTicket, { isLoading: isSaving }] = useUpdateTicketMutation();
  const [error, setError] = useState<string | null>(null);

  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"hight" | "medium" | "low">("medium");
  const [status, setStatus] = useState<"open" | "closed">("open");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (!ticket) return;
    setSubject(ticket.subject ?? "");
    setPriority(ticket.priority ?? "medium");
    setStatus(ticket.status ?? "open");
    setComments(ticket.comments ?? "");
  }, [ticket]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!subject || !comments || !priority || !status) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      await updateTicket({
        id,
        data: {
          subject,
          priority,
          status,
          comments,
        },
      }).unwrap();

      router.push(ROUTES.MY_TICKETS);
    } catch {
      setError("Error al actualizar el ticket. Por favor intenta nuevamente.");
    }
  };

  if (isLoadingTicket) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !ticket) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          No se pudo cargar el ticket.
        </Alert>
        <Button variant="outlined" onClick={() => router.push(ROUTES.MY_TICKETS)}>
          Volver a Mis Tickets
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Editar Ticket
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Actualiza la información del ticket y guarda los cambios.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Asunto"
              name="subject"
              fullWidth
              required
              variant="outlined"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSaving}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Prioridad"
                name="priority"
                select
                fullWidth
                required
                variant="outlined"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                disabled={isSaving}
              >
                <MenuItem value="low">Baja</MenuItem>
                <MenuItem value="medium">Media</MenuItem>
                <MenuItem value="hight">Alta</MenuItem>
              </TextField>

              <TextField
                label="Estatus"
                name="status"
                select
                fullWidth
                required
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                disabled={isSaving}
              >
                <MenuItem value="open">Abierto</MenuItem>
                <MenuItem value="closed">Cerrado</MenuItem>
              </TextField>
            </Stack>

            <TextField
              label="Descripción"
              name="comments"
              fullWidth
              required
              multiline
              rows={6}
              variant="outlined"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              disabled={isSaving}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={isSaving}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" size="large" disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

