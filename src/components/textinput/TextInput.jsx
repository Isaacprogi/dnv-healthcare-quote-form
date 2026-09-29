import FormField from "../formfield/FormField";
import cx from "../../utils/cx";
import styles from "./TextInput.module.css";

/**
 * TextInput — controlled text/email/tel/number input (Figma "Inputs").
 * Validation lives in the steps / validation.js; this only renders
 * the error state it is given.
 */
export default function TextInput({
  id,
  label,
  required,
  error,
  hint,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}) {
  return (
    <FormField id={id} label={label} required={required} error={error} hint={hint}>
      <input
        id={id}
        type={type}
        className={cx(styles.input, error && styles.invalid)}
        value={value ?? ""}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-required={required || undefined}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormField>
  );
}
