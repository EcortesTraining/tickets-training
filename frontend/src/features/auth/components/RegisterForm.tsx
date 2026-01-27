"use client";

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import { loginPaperStyles, loginButtonStyles } from "../styles";
import { useState } from "react";

export default function RegisterForm({}) {
  const isLoading = false;
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setPasswordError("");
    console.log({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password,
      confirmPassword,
    });
  };

  return (
    <Paper elevation={0} sx={loginPaperStyles}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        Registro
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Crea una cuenta para comenzar
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Nombre completo"
            type="text"
            name="name"
            fullWidth
            required
            variant="outlined"
            disabled={isLoading}
          />

          <TextField
            label="Email"
            type="email"
            name="email"
            fullWidth
            required
            variant="outlined"
            disabled={isLoading}
          />

          <TextField
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
            required
            variant="outlined"
            disabled={isLoading}
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            fullWidth
            required
            variant="outlined"
            error={!!passwordError}
            helperText={passwordError}
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={loginButtonStyles}
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            ¿Ya tienes una cuenta?{" "}
            <Link component={NextLink} href="/login" underline="hover">
              Inicia sesión aquí
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
