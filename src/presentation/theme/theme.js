import { createTheme } from "@mui/material/styles";

/**
 * Función que genera un tema de Material UI basado en el modo (claro u oscuro)
 * siguiendo las pautas de Material Design 3
 * @param {string} mode - El modo del tema ('light' o 'dark')
 * @returns {object} El tema configurado
 */
const createAppTheme = (mode) =>
  createTheme({
    // Configuración de la paleta de colores según Material Design 3
    palette: {
      mode,
      // Colores primarios según MD3
      primary: {
        main: mode === "light" ? "#6750A4" : "#D0BCFF", // Morado MD3
        light: mode === "light" ? "#8B79C9" : "#E9DDFF",
        dark: mode === "light" ? "#4F378B" : "#9A82DB",
        contrastText: mode === "light" ? "#FFFFFF" : "#381E72",
      },
      // Colores secundarios según MD3
      secondary: {
        main: mode === "light" ? "#E8DEF8" : "#CCC2DC", // Secundario MD3
        light: mode === "light" ? "#F6EDFF" : "#E8DEF8",
        dark: mode === "light" ? "#CAC4D0" : "#9A82DB",
        contrastText: mode === "light" ? "#1D192B" : "#332D41",
      },
      // Colores de error según MD3
      error: {
        main: mode === "light" ? "#B3261E" : "#F2B8B5", // Error MD3
        light: mode === "light" ? "#F9DEDC" : "#F9DEDC",
        dark: mode === "light" ? "#8C1D18" : "#601410",
      },
      // Colores de advertencia según MD3
      warning: {
        main: mode === "light" ? "#F2994A" : "#FFB68E", // Naranja MD3
        light: mode === "light" ? "#FFDBBC" : "#FFDBBC",
        dark: mode === "light" ? "#B06000" : "#7A2E00",
      },
      // Colores de información según MD3
      info: {
        main: mode === "light" ? "#0288D1" : "#A6D6FF", // Azul MD3
        light: mode === "light" ? "#CBE6FF" : "#CBE6FF",
        dark: mode === "light" ? "#0061A4" : "#001D36",
      },
      // Colores de éxito según MD3
      success: {
        main: mode === "light" ? "#2E7D32" : "#7ED48F", // Verde MD3
        light: mode === "light" ? "#B9F6CA" : "#B9F6CA",
        dark: mode === "light" ? "#1B5E20" : "#005005",
      },
      // Colores de fondo según MD3
      background: {
        default: mode === "light" ? "#FFFBFE" : "#1C1B1F", // Fondo MD3
        paper: mode === "light" ? "#FFFFFF" : "#2B2930",
        surface: mode === "light" ? "#FFFBFE" : "#1C1B1F",
        surfaceVariant: mode === "light" ? "#E7E0EC" : "#49454F",
      },
      // Colores de texto según MD3
      text: {
        primary: mode === "light" ? "#1C1B1F" : "#E6E1E5",
        secondary: mode === "light" ? "#49454F" : "#CAC4D0",
        disabled: mode === "light" ? "#1C1B1F61" : "#E6E1E561",
      },
      // Colores de superficie según MD3
      surfaceVariant: {
        main: mode === "light" ? "#E7E0EC" : "#49454F",
      },
      outline: {
        main: mode === "light" ? "#79747E" : "#938F99",
      },
    },
    // Tipografía según Material Design 3
    typography: {
      fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
      // Títulos según MD3
      h1: {
        fontSize: "2.5rem",
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "-0.015625em",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 400,
        lineHeight: 1.4,
        letterSpacing: "0em",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: "0em",
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.7,
        letterSpacing: "0.0125em",
      },
      // Cuerpo de texto según MD3
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.03125em",
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.0178571em",
      },
      // Etiquetas según MD3
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.43,
        letterSpacing: "0.0892857em",
        textTransform: "none",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.33,
        letterSpacing: "0.0333333em",
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: 1.33,
        letterSpacing: "0.1666667em",
        textTransform: "uppercase",
      },
    },
    // Configuración de componentes según Material Design 3
    components: {
      // Botones con estilo MD3
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 20, // Más redondeado según MD3
            padding: "10px 24px",
            fontWeight: 500,
          },
          // Variante contained según MD3
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow:
                "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
            },
          },
          // Variante outlined según MD3
          outlined: {
            borderWidth: "1px",
          },
        },
      },
      // Tarjetas con estilo MD3
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16, // Más redondeado según MD3
            boxShadow:
              mode === "light"
                ? "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)"
                : "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
            margin: "8px",
            overflow: "hidden",
          },
        },
      },
      // Cabecera de tarjeta con estilo MD3
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: "16px 16px 0 16px",
            "& .MuiTypography-root": {
              fontWeight: 500,
            },
          },
        },
      },
      // Contenido de tarjeta con estilo MD3
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "16px",
            "&:last-child": {
              paddingBottom: "16px",
            },
          },
        },
      },
      // Botón flotante con estilo MD3
      MuiFab: {
        styleOverrides: {
          root: {
            position: "absolute",
            transform: "translateX(-50%)",
            left: "50%",
            background: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
            fontWeight: "bold",
            zIndex: 1000,
            boxShadow:
              "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
          },
        },
      },
      // Botón de icono con estilo MD3
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 100, // Circular según MD3
            padding: 8,
          },
        },
      },
      // Campos de texto con estilo MD3
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 16,
            },
          },
        },
      },
      // Chips con estilo MD3
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      // Switches con estilo MD3
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          thumb: {
            boxShadow: "none",
          },
        },
      },
      // Tabs con estilo MD3
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
    },
    // Sombras según Material Design 3
    shadows: [
      "none",
      "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)", // Elevation 1
      "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)", // Elevation 2
      "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)", // Elevation 3
      "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)", // Elevation 4
      "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)", // Elevation 5
      ...Array(19).fill("none"), // Completar el array de 24 sombras requerido por MUI
    ],
    // Forma según Material Design 3
    shape: {
      borderRadius: 4,
    },
  });

// Exportar la función de creación de tema
export default createAppTheme;
