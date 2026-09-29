import FormField from "../formfield/FormField";
import { CalendarIcon } from "../icons/Icons";
import cx from "../../utils/cx";
import styles from "./DateField.module.css";


export function DateControl({
  id,
  value,
  onChange,
  invalid = false,
  ariaLabel,
}) {
  return (
    <div className={styles.wrap}>
      <input
        id={id}
        type="date"
        className={cx(
          styles.input,
          !value && styles.empty,
          invalid && styles.invalid,
        )}
        value={value}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      <CalendarIcon className={styles.icon} />
    </div>
  );
}

export default function DateField({
  id,
  label,
  required,
  error,
  hint,
  value,
  onChange,
}) {
  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
    >
      <DateControl
        id={id}
        value={value}
        onChange={onChange}
        invalid={!!error}
      />
    </FormField>
  );
}
