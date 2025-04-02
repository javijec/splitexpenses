import { createTheme } from "@mui/material/styles";

/**
 * Función que genera un tema de Material UI basado en el modo (claro u oscuro)
 * @param {string} mode - El modo del tema ('light' o 'dark')
 * @returns {object} El tema configurado
 */
const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
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
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
      h1: {
        fontSize: "2.5rem",
        fontWeight: 500,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 500,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 500,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 500,
        lineHeight: 1.5,
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.6,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.7,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.43,
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
            margin: "16px",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            // Fondo más claro en modo oscuro y ligeramente más oscuro en modo claro
            backgroundColor: mode === "dark" ? "#000000" : "#f7f7f7",
            // Mejora del contraste para los títulos
            "& .MuiTypography-root": {
              color: mode === "dark" ? "#ffffff" : "#121212",
            },
            // Transición suave al cambiar de tema
            transition: "background-color 0.3s ease, color 0.3s ease",
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

// Exportar la función de creación de tema
export default createAppTheme;
