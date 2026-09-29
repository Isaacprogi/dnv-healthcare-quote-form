import cx from "../../utils/cx";
import styles from "./FormField.module.css";

export default function FormField({
  label,
  required,
  error,
  hint,
  children,
  id,
  className,
}) {
  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          <span>{label}</span>
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
