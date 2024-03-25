import { grey } from "@mui/material/colors"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

export const darkTheme = responsiveFontSizes(
  createTheme({
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
)
