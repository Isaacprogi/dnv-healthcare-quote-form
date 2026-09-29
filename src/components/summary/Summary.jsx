import { useId, useState } from "react";
import { ChevronUpIcon } from "../icons/Icons";
import Chip from "../chip/Chip";
import cx from "../../utils/cx";
import styles from "./Summary.module.css";

export function SummarySection({
  title,
  onEdit,
  children,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={() => setOpen((o) => !o)}
        >
          <ChevronUpIcon
            className={cx(styles.chevron, !open && styles.chevronClosed)}
          />
          <span className={styles.headerTitle}>{title}</span>
        </button>
        <button
          type="button"
          className={styles.edit}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </button>
      </div>
      {open && (
        <div id={bodyId} className={styles.body}>
          {children}
        </div>
      )}
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
