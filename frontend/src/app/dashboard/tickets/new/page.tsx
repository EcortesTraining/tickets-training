"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  MenuItem,
  Alert,
} from "@mui/material";
import { addTicket } from "@/store/ticketSlice";
import { ROUTES } from "@/constants/routes";
import type { Ticket } from "@/store/ticketSlice";
import type { RootState } from "@/store/store";

export default function ReportTicketPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const subject = formData.get("subject") as string;
      const comments = formData.get("comments") as string;
      const priority = formData.get("priority") as "hight" | "medium" | "low";

      if (!subject || !comments || !priority) {
        setError("Por favor completa todos los campos requeridos");
        setIsSubmitting(false);
        return;
      }

      const newTicket: Ticket = {
        id: Date.now().toString(),
        user: user?.email || "unknown",
        priority,
        status: "open",
        subject,
        comments,
        files: [],
      };

      dispatch(addTicket(newTicket));
      router.push(ROUTES.MY_TICKETS);
    } catch (err) {
      setError("Error al crear el ticket. Por favor intenta nuevamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Completa el formulario para crear un nuevo ticket de soporte
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
              placeholder="Describe brevemente el problema"
              disabled={isSubmitting}
            />

            <TextField
              label="Prioridad"
              name="priority"
              select
              fullWidth
              required
              variant="outlined"
              defaultValue="medium"
              disabled={isSubmitting}
            >
              <MenuItem value="low">Baja</MenuItem>
              <MenuItem value="medium">Media</MenuItem>
              <MenuItem value="hight">Alta</MenuItem>
            </TextField>

            <TextField
              label="Descripción"
              name="comments"
              fullWidth
              required
              multiline
              rows={6}
              variant="outlined"
              placeholder="Describe el problema en detalle..."
              disabled={isSubmitting}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear Ticket"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
