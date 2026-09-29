import FormField from "../formfield/FormField";
import { CalendarIcon } from "../icons/Icons";
import cx from "../../utils/cx";
import styles from "./DateField.module.css";

/**
 * DateControl — the bare styled date input. It is a real
 * <input type="date">: the calendar glyph is decoration and the browser's
 * own picker indicator is stretched invisibly over the whole field, so a
 * click anywhere opens the picker.
 */
export function DateControl({ id, value, onChange, invalid = false, ariaLabel }) {
  return (
    <div className={styles.wrap}>
      <input
        id={id}
        type="date"
        className={cx(styles.input, !value && styles.empty, invalid && styles.invalid)}
        value={value}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      <CalendarIcon className={styles.icon} />
    </div>
  );
}

/** DateField — labeled single date (Figma "Datepicker"). */
export default function DateField({ id, label, required, error, hint, value, onChange }) {
  return (
    <FormField id={id} label={label} required={required} error={error} hint={hint}>
      <DateControl id={id} value={value} onChange={onChange} invalid={!!error} />
    </FormField>
  );
}
