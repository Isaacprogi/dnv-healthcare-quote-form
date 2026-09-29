import cx from "../../utils/cx";
import styles from "./RadioCard.module.css";

export default function RadioCard({
  title,
  description,
  selected,
  onSelect,
  name,
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      name={name}
      className={cx(styles.card, selected && styles.selected)}
      onClick={onSelect}
    >
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.description}>{description}</span>}
    </button>
  );
}
