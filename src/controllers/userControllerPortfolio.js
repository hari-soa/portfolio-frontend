import { useState, useCallback, useMemo } from "react";
import { PROJECT_STATUSES, STORAGE_KEYS } from "../config/themeConfig";
import { storageService } from "../services/storageService";

export const usePortfolioController = () => {
  const [portfolio, setPortfolio] = useState(() =>
    storageService.loadPortfolioData(),
  );
  const [selectedStatus, setSelectedStatus] = useState(PROJECT_STATUSES.ALL);
  const [activeProject, setActiveProject] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return window.sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === "true";
  });
  const [notification, setNotification] = useState(null);

  const notify = useCallback((type, message) => {
    setNotification({ type, message });
    window.setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, []);

  const persistUpdate = useCallback(
    (updater, successMessage) => {
      setPortfolio((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        storageService.savePortfolioData(next);
        return next;
      });
      if (successMessage) {
        notify("success", successMessage);
      }
    },
    [notify],
  );

  const signInOwner = useCallback(
    (passcode) => {
      if (!passcode || passcode.trim().length < 4) {
        notify(
          "error",
          "Please enter a valid owner passcode (minimum 4 characters).",
        );
        return false;
      }
      window.sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, "true");
      setIsAuthenticated(true);
      notify("success", "Owner session authenticated.");
      return true;
    },
    [notify],
  );

  const signOutOwner = useCallback(() => {
    window.sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    setIsAuthenticated(false);
    setIsAdminOpen(false);
    notify("success", "Signed out from owner workspace.");
  }, [notify]);

  const updateProfile = useCallback(
    (profileUpdates) => {
      persistUpdate(
        (prev) => ({
          ...prev,
          profile: { ...prev.profile, ...profileUpdates },
        }),
        "Profile information updated.",
      );
    },
    [persistUpdate],
  );

  const updateCollection = useCallback(
    (collectionKey, items, message) => {
      persistUpdate(
        (prev) => ({
          ...prev,
          [collectionKey]: items,
        }),
        message,
      );
    },
    [persistUpdate],
  );

  const resetAllData = useCallback(() => {
    const fresh = storageService.resetPortfolioData();
    setPortfolio(fresh);
    notify("success", "Portfolio restored to default placeholders.");
  }, [notify]);

  const filteredProjects = useMemo(() => {
    if (selectedStatus === PROJECT_STATUSES.ALL) {
      return portfolio.projects;
    }
    return portfolio.projects.filter(
      (project) => project.status === selectedStatus,
    );
  }, [portfolio.projects, selectedStatus]);

  return {
    portfolio,
    selectedStatus,
    setSelectedStatus,
    filteredProjects,
    activeProject,
    setActiveProject,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    signInOwner,
    signOutOwner,
    updateProfile,
    updateCollection,
    resetAllData,
    notification,
    notify,
  };
};
