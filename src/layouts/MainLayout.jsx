import { CustomCursor } from "../components/CustomCursor";
import { Navbar } from "../components/Navbar";

export const MainLayout = ({
  ownerName,
  themeMode,
  onThemeChange,
  isAuthenticated,
  onOpenAdmin,
  children,
}) => {
  return (
    <>
      <CustomCursor />
      <Navbar
        ownerName={ownerName}
        themeMode={themeMode}
        onThemeChange={onThemeChange}
        isAuthenticated={isAuthenticated}
        onOpenAdmin={onOpenAdmin}
      />
      {children}
    </>
  );
};
