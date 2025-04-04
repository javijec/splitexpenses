// themeWithModes.js
import { createTheme } from "@mui/material/styles";

// Función para crear el tema que acepta un modo (light/dark)
export const createMd3Theme = (mode) => {
  // Paleta de colores para modo claro (predeterminado)
  const lightColors = {
    primary: {
      main: "#6750A4",
      light: "#B69DF8",
      dark: "#4F378B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#625B71",
      light: "#958DA5",
      dark: "#393649",
      contrastText: "#FFFFFF",
    },
    tertiary: {
      main: "#7D5260",
      light: "#B58392",
      dark: "#5B3E4C",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#B3261E",
      light: "#F2B8B5",
      dark: "#8C1D18",
      contrastText: "#FFFFFF",
    },
    neutral: {
      main: "#79747E",
      light: "#E7E0EC",
      dark: "#49454F",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFBFE",
      paper: "#FFFBFE",
      surface: "#FFFBFE",
      surfaceVariant: "#E7E0EC",
    },
    text: {
      primary: "#1C1B1F",
      secondary: "#49454F",
      disabled: "#1C1B1F70",
    },
    divider: "#79747E4D",
  };

  // Paleta de colores para modo oscuro
  const darkColors = {
    primary: {
      main: "#D0BCFF",
      light: "#E8DDFF",
      dark: "#9A82DB",
      contrastText: "#381E72",
    },
    secondary: {
      main: "#CCC2DC",
      light: "#E8DEF8",
      dark: "#9A91AC",
      contrastText: "#332D41",
    },
    tertiary: {
      main: "#EFB8C8",
      light: "#FFD8E4",
      dark: "#B9889B",
      contrastText: "#4A2532",
    },
    error: {
      main: "#F2B8B5",
      light: "#F9DEDC",
      dark: "#B3261E",
      contrastText: "#601410",
    },
    neutral: {
      main: "#C4C0C9",
      light: "#E6E1E5",
      dark: "#938F99",
      contrastText: "#1D1A22",
    },
    background: {
      default: "#141218",
      paper: "#1C1B1F",
      surface: "#1C1B1F",
      surfaceVariant: "#49454F",
    },
    text: {
      primary: "#E6E1E5",
      secondary: "#CAC4D0",
      disabled: "#E6E1E570",
    },
    divider: "#CAC4D04D",
  };

  // Seleccionar la paleta según el modo
  const colors = mode === "dark" ? darkColors : lightColors;

  // Sistema de elevación (sombras) según Material Design 3
  // En modo oscuro, las sombras pueden tener un efecto más sutil
  const shadowOpacity = mode === "dark" ? 0.5 : 1;
  const shadows = [
    "none",
    `0px 1px 2px rgba(0, 0, 0, ${
      0.3 * shadowOpacity
    }), 0px 1px 3px 1px rgba(0, 0, 0, ${0.15 * shadowOpacity})`,
    `0px 1px 2px rgba(0, 0, 0, ${
      0.3 * shadowOpacity
    }), 0px 2px 6px 2px rgba(0, 0, 0, ${0.15 * shadowOpacity})`,
    `0px 4px 8px 3px rgba(0, 0, 0, ${
      0.15 * shadowOpacity
    }), 0px 1px 3px rgba(0, 0, 0, ${0.3 * shadowOpacity})`,
    `0px 6px 10px 4px rgba(0, 0, 0, ${
      0.15 * shadowOpacity
    }), 0px 2px 3px rgba(0, 0, 0, ${0.3 * shadowOpacity})`,
    `0px 8px 12px 6px rgba(0, 0, 0, ${
      0.15 * shadowOpacity
    }), 0px 4px 4px rgba(0, 0, 0, ${0.3 * shadowOpacity})`,
    // El resto son los shadows por defecto de Material UI
    ...Array(19).fill("none"),
  ];

  // Crear y devolver el tema
  return createTheme({
    palette: {
      mode,
      ...colors,
    },
    shadows,
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2.5rem",
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontSize: "1.75rem",
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "0em",
      },
      h4: {
        fontSize: "1.5rem",
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0em",
      },
      h6: {
        fontSize: "1.125rem",
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0.0075em",
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "none",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      overline: {
        fontSize: "0.625rem",
        fontWeight: 500,
        lineHeight: 2.66,
        letterSpacing: "0.08333em",
        textTransform: "uppercase",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            padding: "10px 24px",
            boxShadow: "none",
            textTransform: "none",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: shadows[1],
            },
          },
        },
        variants: [
          {
            props: { variant: "elevated" },
            style: {
              backgroundColor: colors.background.surface,
              color: colors.text.primary,
              boxShadow: shadows[1],
              "&:hover": {
                boxShadow: shadows[2],
                backgroundColor: mode === "dark" ? "#2C2B30" : "#F4EFF4",
              },
            },
          },
          {
            props: { variant: "filled" },
            style: {
              backgroundColor: colors.primary.main,
              color: mode === "dark" ? colors.primary.contrastText : "#FFFFFF",
              "&:hover": {
                backgroundColor:
                  mode === "dark" ? colors.primary.light : colors.primary.dark,
              },
            },
          },
          {
            props: { variant: "tonal" },
            style: {
              backgroundColor: colors.secondary.light,
              color: colors.secondary.dark,
              "&:hover": {
                backgroundColor: colors.secondary.main,
                color: colors.secondary.contrastText,
              },
            },
          },
        ],
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            padding: 16,
            backgroundColor: colors.background.surface,
            boxShadow: shadows[1],
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: 16,
            "&:last-child": {
              paddingBottom: 16,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 8,
              "& fieldset": {
                borderColor: colors.neutral.light,
              },
              "&:hover fieldset": {
                borderColor: colors.primary.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: colors.primary.main,
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
              borderColor: colors.primary.main,
            },
          },
          notchedOutline: {
            borderColor: colors.neutral.light,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.09)"
                : "rgba(0, 0, 0, 0.06)",
            "&:hover": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.13)"
                  : "rgba(0, 0, 0, 0.09)",
            },
            "&.Mui-focused": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.09)"
                  : "rgba(0, 0, 0, 0.06)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          filled: {
            backgroundColor: colors.primary.light,
            color: colors.primary.contrastText,
          },
          outlined: {
            borderColor: colors.primary.main,
            color: colors.primary.main,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            borderColor: colors.neutral.light,
            color: colors.text.secondary,
            "&.Mui-selected": {
              backgroundColor: colors.primary.light,
              color: colors.primary.main,
              "&:hover": {
                backgroundColor: colors.primary.light,
              },
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            "& .MuiSwitch-switchBase": {
              padding: 0,
              margin: 2,
              transitionDuration: "300ms",
              "&.Mui-checked": {
                transform: "translateX(16px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                  backgroundColor: colors.primary.main,
                  opacity: 1,
                  border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                  opacity: 0.5,
                },
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                color: mode === "light" ? "#e9e9e9" : "#444",
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                opacity: mode === "light" ? 0.7 : 0.3,
              },
            },
            "& .MuiSwitch-thumb": {
              boxSizing: "border-box",
              width: 22,
              height: 22,
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              backgroundColor: mode === "light" ? "#E9E9EA" : "#39393D",
              opacity: 1,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.paper,
            backgroundImage: "none",
          },
          elevation1: {
            boxShadow: shadows[1],
          },
          elevation2: {
            boxShadow: shadows[2],
          },
          elevation3: {
            boxShadow: shadows[3],
          },
          elevation4: {
            boxShadow: shadows[4],
          },
          elevation5: {
            boxShadow: shadows[5],
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: shadows[3],
            backgroundColor: colors.background.paper,
            color: colors.text.primary,
          },
          colorPrimary: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
          indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            backgroundColor: colors.primary.main,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            minWidth: 100,
            padding: "12px 16px",
            transition: "all 0.2s",
            "&.Mui-selected": {
              color:
                mode === "dark" ? colors.primary.main : colors.primary.dark,
            },
            "&:hover": {
              color:
                mode === "dark" ? colors.primary.light : colors.primary.main,
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.background.paper,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingTop: 12,
            paddingBottom: 12,
            "&.Mui-selected": {
              backgroundColor: colors.primary.light + "40",
              "&:hover": {
                backgroundColor: colors.primary.light + "60",
              },
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "&.Mui-selected": {
              backgroundColor: colors.primary.light + "40",
              "&:hover": {
                backgroundColor: colors.primary.light + "60",
              },
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          standardSuccess: {
            backgroundColor: mode === "dark" ? "#1E4620" : "#EDF7ED",
            color: mode === "dark" ? "#67EC67" : "#1E4620",
          },
          standardInfo: {
            backgroundColor: mode === "dark" ? "#0D3C61" : "#E5F6FD",
            color: mode === "dark" ? "#67CFFF" : "#0D3C61",
          },
          standardWarning: {
            backgroundColor: mode === "dark" ? "#553A00" : "#FFF4E5",
            color: mode === "dark" ? "#FFB930" : "#663C00",
          },
          standardError: {
            backgroundColor: mode === "dark" ? "#5F1D1D" : "#FDEDED",
            color: mode === "dark" ? "#FF6B6B" : "#5F1D1D",
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: shadows[3],
          },
          primary: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            "&:hover": {
              backgroundColor: colors.primary.dark,
            },
          },
          secondary: {
            backgroundColor: colors.secondary.main,
            color: colors.secondary.contrastText,
            "&:hover": {
              backgroundColor: colors.secondary.dark,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor:
              mode === "dark" ? colors.neutral.dark : colors.neutral.main,
            color: mode === "dark" ? colors.neutral.light : "#FFFFFF",
            fontSize: "0.75rem",
            padding: "8px 12px",
            borderRadius: 6,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            boxShadow: shadows[5],
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: "1.25rem",
            fontWeight: 500,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: colors.divider,
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            height: 8,
            "& .MuiSlider-track": {
              border: "none",
              backgroundColor: colors.primary.main,
            },
            "& .MuiSlider-thumb": {
              height: 24,
              width: 24,
              backgroundColor: colors.primary.main,
              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${colors.primary.main}33`,
              },
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: colors.primary.main,
            textDecorationColor: colors.primary.light,
            "&:hover": {
              color: colors.primary.dark,
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            fontWeight: 600,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
          },
        },
      },
    },
  });
};

// Crear instancias del tema para modo claro y oscuro
const lightTheme = createMd3Theme("light");
const darkTheme = createMd3Theme("dark");

export { lightTheme, darkTheme };
