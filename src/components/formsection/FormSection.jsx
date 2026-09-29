import styles from "./FormSection.module.css";

/**
 * FormSection — a titled block inside a Card: 24px bold heading
 * (with an optional 14px gray description) followed by its content,
 * 32px apart (Figma "Frame 4 / Frame 5").
 */
export default function FormSection({ title, description, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children}
    </div>
  );
}
