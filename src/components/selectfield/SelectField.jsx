import FormField from "../formfield/FormField";
import { CaretDownIcon } from "../icons/CaretDownIcon";
import cx from "../../utils/cx";
import styles from "./SelectField.module.css";

export function SelectControl({
  id,
  value,
  onChange,
  options,
  placeholder = "Select",
  invalid = false,
  disabled = false,
  ariaLabel,
}) {
  return (
    <div className={styles.wrap}>
      <select
        id={id}
        className={cx(
          styles.select,
          !value && styles.placeholder,
          invalid && styles.invalid,
        )}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <CaretDownIcon className={styles.caret} />
    </div>
  );
}

/** SelectField — labeled dropdown (Figma "Drop down"). */
export default function SelectField({
  id,
  label,
  required,
  error,
  hint,
  ...control
}) {
  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
    >
      <SelectControl id={id} invalid={!!error} {...control} />
    </FormField>
  );
}
