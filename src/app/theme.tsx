"use client"

import { grey } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    primary: {
      main: grey[50],
    },
    success: {
      main: "#0AE390",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          minHeight: "50px",
        },
      },
    },
  },
})
