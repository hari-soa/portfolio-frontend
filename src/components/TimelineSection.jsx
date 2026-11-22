import styles from "../styles/TimelineSection.module.css";

export const TimelineSection = ({ education, pathways }) => {
  return (
    <div className={styles.twoColumn}>
      <div>
        <h3 className={styles.columnHeading}>Education & Academic Years</h3>
        <div className={styles.timelineList}>
          {education.map((item) => (
            <article key={item.id} className={styles.entry}>
              <span className={styles.period}>{item.period}</span>
              <h4 className={styles.title}>{item.qualification}</h4>
              <p className={styles.subtitle}>{item.institution}</p>
              {item.milestone && (
                <p className={styles.detail}>{item.milestone}</p>
              )}
            </article>
          ))}
        </div>
      </div>

      <div>
        <h3 className={styles.columnHeading}>Background & Learning Paths</h3>
        <div className={styles.timelineList}>
          {pathways.map((track) => (
            <article key={track.id} className={styles.entry}>
              <span className={styles.period}>{track.period}</span>
              <h4 className={styles.title}>{track.title}</h4>
              <p className={styles.detail}>{track.focus}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
