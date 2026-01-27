"use client";

import { Box, Card, Grid } from "@mui/material";
import {
  loginContainerStyles,
  loginCardStyles,
  loginGridContainerStyles,
  loginFormGridStyles,
} from "../styles";
import RegisterForm from "./RegisterForm";
import LoginImageSection from "./LoginImageSection";

export default function RegisterCard({}) {
  return (
    <Box sx={loginContainerStyles}>
      <Card sx={loginCardStyles}>
        <Grid container sx={loginGridContainerStyles}>
          <Grid item xs={12} md={4} sx={loginFormGridStyles}>
            <RegisterForm />
          </Grid>
          <LoginImageSection />
        </Grid>
      </Card>
    </Box>
  );
}
