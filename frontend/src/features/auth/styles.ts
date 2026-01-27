import { SxProps, Theme } from "@mui/material";
import { APP_BORDER_RADIUS } from "@/constants/styles";

export const loginContainerStyles: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 2,
  backgroundColor: "grey.100",
};

export const loginCardStyles: SxProps<Theme> = {
  minWidth: "60vw",
  width: "100%",
  maxWidth: "90vw",
  overflow: "hidden",
  borderRadius: APP_BORDER_RADIUS.lg,
  boxShadow: 2,
};

export const loginGridContainerStyles: SxProps<Theme> = {
  minHeight: "80vh",
};

export const loginFormGridStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 4,
  backgroundColor: "background.default",
};

export const loginPaperStyles: SxProps<Theme> = {
  padding: 4,
  width: "100%",
  maxWidth: 400,
};

export const loginImageGridStyles: SxProps<Theme> = {
  display: { xs: "none", md: "flex" },
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

export const loginImageContainerStyles: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  position: "relative",
  border: "1px solid",
  borderColor: "divider",
  overflow: "hidden",
};

export const loginImageBoxStyles: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  position: "relative",
};

export const loginButtonStyles: SxProps<Theme> = {
  mt: 2,
};

export const loginSloganContainerStyles: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  textAlign: "center",
  color: "white",
  width: "80%",
  maxWidth: 500,
};

export const loginSloganTitleStyles: SxProps<Theme> = {
  fontSize: { md: "2.5rem", lg: "3rem" },
  fontWeight: 700,
  mb: 2,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  lineHeight: 1.2,
};

export const loginSloganSubtitleStyles: SxProps<Theme> = {
  fontSize: { md: "1.25rem", lg: "1.5rem" },
  fontWeight: 400,
  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
  opacity: 0.95,
};
