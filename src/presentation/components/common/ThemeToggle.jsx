import React from "react";
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { 
  DarkMode as DarkModeIcon, 
  LightMode as LightModeIcon,
  SettingsBrightness as SettingsBrightnessIcon 
} from "@mui/icons-material";
import { useTheme } from "@/presentation/theme/ThemeManager";

/**
 * Componente para alternar entre temas claro y oscuro
 * Muestra un menú con opciones para seleccionar el tema
 */
const ThemeToggle = () => {
  const { mode, toggleTheme, setTheme, useSystemPreference, systemTheme, isUsingSystemTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === "system") {
      useSystemPreference();
    } else {
      setTheme(newTheme);
    }
    handleClose();
  };

  // Determinar qué icono mostrar
  const getThemeIcon = () => {
    if (isUsingSystemTheme) {
      return <SettingsBrightnessIcon />;
    }
    return mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />;
  };

  // Determinar el texto del tooltip
  const getTooltipText = () => {
    if (isUsingSystemTheme) {
      return `Tema del sistema (${systemTheme === "dark" ? "oscuro" : "claro"})`;
    }
    return mode === "dark" ? "Tema oscuro" : "Tema claro";
  };

  return (
    <>
      <Tooltip title={getTooltipText()}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="cambiar tema"
          aria-controls={open ? "theme-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {getThemeIcon()}
        </IconButton>
      </Tooltip>
      
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "theme-button",
        }}
      >
        <MenuItem 
          onClick={() => handleThemeChange("light")}
          selected={mode === "light" && !isUsingSystemTheme}
        >
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Tema claro</ListItemText>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleThemeChange("dark")}
          selected={mode === "dark" && !isUsingSystemTheme}
        >
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Tema oscuro</ListItemText>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleThemeChange("system")}
          selected={isUsingSystemTheme}
        >
          <ListItemIcon>
            <SettingsBrightnessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Usar tema del sistema</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ThemeToggle;
