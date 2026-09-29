import cx from "../../utils/cx";
import styles from "./Checkbox.module.css";

/**
 * Checkbox — Figma "Checkbox" (Sm, 20px). A visually-hidden native input
 * drives an aria-hidden drawn box, so keyboard + screen-reader behaviour
 */
export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  error = false,
}) {
  return (
    <label
      className={cx(styles.root, disabled && styles.disabled, error && styles.error)}
      htmlFor={id}
    >
      <span className={styles.control}>
        <input
          id={id}
          className={styles.input}
          type="checkbox"
          checked={!!checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.box} aria-hidden="true" />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
