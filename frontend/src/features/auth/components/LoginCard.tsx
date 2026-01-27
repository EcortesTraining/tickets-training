"use client";

import { Box, Card, Grid } from "@mui/material";
import {
  loginContainerStyles,
  loginCardStyles,
  loginGridContainerStyles,
  loginFormGridStyles,
} from "../styles";
import LoginImageSection from "./LoginImageSection";
import LoginForm from "./LoginForm";

export default function LoginCard({}) {
  return (
    <Box sx={loginContainerStyles}>
      <Card sx={loginCardStyles}>
        <Grid container sx={loginGridContainerStyles}>
          <Grid item xs={12} md={4} sx={loginFormGridStyles}>
            <LoginForm />
          </Grid>
          <LoginImageSection />
        </Grid>
      </Card>
    </Box>
  );
}
