import React, { createContext, useState, useContext, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useSystemTheme } from "@/application/hooks/useSystemTheme";

// Crear el contexto para el tema
const ThemeContext = createContext();

// Hook personalizado para usar el contexto del tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
};

// Proveedor del tema que detecta automáticamente el tema del sistema
export const ThemeProvider = ({ children }) => {
  // Obtener el tema del sistema usando nuestro hook personalizado
  const systemTheme = useSystemTheme();

  // Estado para el modo del tema actual
  const [mode, setMode] = useState(systemTheme);

  // Actualizar el modo cuando cambia el tema del sistema
  useEffect(() => {
    setMode(systemTheme);
  }, [systemTheme]);

  // Función para alternar manualmente entre temas
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Crear el tema de Material UI basado en el modo actual
  const theme = createTheme({
    palette: {
      mode,
      // Mantener los colores primarios y secundarios existentes
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#0d47a1",
        contrastText: "#fff",
      },
      secondary: {
        main: "#e91e63",
        light: "#f48fb1",
        dark: "#c2185b",
        contrastText: "#fff",
      },
      error: {
        main: "#d32f2f",
      },
      background: {
        // Ajustar los colores de fondo según el modo
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    // Mantener la configuración de tipografía existente
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
    // Mantener la configuración de componentes existente
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
      MuiCardHeader: {
        styleOverrides: {
          root: {
            // Fondo más claro en modo oscuro y ligeramente más oscuro en modo claro
            backgroundColor: mode === "dark" ? "#2a2a2a" : "#f7f7f7",
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

  // Proporcionar el contexto y el proveedor de tema de Material UI
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
