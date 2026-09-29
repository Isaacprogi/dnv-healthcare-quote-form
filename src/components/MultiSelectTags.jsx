import { SelectControl } from "./selectfield/SelectField";
import Chip from "./chip/Chip";
import styles from "./multiselecttags/MultiSelectTags.module.css";

/**
 * MultiSelectTags — Figma "Drop down" + "Label" chips: choosing an option
 * appends it as a removable chip below the dropdown (Standards to Apply).
 */
export default function MultiSelectTags({ id, ariaLabel, placeholder, options, values, onChange }) {
  const remaining = options.filter((o) => !values.includes(o));

  const add = (value) => {
    if (value) onChange([...values, value]);
  };

  const removeAt = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <div className={styles.root}>
      <SelectControl
        id={id}
        value=""
        onChange={add}
        options={remaining}
        placeholder={placeholder}
        ariaLabel={ariaLabel}
      />
      {values.length > 0 && (
        <ul className={styles.chips}>
          {values.map((v, i) => (
            <li key={v}>
              <Chip label={v} onRemove={() => removeAt(i)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
