import styles from "../styles/AboutSection.module.css";

const DEFAULT_MONOGRAM = "RLZ";

export const AboutSection = ({ profile }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.portraitFrame}>
        {profile.portraitUrl ? (
          <img
            src={profile.portraitUrl}
            alt={`Portrait of ${profile.fullName}`}
            className={styles.portraitImg}
            loading="lazy"
          />
        ) : (
          <>
            <span className={styles.monogram} aria-hidden="true">
              {DEFAULT_MONOGRAM}
            </span>
            <p className={styles.monogramCaption}>
              Portrait optional — typographic identity active
            </p>
          </>
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.lead}>{profile.bio}</p>
        <p className={styles.bodyText}>{profile.approach}</p>

        <div>
          <strong>Core Focus & Interests</strong>
          <ul className={styles.interestList}>
            {profile.interests.map((interest) => (
              <li key={interest} className={styles.interestTag}>
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
