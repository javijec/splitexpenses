import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Material UI blue
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0", // Material UI purple
      light: "#d05ce3",
      dark: "#6a0080",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336", // Material UI red
      light: "#e57373",
      dark: "#d32f2f",
    },
    warning: {
      main: "#ffa726", // Material UI orange
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3", // Material UI blue
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50", // Material UI green
      light: "#81c784",
      dark: "#388e3c",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
  },
});

export default theme;
