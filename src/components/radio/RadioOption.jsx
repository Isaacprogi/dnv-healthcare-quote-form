import cx from "../../utils/cx";
import styles from "./RadioOption.module.css";

export default function RadioOption({
  id,
  name,
  label,
  checked,
  onChange,
  error = false,
}) {
  return (
    <label className={cx(styles.root, error && styles.error)} htmlFor={id}>
      <span className={styles.control}>
        <input
          id={id}
          className={styles.input}
          type="radio"
          name={name}
          checked={checked}
          onChange={() => onChange(label)}
        />
        <span className={styles.circle} aria-hidden="true" />
      </span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
