"use client";

import { alpha, createTheme } from "@mui/material/styles";

const primaryGreen = "#22C55E";
const accentBlue = "#2563EB";
const border = "#E8EDF3";
const textPrimary = "#0F172A";
const textSecondary = "#64748B";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: primaryGreen,
      dark: "#16A34A",
      contrastText: "#ffffff",
    },
    secondary: {
      main: accentBlue,
      dark: "#1D4ED8",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F7F9FC",
      paper: "#FFFFFF",
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
    error: {
      main: "#DC2626",
    },
    warning: {
      main: "#D97706",
    },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif',
    allVariants: {
      lineHeight: 1.5,
    },
    h1: {
      fontSize: "2.75rem",
      fontWeight: 700,
      lineHeight: 1.12,
      letterSpacing: 0,
      color: textPrimary,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: 0,
      color: textPrimary,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: 0,
      color: textPrimary,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    caption: {
      fontSize: "0.8125rem",
      lineHeight: 1.45,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 14,
          paddingInline: 20,
          fontWeight: 600,
          boxShadow: "none",
          transition:
            "background-color 180ms ease-out, border-color 180ms ease-out, box-shadow 180ms ease-out, transform 180ms ease-out",
          "&:hover": {
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "&.MuiButton-containedPrimary": {
            backgroundColor: primaryGreen,
            boxShadow: "0 6px 18px rgba(34,197,94,.25)",
            "&:hover": {
              backgroundColor: "#16A34A",
              boxShadow: "0 10px 24px rgba(34,197,94,.28)",
            },
            "&:active": {
              backgroundColor: "#15803D",
            },
          },
          "&.MuiButton-outlined": {
            borderColor: "#E2E8F0",
            color: textPrimary,
            backgroundColor: "#FFFFFF",
            "&:hover": {
              borderColor: "#CBD5E1",
              backgroundColor: "#F8FAFC",
              boxShadow: "0 8px 20px rgba(15,23,42,.06)",
            },
          },
          "&.MuiButton-text": {
            color: textPrimary,
            "&:hover": {
              backgroundColor: "#F3F5F8",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: `1px solid ${border}`,
          boxShadow: "0 8px 32px rgba(15,23,42,.06)",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "#FFFFFF",
          transition:
            "border-color 180ms ease-out, box-shadow 180ms ease-out, background-color 180ms ease-out",
          "&:not(.MuiInputBase-multiline)": {
            minHeight: 48,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E2E8F0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#CBD5E1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryGreen,
            borderWidth: 1,
          },
          "&.Mui-focused": {
            boxShadow: `0 0 0 4px ${alpha(primaryGreen, 0.15)}`,
          },
        },
        input: {
          padding: "13px 14px",
          "&::placeholder": {
            color: "#94A3B8",
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: textSecondary,
          "&.Mui-focused": {
            color: primaryGreen,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: "22px",
          paddingBlock: 13,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          minHeight: 28,
          borderRadius: 999,
          border: "none",
          fontWeight: 600,
          transition:
            "background-color 180ms ease-out, color 180ms ease-out, box-shadow 180ms ease-out, transform 180ms ease-out",
        },
        label: {
          paddingInline: 12,
        },
        colorPrimary: {
          color: "#16A34A",
          backgroundColor: "#DCFCE7",
        },
        colorSecondary: {
          color: "#2563EB",
          backgroundColor: "#DBEAFE",
        },
        colorDefault: {
          color: "#475569",
          backgroundColor: "#F1F5F9",
        },
        colorWarning: {
          color: "#D97706",
          backgroundColor: "#FEF3C7",
        },
        colorError: {
          color: "#DC2626",
          backgroundColor: "#FEE2E2",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition:
            "background-color 180ms ease-out, box-shadow 180ms ease-out, transform 180ms ease-out",
          "&:hover": {
            backgroundColor: "#F3F5F8",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E8EDF3",
          color: "#94A3B8",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          border: `1px solid ${border}`,
          boxShadow: "0 18px 50px rgba(15,23,42,.12)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderLeft: `1px solid ${border}`,
          boxShadow: "0 18px 50px rgba(15,23,42,.10)",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          border: `1px solid ${border}`,
          boxShadow: "0 14px 36px rgba(15,23,42,.10)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          marginInline: 6,
          minHeight: 40,
          transition: "background-color 160ms ease-out",
        },
      },
    },
  },
});
