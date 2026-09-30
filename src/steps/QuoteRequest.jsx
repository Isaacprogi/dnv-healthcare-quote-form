import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import TextInput from "../components/textinput/TextInput";
import Checkbox from "../components/checkbox/Checkbox";
import Button from "../components/button/Button";
import StatusBadge from "../components/statusbadge/StatusBadge";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/FormHooks";
import { validateStep1, hasErrors } from "../utils/validation";
import shared from "./Shared.module.css";


export default function Step1QuoteRequest({ onNext, onExit }) {
  const { organization, primaryContact } = useFormState();
  const dispatch = useFormDispatch();
  const [errors, setErrors] = useState({});

  const updateOrg = (payload) =>
    dispatch({ type: "UPDATE_SECTION", section: "organization", payload });
  const updateContact = (payload) =>
    dispatch({ type: "UPDATE_SECTION", section: "primaryContact", payload });

  const handleSameAsLegal = (checked) => {
    updateOrg({
      sameAsLegalEntity: checked,
      dbaName: checked ? organization.legalEntityName : organization.dbaName,
    });
  };

  const handleSendVerification = () => {
    updateContact({ verified: true });
  };

  const runValidation = () => {
    const result = validateStep1({ organization, primaryContact });
    setErrors(result);
    return !hasErrors(result);
  };

  return (
    <StepLayout currentStep={1} showExit onExit={onExit} onContinue={() => runValidation() && onNext()}>
      <Card>
        <FormSection title="Identify Healthcare Organization">
          <TextInput
            id="legalEntityName"
            label="Legal Entity Name"
            required
            value={organization.legalEntityName}
            error={errors.legalEntityName}
            onChange={(v) =>
              updateOrg({
                legalEntityName: v,
                dbaName: organization.sameAsLegalEntity ? v : organization.dbaName,
              })
            }
          />

          <TextInput
            id="dbaName"
            label="Doing Business As (d/b/a) Name"
            required={!organization.sameAsLegalEntity}
            value={organization.dbaName}
            error={errors.dbaName}
            disabled={organization.sameAsLegalEntity}
            onChange={(v) => updateOrg({ dbaName: v })}
          />
          <Checkbox
            id="sameAsLegalEntity"
            label="Same as Legal Entity Name"
            checked={organization.sameAsLegalEntity}
            onChange={handleSameAsLegal}
          />
        </FormSection>

        <FormSection
          title="Primary Contact Information"
          description="Primary contact receives all DNV Healthcare official communications"
        >
          <div className={shared.twoCol}>
            <TextInput
              id="firstName"
              label="First Name"
              required
              value={primaryContact.firstName}
              error={errors.firstName}
              onChange={(v) => updateContact({ firstName: v })}
            />
            <TextInput
              id="lastName"
              label="Last Name"
              required
              value={primaryContact.lastName}
              error={errors.lastName}
              onChange={(v) => updateContact({ lastName: v })}
            />
          </div>

          <TextInput
            id="title"
            label="Title"
            required
            value={primaryContact.title}
            error={errors.title}
            onChange={(v) => updateContact({ title: v })}
          />

          <div className={shared.twoCol}>
            <TextInput
              id="workPhone"
              label="Work Phone"
              type="tel"
              required
              value={primaryContact.workPhone}
              error={errors.workPhone}
              onChange={(v) => updateContact({ workPhone: v })}
            />
            <TextInput
              id="cellPhone"
              label="Cell Phone"
              type="tel"
              value={primaryContact.cellPhone}
              onChange={(v) => updateContact({ cellPhone: v })}
            />
          </div>

          <TextInput
            id="email"
            label="Email"
            type="email"
            required
            value={primaryContact.email}
            error={errors.email}
            onChange={(v) => updateContact({ email: v, verified: false })}
          />

          <div className={shared.emailRow}>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSendVerification}
              disabled={!primaryContact.email}
            >
              Send Verification Email
            </Button>
            <StatusBadge verified={primaryContact.verified} />
          </div>
        </FormSection>
      </Card>
    </StepLayout>
  );
}
