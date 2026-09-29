import cx from "../../utils/cx";
import styles from "./StepHeader.module.css";

const STEP_LABELS = [
  "DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];

const STEP_TITLES = [
  "New DNV Quote Request",
  "Facility Details",
  "Leadership Contacts",
  "Site Information",
  "Services & Certifications",
  "Review & Submit",
];


export default function StepHeader({ currentStep }) {
  return (
    <div className={styles.header}>
      <div className={styles.meta}>
        <h1 className={styles.title}>{STEP_TITLES[currentStep - 1]}</h1>
        <span className={styles.count}>
          Step {currentStep} of {STEP_LABELS.length}
        </span>
      </div>

      <ol className={styles.track} aria-label="Form progress">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const state =
            stepNum < currentStep
              ? "done"
              : stepNum === currentStep
                ? "active"
                : "upcoming";
          return (
            <li
              key={label}
              className={styles.item}
              aria-current={state === "active" ? "step" : undefined}
            >
              <span className={styles.bar} aria-hidden="true">
                <span className={cx(styles.fill, styles[state])} />
              </span>
              <span className={styles.label}>{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
