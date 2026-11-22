import { useState, useEffect, useCallback } from "react";
import { THEME_MODES } from "../config/themeConfig";
import { storageService } from "../services/storageService";

export const useThemeController = () => {
  const [themeMode, setThemeMode] = useState(() =>
    storageService.loadThemePreference(),
  );

  const applyResolvedTheme = useCallback((mode) => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const resolved =
      mode === THEME_MODES.SYSTEM
        ? prefersDark
          ? THEME_MODES.DARK
          : THEME_MODES.LIGHT
        : mode;
    document.documentElement.setAttribute("data-theme", resolved);
  }, []);

  useEffect(() => {
    applyResolvedTheme(themeMode);
    storageService.saveThemePreference(themeMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (themeMode === THEME_MODES.SYSTEM) {
        applyResolvedTheme(THEME_MODES.SYSTEM);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [themeMode, applyResolvedTheme]);

  return {
    themeMode,
    setThemeMode,
  };
};
