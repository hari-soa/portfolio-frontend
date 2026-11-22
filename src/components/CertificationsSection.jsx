import styles from "../styles/CertificationsSection.module.css";

export const CertificationsSection = ({ certifications }) => {
  if (!certifications.length) {
    return <p>No certifications published yet.</p>;
  }

  return (
    <div className={styles.grid}>
      {certifications.map((cert) => (
        <article key={cert.id} className={styles.card}>
          <div>
            <span className={styles.issuer}>{cert.issuer}</span>
            <h3 className={styles.title}>{cert.title}</h3>
            <p className={styles.meta}>Issued: {cert.date}</p>
            {cert.credentialId && (
              <p className={styles.meta}>Credential ID: {cert.credentialId}</p>
            )}
          </div>

          {cert.pdfUrl ? (
            <a
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={cert.pdfName || `${cert.title}.pdf`}
              className={styles.pdfLink}
            >
              View / Download Certificate PDF ↗
            </a>
          ) : (
            <span className={styles.pdfPending}>
              PDF document pending owner upload
            </span>
          )}
        </article>
      ))}
    </div>
  );
};
