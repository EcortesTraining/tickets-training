"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import {
  loginImageGridStyles,
  loginImageContainerStyles,
  loginImageBoxStyles,
  loginSloganContainerStyles,
  loginSloganTitleStyles,
  loginSloganSubtitleStyles,
} from "../styles";

export default function LoginImageSection() {
  return (
    <Grid item xs={0} md={8} sx={loginImageGridStyles}>
      <Box sx={loginImageContainerStyles}>
        <Box sx={loginImageBoxStyles}>
          <Image
            src="/images/loginScreen.jpg"
            alt="Login background"
            fill
            style={{
              objectFit: "cover",
              filter: "brightness(.9)",
            }}
            priority
          />
        </Box>
        <Box sx={loginSloganContainerStyles}>
          <Typography variant="h2" sx={loginSloganTitleStyles}>
            Soporte Eficiente
          </Typography>
          <Typography variant="h5" sx={loginSloganSubtitleStyles}>
            Gestiona tus tickets y obtén el soporte que necesitas, cuando lo
            necesitas
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
