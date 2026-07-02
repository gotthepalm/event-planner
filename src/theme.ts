"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#56d06a",
      dark: "#2f9e44",
      contrastText: "#08120b",
    },
    secondary: {
      main: "#59a8e4",
      dark: "#2878b9",
      contrastText: "#06131f",
    },
    background: {
      default: "#f6f8fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#17202a",
      secondary: "#667085",
    },
    error: {
      main: "#d92d20",
    },
    warning: {
      main: "#f79009",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif',
    h1: {
      fontSize: "2.4rem",
      fontWeight: 800,
      lineHeight: 1.12,
    },
    h2: {
      fontSize: "1.55rem",
      fontWeight: 750,
    },
    h3: {
      fontSize: "1.15rem",
      fontWeight: 750,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid rgba(23, 32, 42, 0.08)",
          boxShadow: "0 16px 48px rgba(16, 24, 40, 0.08)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});
