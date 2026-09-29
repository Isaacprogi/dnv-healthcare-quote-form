import cx from "../../utils/cx";
import styles from "./FormField.module.css";

/**
 * FormField — Figma "Inputs" wrapper: bold 16px label (with red asterisk
 * when required), the control, then optional helper / error text.
 * Label → control gap is 8px, so label + 44px control = 75px.
 */
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
