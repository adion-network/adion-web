import { blue, grey } from "@mui/material/colors"
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
        main: "#0066FF",
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
      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: blue[600],
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: blue[600],
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "& label.Mui-focused": {
              color: blue[600],
            },
            "&.MuiInput-underline:after": {
              borderBottomColor: "#B2BAC2",
            },
            "&.MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "0.75rem",
              },
              "&:hover fieldset": {
                borderColor: blue[500],
              },
              "&.Mui-focused fieldset": {
                borderColor: blue[600],
              },
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
