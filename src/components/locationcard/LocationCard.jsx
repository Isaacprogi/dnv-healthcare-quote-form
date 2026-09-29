import TextInput from "../textinput/TextInput";
import Checkbox from "../checkbox/Checkbox";
import styles from "./LocationCard.module.css";

const DAYS = ["M", "T", "W", "TH", "F", "SA", "SU"];

/** LocationCard — one "Practice Location N" block in manual Site Information entry. */
export default function LocationCard({ index, location, onChange, onRemove }) {
  const toggleDay = (day) => {
    const daysOpen = location.daysOpen.includes(day)
      ? location.daysOpen.filter((d) => d !== day)
      : [...location.daysOpen, day];
    onChange({ daysOpen });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.title}>Practice Location {index + 1}</span>
        <button type="button" className={styles.remove} onClick={onRemove}>
          Remove
        </button>
      </div>

      <TextInput
        id={`loc-${location.id}-address`}
        label="Street Address"
        value={location.address}
        onChange={(v) => onChange({ address: v })}
      />

      <div className={styles.row3}>
        <TextInput
          id={`loc-${location.id}-city`}
          label="City"
          value={location.city}
          onChange={(v) => onChange({ city: v })}
        />
        <TextInput
          id={`loc-${location.id}-state`}
          label="State"
          value={location.state}
          onChange={(v) => onChange({ state: v })}
        />
        <TextInput
          id={`loc-${location.id}-zip`}
          label="ZIP Code"
          value={location.zip}
          onChange={(v) => onChange({ zip: v })}
        />
      </div>

      <div className={styles.row3}>
        <TextInput
          id={`loc-${location.id}-ftes`}
          label="FTEs"
          type="number"
          value={location.ftes}
          onChange={(v) => onChange({ ftes: v })}
        />
        <TextInput
          id={`loc-${location.id}-shifts`}
          label="Shifts"
          type="number"
          value={location.shifts}
          onChange={(v) => onChange({ shifts: v })}
        />
        <TextInput
          id={`loc-${location.id}-miles`}
          label="Miles to Main"
          type="number"
          value={location.milesToMain}
          onChange={(v) => onChange({ milesToMain: v })}
        />
      </div>

      <div className={styles.days}>
        <p className={styles.daysLabel}>Days Open</p>
        <div className={styles.daysRow}>
          {DAYS.map((day) => (
            <Checkbox
              key={day}
              id={`loc-${location.id}-day-${day}`}
              label={day}
              checked={location.daysOpen.includes(day)}
              onChange={() => toggleDay(day)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
