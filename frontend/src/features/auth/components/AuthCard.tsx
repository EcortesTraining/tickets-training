"use client";

import { Box, Card, Grid } from "@mui/material";
import {
  loginContainerStyles,
  loginCardStyles,
  loginGridContainerStyles,
  loginFormGridStyles,
} from "../styles";
import LoginImageSection from "./LoginImageSection";

interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <Box sx={loginContainerStyles}>
      <Card sx={loginCardStyles}>
        <Grid container sx={loginGridContainerStyles}>
          <Grid item xs={12} md={4} sx={loginFormGridStyles}>
            {children}
          </Grid>
          <LoginImageSection />
        </Grid>
      </Card>
    </Box>
  );
}
