import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useSystemTheme } from "@/application/hooks/useSystemTheme";
import { lightTheme, darkTheme } from "@/presentation/theme/theme";

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

  // Seleccionar el tema preconfigurado según el modo actual
  const theme = mode === "light" ? lightTheme : darkTheme;

  // Proporcionar el contexto y el proveedor de tema de Material UI
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
