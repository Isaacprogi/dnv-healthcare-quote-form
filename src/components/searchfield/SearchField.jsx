import { SearchIcon } from "../icons/Icons";
import styles from "./SearchField.module.css";

export default function SearchField({
  id,
  value,
  onChange,
  placeholder = "Search services...",
  ariaLabel,
}) {
  return (
    <div className={styles.wrap}>
      <input
        id={id}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel || placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon className={styles.icon} />
    </div>
  );
}
