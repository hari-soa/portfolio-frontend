import { useState } from "react";
import styles from "../styles/ContactSection.module.css";

export const ContactSection = ({ profile, onNotify }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formState.name.trim() ||
      !formState.email.includes("@") ||
      !formState.message.trim()
    ) {
      onNotify(
        "error",
        "Please complete all contact fields with a valid email address.",
      );
      return;
    }
    onNotify(
      "success",
      "Message validated. Connect a backend endpoint to dispatch emails.",
    );
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.lead}>
          Available for software engineering opportunities, AI development
          collaborations, and technical inquiries.
        </p>

        <ul className={styles.linkList}>
          <li>
            <strong>Email:</strong>{" "}
            {profile.email.startsWith("[") ? (
              <span>{profile.email}</span>
            ) : (
              <a href={`mailto:${profile.email}`} className={styles.linkItem}>
                {profile.email}
              </a>
            )}
          </li>
          {profile.githubUrl && (
            <li>
              <strong>GitHub:</strong>{" "}
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                {profile.githubUrl}
              </a>
            </li>
          )}
          {profile.linkedinUrl && (
            <li>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
              >
                {profile.linkedinUrl}
              </a>
            </li>
          )}
          <li>
            <strong>Location:</strong> <span>{profile.location}</span>
          </li>
        </ul>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span>Full Name</span>
          <input
            type="text"
            required
            className={styles.input}
            value={formState.name}
            onChange={(event) =>
              setFormState({ ...formState, name: event.target.value })
            }
          />
        </label>

        <label className={styles.field}>
          <span>Email Address</span>
          <input
            type="email"
            required
            className={styles.input}
            value={formState.email}
            onChange={(event) =>
              setFormState({ ...formState, email: event.target.value })
            }
          />
        </label>

        <label className={styles.field}>
          <span>Message</span>
          <textarea
            rows={4}
            required
            className={styles.textarea}
            value={formState.message}
            onChange={(event) =>
              setFormState({ ...formState, message: event.target.value })
            }
          />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Send Inquiry
        </button>
      </form>
    </div>
  );
};
