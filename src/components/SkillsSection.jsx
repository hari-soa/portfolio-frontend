import styles from "../styles/SkillsSection.module.css";

export const SkillsSection = ({ skillCategories }) => {
  return (
    <div>
      <p className={styles.notice}>
        Technologies listed below reflect confirmed stack items and candidate
        categories managed by the portfolio owner.
      </p>

      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <article key={category.id} className={styles.card}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <ul className={styles.pillGroup}>
              {category.items.map((skill) => (
                <li key={skill.id} className={styles.pill}>
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className={styles.candidateBadge}>
                      • {skill.level}
                    </span>
                  )}
                  {!skill.confirmed && (
                    <span className={styles.candidateBadge}>(Candidate)</span>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};
