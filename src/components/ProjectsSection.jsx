import { PROJECT_STATUSES } from "../config/themeConfig";
import styles from "../styles/ProjectsSection.module.css";

const FILTER_OPTIONS = Object.values(PROJECT_STATUSES);

export const ProjectsSection = ({
  projects,
  selectedStatus,
  onSelectStatus,
  onViewProject,
}) => {
  const getStatusClassName = (status) => {
    if (status === PROJECT_STATUSES.COMPLETED) {
      return styles.statusCompleted;
    }
    if (status === PROJECT_STATUSES.IN_PROGRESS) {
      return styles.statusProgress;
    }
    return styles.statusUpcoming;
  };

  return (
    <div>
      <div
        className={styles.filterBar}
        role="tablist"
        aria-label="Filter projects by status"
      >
        {FILTER_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            role="tab"
            aria-selected={selectedStatus === status}
            onClick={() => onSelectStatus(status)}
            className={`${styles.filterBtn} ${
              selectedStatus === status ? styles.filterBtnActive : ""
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {projects.length === 0 ? (
        <p>No projects match the selected status filter.</p>
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.previewBox}>
                {project.screenshots && project.screenshots.length > 0 ? (
                  <img
                    src={project.screenshots[0]}
                    alt={`Interface preview for ${project.title}`}
                    className={styles.previewImg}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.placeholderArt}>
                    Interface Preview Pending
                  </span>
                )}
              </div>

              <div className={styles.cardBody}>
                <div className={styles.statusRow}>
                  <span
                    className={`${styles.statusBadge} ${getStatusClassName(project.status)}`}
                  >
                    {project.status}
                  </span>
                  {project.period && <span>{project.period}</span>}
                </div>

                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.summary}>{project.shortSummary}</p>

                <div className={styles.tagRow}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onViewProject(project)}
                  className={styles.viewBtn}
                >
                  View Project
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
