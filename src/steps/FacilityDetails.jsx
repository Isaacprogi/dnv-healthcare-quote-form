import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import RadioOption from "../components/radio/RadioOption";
import Checkbox from "../components/checkbox/Checkbox";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/FormContext";
import { validateStep2, hasErrors } from "../utils/validation";
import shared from "./Shared.module.css";
import styles from "./FacilityDetails.module.css";

// The Figma frames "Facility Details" and "Facility Details-If Yes" show two
// variants of this option list: a facility that is part of a larger legal
// entity gets "Same as Legal Entity Name" as its first choice instead of
// "Short-Term Acute Care".
const STANDARD_OPTIONS = [
  "Short-Term Acute Care",
  "Long-Term Acute Care",
  "Critical Access",
  "Children's",
  "Free-Standing Psychiatric",
  "Other",
];

const PART_OF_SYSTEM_OPTIONS = [
  "Same as Legal Entity Name",
  "Critical Access",
  "Children's",
  "Long-Term Acute Care (LTAC)",
  "Free-Standing Psychiatric",
  "Other",
];

export default function Step2FacilityDetails({ onNext, onPrevious }) {
  const { facility } = useFormState();
  const dispatch = useFormDispatch();
  const [errors, setErrors] = useState({});

  const update = (payload) => dispatch({ type: "UPDATE_SECTION", section: "facility", payload });

  const options = facility.sameAsLegalEntityName ? PART_OF_SYSTEM_OPTIONS : STANDARD_OPTIONS;

  const runValidation = () => {
    const result = validateStep2({ facility });
    setErrors(result);
    return !hasErrors(result);
  };

  return (
    <StepLayout currentStep={2} onPrevious={onPrevious} onContinue={() => runValidation() && onNext()}>
      <Card>
        <FormSection title="Facility and Organization Type">
          <Checkbox
            id="partOfSystem"
            label="This facility is part of a larger legal entity or health system"
            checked={facility.sameAsLegalEntityName}
            onChange={(checked) => update({ sameAsLegalEntityName: checked, facilityType: "" })}
          />

          <div className={styles.optionList} role="radiogroup" aria-label="Facility Type">
            <p className={styles.optionsLabel}>
              Facility Type <span className={styles.required}>*</span>
            </p>
            {options.map((label) => (
              <RadioOption
                key={label}
                id={`facilityType-${label}`}
                name="facilityType"
                label={label}
                checked={facility.facilityType === label}
                onChange={(v) => update({ facilityType: v })}
              />
            ))}
            {errors.facilityType && <p className={shared.fieldError}>{errors.facilityType}</p>}
          </div>
        </FormSection>
      </Card>
    </StepLayout>
  );
}
