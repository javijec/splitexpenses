import { useEffect, useState } from "react";

/**
 * Hook personalizado que detecta el tema del sistema operativo (claro u oscuro)
 * @returns {string} El tema del sistema ('light' o 'dark')
 */
export const useSystemTheme = () => {
  // Estado inicial basado en la preferencia del sistema
  const [systemTheme, setSystemTheme] = useState(() => {
    // Verificar si window está disponible (para SSR)
    if (typeof window !== "undefined") {
      // Detectar preferencia de tema oscuro del sistema
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    // Valor por defecto si window no está disponible
    return "light";
  });

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return;

    // Crear media query para detectar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Función para actualizar el tema cuando cambia la preferencia del sistema
    const handleChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    // Agregar listener para detectar cambios
    mediaQuery.addEventListener("change", handleChange);

    // Limpiar listener al desmontar el componente
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return systemTheme;
};
