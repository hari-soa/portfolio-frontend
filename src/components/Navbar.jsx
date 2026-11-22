import { THEME_MODES } from "../config/themeConfig";
import styles from "../styles/Navbar.module.css";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = ({
  ownerName,
  themeMode,
  onThemeChange,
  isAuthenticated,
  onOpenAdmin,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand}>
          {ownerName}
        </a>

        <nav aria-label="Primary Navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.controls}>
          <div
            className={styles.themeGroup}
            role="group"
            aria-label="Theme preference"
          >
            {Object.values(THEME_MODES).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onThemeChange(mode)}
                className={`${styles.themeBtn} ${themeMode === mode ? styles.themeBtnActive : ""}`}
                aria-pressed={themeMode === mode}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenAdmin}
            className={styles.adminTrigger}
          >
            {isAuthenticated ? "Manage Content" : "Owner Sign In"}
          </button>
        </div>
      </div>
    </header>
  );
};
