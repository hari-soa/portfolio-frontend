import { AboutSection } from "../components/AboutSection";
import { TimelineSection } from "../components/TimelineSection";
import { SkillsSection } from "../components/SkillsSection";
import { CertificationsSection } from "../components/CertificationsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ProjectModal } from "../components/ProjectModal";
import { ContactSection } from "../components/ContactSection";
import styles from "../styles/HomePage.module.css";

export const HomePage = ({
  portfolio,
  selectedStatus,
  onSelectStatus,
  filteredProjects,
  activeProject,
  onViewProject,
  onCloseProject,
  onNotify,
}) => {
  const { profile, education, pathways, skillCategories, certifications } =
    portfolio;

  return (
    <main id="home" className={styles.main}>
      <section className={styles.hero} aria-labelledby="hero-heading">
        <span className={styles.eyebrow}>{profile.role}</span>
        <h1 id="hero-heading" className={styles.heroTitle}>
          {profile.fullName}
        </h1>
        <p className={styles.heroSubtitle}>{profile.tagline}</p>

        <div className={styles.ctaRow}>
          <a href="#projects" className={styles.primaryCta}>
            Explore Selected Work
          </a>
          <a href="#contact" className={styles.secondaryCta}>
            Get in Touch
          </a>
        </div>
      </section>

      <section
        id="about"
        className={styles.section}
        aria-labelledby="about-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="about-heading" className={styles.sectionTitle}>
            About
          </h2>
          <span className={styles.sectionNumber}>01 / Profile</span>
        </div>
        <AboutSection profile={profile} />
      </section>

      <section
        id="education"
        className={styles.section}
        aria-labelledby="education-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="education-heading" className={styles.sectionTitle}>
            Education & Pathways
          </h2>
          <span className={styles.sectionNumber}>02 / Academic & Tracks</span>
        </div>
        <TimelineSection education={education} pathways={pathways} />
      </section>

      <section
        id="skills"
        className={styles.section}
        aria-labelledby="skills-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="skills-heading" className={styles.sectionTitle}>
            Skills & Stack
          </h2>
          <span className={styles.sectionNumber}>03 / Capabilities</span>
        </div>
        <SkillsSection skillCategories={skillCategories} />
      </section>

      <section
        id="certifications"
        className={styles.section}
        aria-labelledby="certifications-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="certifications-heading" className={styles.sectionTitle}>
            Certifications
          </h2>
          <span className={styles.sectionNumber}>04 / Credentials</span>
        </div>
        <CertificationsSection certifications={certifications} />
      </section>

      <section
        id="projects"
        className={styles.section}
        aria-labelledby="projects-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="projects-heading" className={styles.sectionTitle}>
            Projects
          </h2>
          <span className={styles.sectionNumber}>
            05 / Selected Engineering
          </span>
        </div>
        <ProjectsSection
          projects={filteredProjects}
          selectedStatus={selectedStatus}
          onSelectStatus={onSelectStatus}
          onViewProject={onViewProject}
        />
      </section>

      <section
        id="contact"
        className={styles.section}
        aria-labelledby="contact-heading"
      >
        <div className={styles.sectionHeader}>
          <h2 id="contact-heading" className={styles.sectionTitle}>
            Contact
          </h2>
          <span className={styles.sectionNumber}>06 / Connect</span>
        </div>
        <ContactSection profile={profile} onNotify={onNotify} />
      </section>

      <ProjectModal project={activeProject} onClose={onCloseProject} />
    </main>
  );
};
