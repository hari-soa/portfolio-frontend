import { useEffect, useState } from "react";
import styles from "../styles/CustomCursor.module.css";

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, [role="button"]';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = event.target;
      setIsInteractive(Boolean(target && target.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const cursorClassName = `${styles.cursorDot} ${isInteractive ? styles.cursorExpanded : ""}`;

  return (
    <div
      aria-hidden="true"
      className={cursorClassName}
      style={{
        transform: `translate3d(${position.x - (isInteractive ? 19 : 7)}px, ${
          position.y - (isInteractive ? 19 : 7)
        }px, 0)`,
      }}
    />
  );
};
