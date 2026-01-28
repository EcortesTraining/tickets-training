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
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginPaperStyles, loginButtonStyles } from "../styles";
import { ROUTES } from "@/constants/routes";
import { login } from "@/store/authSlice";

export default function LoginForm({}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoading = false;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || "";

    dispatch(
      login({
        id: "1",
        name: email.split("@")[0] || "User",
        email,
      }),
    );

    router.push(ROUTES.DASHBOARD);
  };

  return (
    <Paper elevation={0} sx={loginPaperStyles}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        Login
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Sign in to your account
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
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
            label="Password"
            type="password"
            name="password"
            fullWidth
            required
            variant="outlined"
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
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            ¿No tienes una cuenta?{" "}
            <Link component={NextLink} href="/register" underline="hover">
              Regístrate aquí
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}
