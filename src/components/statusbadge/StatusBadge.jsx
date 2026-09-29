import cx from "../../utils/cx";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ verified }) {
  return (
    <span
      className={cx(styles.badge, verified ? styles.verified : styles.pending)}
    >
      {verified ? "Verified" : "Not verified"}
    </span>
  );
}
