import FormField from "../formfield/FormField";
import { DateControl } from "../datefield/DateField";
import Chip from "../chip/Chip";
import { formatDate } from "../../utils/format";
import styles from "./DateTagInput.module.css";

export default function DateTagInput({ id, label, values, onChange, max }) {
  const atLimit = Boolean(max) && values.length >= max;

  const addDate = (iso) => {
    if (!iso || atLimit) return;
    onChange([...values, iso]);
  };

  const removeAt = (index) => onChange(values.filter((_, i) => i !== index));

  return (
    <FormField
      id={id}
      label={label}
      hint={atLimit ? `Maximum of ${max} dates reached.` : undefined}
    >
      {/* key resets the native input after each pick so the same date can be re-added */}
      <DateControl key={values.length} id={id} value="" onChange={addDate} />
      {values.length > 0 && (
        <ul className={styles.chips}>
          {values.map((date, i) => (
            <li key={`${date}-${i}`}>
              <Chip
                variant="solid"
                label={formatDate(date)}
                removeLabel={`Remove ${formatDate(date)}`}
                onRemove={() => removeAt(i)}
              />
            </li>
          ))}
        </ul>
      )}
    </FormField>
  );
}
