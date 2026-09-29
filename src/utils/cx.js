/** Joins class names, skipping falsy values: cx(styles.a, isOn && styles.b) */
export default function cx(...names) {
  return names.filter(Boolean).join(" ");
}
