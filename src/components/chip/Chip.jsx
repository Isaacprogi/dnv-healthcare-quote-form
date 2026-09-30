import { CloseIcon, CloseDiscIcon } from "../../data/Icons";
import cx from "../../utils/cx";
import styles from "./Chip.module.css";

export default function Chip({
  label,
  variant = "outline",
  bold = false,
  onRemove,
  removeLabel,
}) {
  return (
    <span className={cx(styles.chip, styles[variant], bold && styles.bold)}>
      <span className={styles.text}>{label}</span>
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          aria-label={removeLabel || `Remove ${label}`}
          onClick={onRemove}
        >
          {variant === "solid" ? (
            <CloseDiscIcon className={styles.icon} />
          ) : (
            <CloseIcon className={styles.icon} />
          )}
        </button>
      )}
    </span>
  );
}
