import { FileIcon, CloseBadgeIcon } from "../icons/Icons";
import { formatFileSize } from "../../utils/format";
import cx from "../../utils/cx";
import styles from "./FileCard.module.css";

/** FileCard — Figma "File Uploading": an uploaded file's name, size and a remove control. */
export default function FileCard({ name, size, onRemove }) {
  return (
    <div className={cx(styles.card, onRemove && styles.removable)}>
      <FileIcon className={styles.icon} />
      <div className={styles.row}>
        <span className={styles.name}>{name}</span>
        <span className={styles.size}>{formatFileSize(size)}</span>
      </div>
      {onRemove && (
        <button type="button" className={styles.remove} aria-label={`Remove ${name}`} onClick={onRemove}>
          <CloseBadgeIcon className={styles.removeIcon} />
        </button>
      )}
    </div>
  );
}
