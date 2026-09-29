import styles from "./FormSection.module.css";

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
