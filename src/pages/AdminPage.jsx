import { useState } from "react";
import { PROJECT_STATUSES } from "../config/themeConfig";
import { storageService } from "../services/storageService";
import styles from "../styles/AdminPage.module.css";

const ADMIN_TABS = [
  "Profile",
  "Education",
  "Skills",
  "Certifications",
  "Projects",
];

export const AdminPage = ({
  isOpen,
  onClose,
  isAuthenticated,
  onSignIn,
  onSignOut,
  portfolio,
  onUpdateProfile,
  onUpdateCollection,
  onResetAll,
  onNotify,
}) => {
  const [passcode, setPasscode] = useState("");
  const [activeTab, setActiveTab] = useState("Profile");

  if (!isOpen) {
    return null;
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (onSignIn(passcode)) {
      setPasscode("");
    }
  };

  const handlePortraitUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const dataUrl = await storageService.readFileAsDataUrl(
        file,
        ["image/jpeg", "image/png", "image/webp"],
        3,
      );
      onUpdateProfile({ portraitUrl: dataUrl });
    } catch (error) {
      onNotify("error", error.message);
    }
  };

  const handleCertificatePdfUpload = async (certId, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const dataUrl = await storageService.readFileAsDataUrl(
        file,
        ["application/pdf"],
        5,
      );
      const updated = portfolio.certifications.map((item) =>
        item.id === certId
          ? { ...item, pdfUrl: dataUrl, pdfName: file.name }
          : item,
      );
      onUpdateCollection(
        "certifications",
        updated,
        "Certificate PDF attached.",
      );
    } catch (error) {
      onNotify("error", error.message);
    }
  };

  const handleProjectScreenshotUpload = async (projectId, event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    try {
      const dataUrl = await storageService.readFileAsDataUrl(
        file,
        ["image/jpeg", "image/png", "image/webp"],
        4,
      );
      const updated = portfolio.projects.map((proj) =>
        proj.id === projectId
          ? { ...proj, screenshots: [...(proj.screenshots || []), dataUrl] }
          : proj,
      );
      onUpdateCollection("projects", updated, "Project screenshot uploaded.");
    } catch (error) {
      onNotify("error", error.message);
    }
  };

  const confirmAndDelete = (label, callback) => {
    if (window.confirm(`Confirm permanent removal of ${label}?`)) {
      callback();
    }
  };

  return (
    <div
      className={styles.drawerOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Owner Admin"
    >
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2>Owner Content Management</h2>
          <div className={styles.actionRow}>
            {isAuthenticated && (
              <button
                type="button"
                onClick={onSignOut}
                className={styles.dangerBtn}
              >
                Sign Out
              </button>
            )}
            <button type="button" onClick={onClose} className={styles.tabBtn}>
              Close
            </button>
          </div>
        </div>

        {!isAuthenticated ? (
          <form className={styles.authCard} onSubmit={handleLoginSubmit}>
            <h3>Owner Authentication</h3>
            <p className={styles.securityNote}>
              Production deployment requires server-enforced authentication
              (e.g., Supabase Auth, Firebase Auth, or JWT API) so only the owner
              role can mutate data.
            </p>
            <input
              type="password"
              placeholder="Enter owner passcode"
              className={styles.input}
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
            />
            <button type="submit" className={styles.primaryBtn}>
              Sign In as Owner
            </button>
          </form>
        ) : (
          <div>
            <div className={styles.tabBar}>
              {ADMIN_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ""}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Profile" && (
              <div className={styles.panel}>
                <label>
                  <span>Full Name</span>
                  <input
                    className={styles.input}
                    value={portfolio.profile.fullName}
                    onChange={(e) =>
                      onUpdateProfile({ fullName: e.target.value })
                    }
                  />
                </label>
                <label>
                  <span>Professional Positioning</span>
                  <input
                    className={styles.input}
                    value={portfolio.profile.role}
                    onChange={(e) => onUpdateProfile({ role: e.target.value })}
                  />
                </label>
                <label>
                  <span>Biography</span>
                  <textarea
                    rows={4}
                    className={styles.textarea}
                    value={portfolio.profile.bio}
                    onChange={(e) => onUpdateProfile({ bio: e.target.value })}
                  />
                </label>
                <div className={styles.row}>
                  <label>
                    <span>Email</span>
                    <input
                      className={styles.input}
                      value={portfolio.profile.email}
                      onChange={(e) =>
                        onUpdateProfile({ email: e.target.value })
                      }
                    />
                  </label>
                  <label>
                    <span>GitHub URL</span>
                    <input
                      className={styles.input}
                      value={portfolio.profile.githubUrl}
                      onChange={(e) =>
                        onUpdateProfile({ githubUrl: e.target.value })
                      }
                    />
                  </label>
                </div>
                <div className={styles.actionRow}>
                  <label className={styles.tabBtn}>
                    Upload Portrait (JPG/PNG/WebP)
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      hidden
                      onChange={handlePortraitUpload}
                    />
                  </label>
                  {portfolio.profile.portraitUrl && (
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      onClick={() => onUpdateProfile({ portraitUrl: "" })}
                    >
                      Remove Portrait
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Education" && (
              <div className={styles.panel}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() =>
                    onUpdateCollection(
                      "education",
                      [
                        ...portfolio.education,
                        {
                          id: `edu-${Date.now()}`,
                          period: "YYYY – YYYY",
                          institution: "Institution Name",
                          qualification: "Degree Title",
                          milestone: "",
                        },
                      ],
                      "Education entry added.",
                    )
                  }
                >
                  + Add Education Entry
                </button>
                {portfolio.education.map((edu) => (
                  <div key={edu.id} className={styles.itemCard}>
                    <div className={styles.row}>
                      <input
                        className={styles.input}
                        value={edu.period}
                        onChange={(e) =>
                          onUpdateCollection(
                            "education",
                            portfolio.education.map((item) =>
                              item.id === edu.id
                                ? { ...item, period: e.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                      <input
                        className={styles.input}
                        value={edu.institution}
                        onChange={(e) =>
                          onUpdateCollection(
                            "education",
                            portfolio.education.map((item) =>
                              item.id === edu.id
                                ? { ...item, institution: e.target.value }
                                : item,
                            ),
                          )
                        }
                      />
                    </div>
                    <input
                      className={styles.input}
                      value={edu.qualification}
                      onChange={(e) =>
                        onUpdateCollection(
                          "education",
                          portfolio.education.map((item) =>
                            item.id === edu.id
                              ? { ...item, qualification: e.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                    <button
                      type="button"
                      className={styles.dangerBtn}
                      onClick={() =>
                        confirmAndDelete(edu.qualification, () =>
                          onUpdateCollection(
                            "education",
                            portfolio.education.filter(
                              (item) => item.id !== edu.id,
                            ),
                            "Education entry removed.",
                          ),
                        )
                      }
                    >
                      Delete Entry
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Skills" && (
              <div className={styles.panel}>
                {portfolio.skillCategories.map((cat) => (
                  <div key={cat.id} className={styles.itemCard}>
                    <strong>{cat.title}</strong>
                    {cat.items.map((skill) => (
                      <div key={skill.id} className={styles.actionRow}>
                        <input
                          className={styles.input}
                          style={{ maxWidth: "200px" }}
                          value={skill.name}
                          onChange={(e) =>
                            onUpdateCollection(
                              "skillCategories",
                              portfolio.skillCategories.map((c) =>
                                c.id === cat.id
                                  ? {
                                      ...c,
                                      items: c.items.map((s) =>
                                        s.id === skill.id
                                          ? { ...s, name: e.target.value }
                                          : s,
                                      ),
                                    }
                                  : c,
                              ),
                            )
                          }
                        />
                        <label>
                          <input
                            type="checkbox"
                            checked={skill.confirmed}
                            onChange={(e) =>
                              onUpdateCollection(
                                "skillCategories",
                                portfolio.skillCategories.map((c) =>
                                  c.id === cat.id
                                    ? {
                                        ...c,
                                        items: c.items.map((s) =>
                                          s.id === skill.id
                                            ? {
                                                ...s,
                                                confirmed: e.target.checked,
                                              }
                                            : s,
                                        ),
                                      }
                                    : c,
                                ),
                                "Skill confirmation updated.",
                              )
                            }
                          />{" "}
                          Confirmed
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Certifications" && (
              <div className={styles.panel}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() =>
                    onUpdateCollection(
                      "certifications",
                      [
                        ...portfolio.certifications,
                        {
                          id: `cert-${Date.now()}`,
                          title: "New Certificate",
                          issuer: "Issuer",
                          date: "YYYY",
                          credentialId: "",
                          pdfUrl: "",
                          pdfName: "",
                        },
                      ],
                      "Certificate added.",
                    )
                  }
                >
                  + Add Certificate
                </button>
                {portfolio.certifications.map((cert) => (
                  <div key={cert.id} className={styles.itemCard}>
                    <input
                      className={styles.input}
                      value={cert.title}
                      onChange={(e) =>
                        onUpdateCollection(
                          "certifications",
                          portfolio.certifications.map((c) =>
                            c.id === cert.id
                              ? { ...c, title: e.target.value }
                              : c,
                          ),
                        )
                      }
                    />
                    <div className={styles.row}>
                      <input
                        className={styles.input}
                        value={cert.issuer}
                        onChange={(e) =>
                          onUpdateCollection(
                            "certifications",
                            portfolio.certifications.map((c) =>
                              c.id === cert.id
                                ? { ...c, issuer: e.target.value }
                                : c,
                            ),
                          )
                        }
                      />
                      <input
                        className={styles.input}
                        value={cert.date}
                        onChange={(e) =>
                          onUpdateCollection(
                            "certifications",
                            portfolio.certifications.map((c) =>
                              c.id === cert.id
                                ? { ...c, date: e.target.value }
                                : c,
                            ),
                          )
                        }
                      />
                    </div>
                    <div className={styles.actionRow}>
                      <label className={styles.tabBtn}>
                        Upload PDF (Max 5MB)
                        <input
                          type="file"
                          accept="application/pdf"
                          hidden
                          onChange={(e) =>
                            handleCertificatePdfUpload(cert.id, e)
                          }
                        />
                      </label>
                      {cert.pdfName && <span>Attached: {cert.pdfName}</span>}
                      <button
                        type="button"
                        className={styles.dangerBtn}
                        onClick={() =>
                          confirmAndDelete(cert.title, () =>
                            onUpdateCollection(
                              "certifications",
                              portfolio.certifications.filter(
                                (c) => c.id !== cert.id,
                              ),
                              "Certificate deleted.",
                            ),
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Projects" && (
              <div className={styles.panel}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() =>
                    onUpdateCollection(
                      "projects",
                      [
                        ...portfolio.projects,
                        {
                          id: `proj-${Date.now()}`,
                          title: "New Project",
                          shortSummary: "Short summary",
                          fullDescription: "Detailed description",
                          status: PROJECT_STATUSES.IN_PROGRESS,
                          tags: ["React"],
                          role: "Developer",
                          period: "2026",
                          repoUrl: "",
                          demoUrl: "",
                          screenshots: [],
                        },
                      ],
                      "Project added.",
                    )
                  }
                >
                  + Add Project
                </button>
                {portfolio.projects.map((proj) => (
                  <div key={proj.id} className={styles.itemCard}>
                    <div className={styles.row}>
                      <input
                        className={styles.input}
                        value={proj.title}
                        onChange={(e) =>
                          onUpdateCollection(
                            "projects",
                            portfolio.projects.map((p) =>
                              p.id === proj.id
                                ? { ...p, title: e.target.value }
                                : p,
                            ),
                          )
                        }
                      />
                      <select
                        className={styles.select}
                        value={proj.status}
                        onChange={(e) =>
                          onUpdateCollection(
                            "projects",
                            portfolio.projects.map((p) =>
                              p.id === proj.id
                                ? { ...p, status: e.target.value }
                                : p,
                            ),
                            "Project status updated.",
                          )
                        }
                      >
                        <option value={PROJECT_STATUSES.IN_PROGRESS}>
                          In Progress
                        </option>
                        <option value={PROJECT_STATUSES.COMPLETED}>
                          Completed
                        </option>
                        <option value={PROJECT_STATUSES.UPCOMING}>
                          Upcoming
                        </option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      className={styles.textarea}
                      value={proj.shortSummary}
                      onChange={(e) =>
                        onUpdateCollection(
                          "projects",
                          portfolio.projects.map((p) =>
                            p.id === proj.id
                              ? { ...p, shortSummary: e.target.value }
                              : p,
                          ),
                        )
                      }
                    />
                    <div className={styles.actionRow}>
                      <label className={styles.tabBtn}>
                        + Add Screenshot
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          hidden
                          onChange={(e) =>
                            handleProjectScreenshotUpload(proj.id, e)
                          }
                        />
                      </label>
                      <span>
                        {(proj.screenshots || []).length} screenshot(s)
                      </span>
                      <button
                        type="button"
                        className={styles.dangerBtn}
                        onClick={() =>
                          confirmAndDelete(proj.title, () =>
                            onUpdateCollection(
                              "projects",
                              portfolio.projects.filter(
                                (p) => p.id !== proj.id,
                              ),
                              "Project deleted.",
                            ),
                          )
                        }
                      >
                        Delete Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <hr
              style={{ margin: "2rem 0", borderColor: "var(--border-subtle)" }}
            />
            <button
              type="button"
              className={styles.dangerBtn}
              onClick={() => confirmAndDelete("all custom edits", onResetAll)}
            >
              Reset All Content to Brief Placeholders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
