import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "@/application/contexts/ThemeContext";

/**
 * Componente que muestra un botón para alternar entre tema claro y oscuro
 */
const ThemeToggle = () => {
  // Obtener el modo actual del tema y la función para cambiarlo
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip
      title={
        mode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
      }
      arrow
      placement="top"
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
          p: 1.2,
          transition: "all 0.2s ease",

        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
