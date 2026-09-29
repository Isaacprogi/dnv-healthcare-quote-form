import { ChevronUpIcon } from "../icons/Icons";
import Chip from "../chip/Chip";
import cx from "../../utils/cx";
import styles from "./Summary.module.css";

/** SummarySection — Figma "Border": a navy header ("Basic Information" + Edit) over rows. */
export function SummarySection({ title, onEdit, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>
          <ChevronUpIcon className={styles.chevron} />
          {title}
        </span>
        <button type="button" className={styles.edit} onClick={onEdit}>
          Edit
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

/** SummaryRow — a "label / value" line inside a SummarySection. Renders nothing if value is empty. */
export function SummaryRow({ label, value }) {
  if (!value) return null;
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{value}</span>
    </div>
  );
}

/** SummaryPerson — the shaded "John Doe / title / phone / email / address" card. */
export function SummaryPerson({ label, name, lines = [], className }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={cx(styles.personBox, className)}>
        <div className={styles.person}>
          <p className={styles.personName}>{name}</p>
          <div className={styles.personLines}>
            {lines.filter(Boolean).map((line, i) => (
              <p key={i} className={styles.personLine}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** SummaryChips — a wrapping row of Chips inside a row's value column. */
export function SummaryChips({ label, items, bold = false }) {
  if (!items.length) return null;
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <div className={styles.chips}>
        {items.map((item) => (
          <Chip key={item} label={item} bold={bold} />
        ))}
      </div>
    </div>
  );
}
