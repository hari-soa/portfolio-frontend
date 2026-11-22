import { STORAGE_KEYS } from "../config/themeConfig";
import { INITIAL_PORTFOLIO_MODEL } from "../models/portfolioModel";

export const storageService = {
  loadPortfolioData: () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEYS.PORTFOLIO_DATA);
      if (!raw) {
        return INITIAL_PORTFOLIO_MODEL;
      }
      return JSON.parse(raw);
    } catch {
      return INITIAL_PORTFOLIO_MODEL;
    }
  },

  savePortfolioData: (data) => {
    window.localStorage.setItem(
      STORAGE_KEYS.PORTFOLIO_DATA,
      JSON.stringify(data),
    );
    return data;
  },

  resetPortfolioData: () => {
    window.localStorage.removeItem(STORAGE_KEYS.PORTFOLIO_DATA);
    return INITIAL_PORTFOLIO_MODEL;
  },

  loadThemePreference: () => {
    return (
      window.localStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE) || "system"
    );
  },

  saveThemePreference: (theme) => {
    window.localStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
  },

  readFileAsDataUrl: (file, allowedTypes, maxSizeMb) => {
    return new Promise((resolve, reject) => {
      if (!allowedTypes.includes(file.type)) {
        reject(
          new Error("Invalid file format. Please upload an allowed file type."),
        );
        return;
      }
      const maxBytes = maxSizeMb * 1024 * 1024;
      if (file.size > maxBytes) {
        reject(
          new Error(`File exceeds maximum allowed size of ${maxSizeMb}MB.`),
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read selected file."));
      reader.readAsDataURL(file);
    });
  },
};
