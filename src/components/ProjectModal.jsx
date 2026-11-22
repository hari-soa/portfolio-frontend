import { useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) {
      return undefined;
    }
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className={styles.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.topBar}>
          <div>
            <span>{project.status}</span>
            <h2 id="project-modal-title" className={styles.title}>
              {project.title}
            </h2>
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn}>
            Close
          </button>
        </div>

        <div className={styles.metaGrid}>
          <div>
            <strong>Role / Contribution</strong>
            <p>{project.role || "Not specified"}</p>
          </div>
          <div>
            <strong>Timeline</strong>
            <p>{project.period || "Not specified"}</p>
          </div>
          <div>
            <strong>Technologies</strong>
            <p>{project.tags.join(", ")}</p>
          </div>
        </div>

        <p className={styles.description}>{project.fullDescription}</p>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className={styles.gallery}>
            {project.screenshots.map((src, index) => (
              <img
                key={`${project.id}-shot-${index}`}
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
                className={styles.screenshot}
              />
            ))}
          </div>
        )}

        <div className={styles.linkRow}>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              Source Repository ↗
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.externalLink}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
