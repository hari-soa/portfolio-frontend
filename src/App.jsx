import { useThemeController } from "./controllers/useThemeController";
import { usePortfolioController } from "./controllers/usePortfolioController";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";
import styles from "./styles/HomePage.module.css";

export const App = () => {
  const { themeMode, setThemeMode } = useThemeController();
  const {
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
  } = usePortfolioController();

  return (
    <MainLayout
      ownerName={portfolio.profile.fullName}
      themeMode={themeMode}
      onThemeChange={setThemeMode}
      isAuthenticated={isAuthenticated}
      onOpenAdmin={() => setIsAdminOpen(true)}
    >
      <HomePage
        portfolio={portfolio}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        filteredProjects={filteredProjects}
        activeProject={activeProject}
        onViewProject={setActiveProject}
        onCloseProject={() => setActiveProject(null)}
        onNotify={notify}
      />

      <AdminPage
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAuthenticated={isAuthenticated}
        onSignIn={signInOwner}
        onSignOut={signOutOwner}
        portfolio={portfolio}
        onUpdateProfile={updateProfile}
        onUpdateCollection={updateCollection}
        onResetAll={resetAllData}
        onNotify={notify}
      />

      {notification && (
        <div role="status" className={styles.toast}>
          {notification.message}
        </div>
      )}
    </MainLayout>
  );
};
