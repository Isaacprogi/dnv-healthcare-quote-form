import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import ContactFieldset from "../components/contactfieldset/ContactFieldset";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/FormContext";
import { validateStep3, hasErrors } from "../utils/validation";

export default function Step3LeadershipContacts({ onNext, onPrevious }) {
  const { leadership, primaryContact } = useFormState();
  const dispatch = useFormDispatch();
  const [errors, setErrors] = useState({ ceo: {}, directorOfQuality: {}, invoicing: {} });

  const updateNested = (sub, payload) =>
    dispatch({ type: "UPDATE_NESTED", path: ["leadership", sub], payload });

  const runValidation = () => {
    const result = validateStep3({ leadership });
    setErrors(result);
    return !hasErrors(result);
  };

  return (
    <StepLayout currentStep={3} onPrevious={onPrevious} onContinue={() => runValidation() && onNext()}>
      <Card>
        <FormSection title="Contact Information">
          <ContactFieldset
            title="Chief Executive Officer (CEO)"
            contact={leadership.ceo}
            errors={errors.ceo}
            primaryContact={primaryContact}
            onChange={(payload) => updateNested("ceo", payload)}
          />
          <ContactFieldset
            title="Director of Quality"
            contact={leadership.directorOfQuality}
            errors={errors.directorOfQuality}
            primaryContact={primaryContact}
            requirePhoneEmail={false}
            onChange={(payload) => updateNested("directorOfQuality", payload)}
          />
          <ContactFieldset
            title="Invoicing Contact"
            contact={leadership.invoicing}
            errors={errors.invoicing}
            primaryContact={primaryContact}
            withAddress
            onChange={(payload) => updateNested("invoicing", payload)}
          />
        </FormSection>
      </Card>
    </StepLayout>
  );
}
