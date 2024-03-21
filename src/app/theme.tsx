"use client"

import { grey } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

export const darkTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
  },
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          //backgroundImage: `
          // radial-gradient(circle 500px at center, rgb(59,24,78,0.95), rgb(12,10,42,0.95))
          // #url(/images/star.png)
          //`,
          backgroundImage: "radial-gradient(circle 500px at center, rgb(59,24,78,0.95), rgb(12,10,42,0.95))",
          backgroundColor: "rgb(12,10,42)",
          backgroundAttachment: "fixed",
          position: "absolute",
          width: "100%",
          minHeight: "100%",
          top: "0",
          left: "0",
          zIndex: "-1",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "#ffffff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#A0AAB4",
            fontWeight: "bold",
          },
          "& label.Mui-focused": {
            color: "#A0AAB4",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#B2BAC2",
          },
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
