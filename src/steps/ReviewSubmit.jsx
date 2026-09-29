import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import Checkbox from "../components/checkbox/Checkbox";
import Button from "../components/button/Button";
import { SummarySection, SummaryRow, SummaryPerson, SummaryChips } from "../components/summary/Summary";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/FormContext";
import { validateStep6, hasErrors } from "../utils/validation";
import { formatDate } from "../utils/format";
import shared from "./Shared.module.css";
import styles from "./ReviewSubmit.module.css";

export default function Step6ReviewSubmit({ onPrevious, onEditStep, onSubmitted }) {
  const state = useFormState();
  const { organization, primaryContact, facility, leadership, site, services, review } = state;
  const dispatch = useFormDispatch();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateReview = (payload) => dispatch({ type: "UPDATE_SECTION", section: "review", payload });

  const handleSubmit = () => {
    const result = validateStep6({ review });
    setErrors(result);
    if (hasErrors(result)) return;

    // Required by the assessment: log the full payload to the console on submit.
    // eslint-disable-next-line no-console
    console.log("DNV Healthcare quote request submitted:", state);
    setSubmitted(true);
    onSubmitted?.(state);
  };

  const handleExportCsv = () => {
    const rows = [
      ["Field", "Value"],
      ["Legal Entity Name", organization.legalEntityName],
      ["d/b/a Name", organization.dbaName],
      ["Facility Type", facility.facilityType],
      ["Primary Contact", `${primaryContact.firstName} ${primaryContact.lastName}`],
      ["Primary Contact Email", primaryContact.email],
      ["Site Configuration", site.configuration],
      ["Services", services.selected.join("; ")],
    ];
    const csv = rows.map((r) => r.map((v) => `"${(v || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dnv-quote-request.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = () => {
    // A true PDF export needs a rendering dependency; per the "pure CSS,
    // no third-party libraries" constraint this opens a print-formatted
    // view the user can save as PDF from the browser's print dialog.
    window.print();
  };

  // Whichever way the sites were entered, Review shows one flat list of
  // locations: manual entries as typed, or every row from every uploaded
  // CSV file flattened together — same shape, same SummaryPerson rendering.
  // Every other Site Information summary value (the site count included)
  // is derived from this single list, so CSV and manual entry can never
  // disagree with each other again.
  const reviewLocations =
    site.inputMethod === "csv"
      ? site.csvFiles.flatMap((f) => f.locations)
      : site.locations;

  const siteConfigLabel =
    site.configuration === "multiple"
      ? `Multiple Locations (${reviewLocations.length} sites)`
      : site.configuration === "single"
      ? "Single Location"
      : "";

  const inputMethodLabel =
    site.inputMethod === "csv"
      ? `File Upload (${site.csvFiles.length} file${site.csvFiles.length === 1 ? "" : "s"})`
      : site.inputMethod === "manual"
      ? "Manual Entry"
      : "";

  const otherServices = services.otherServices.filter(Boolean);

  return (
    <StepLayout
      currentStep={6}
      onPrevious={onPrevious}
      onContinue={handleSubmit}
      continueLabel="Submit Application"
    >
      <Card>
        <FormSection title="Hospital Information">
          <SummarySection title="Basic Information" onEdit={() => onEditStep(1)}>
            <SummaryRow label="Legal Entity Name" value={organization.legalEntityName} />
            <SummaryRow label="d/b/a Name" value={organization.dbaName} />
            <SummaryPerson
              label="Primary Contact"
              name={`${primaryContact.firstName} ${primaryContact.lastName}`}
              lines={[
                primaryContact.title,
                `Work: ${primaryContact.workPhone}${
                  primaryContact.cellPhone ? ` | Cell: ${primaryContact.cellPhone}` : ""
                }`,
                `Email: ${primaryContact.email} ${primaryContact.verified ? "(Verified)" : "(Not verified)"}`,
              ]}
            />
          </SummarySection>

          <SummarySection title="Facility Details" onEdit={() => onEditStep(2)}>
            <SummaryRow label="Facility Type" value={facility.facilityType} />
          </SummarySection>

          <SummarySection title="Leadership Contacts" onEdit={() => onEditStep(3)}>
            {[
              ["CEO", leadership.ceo],
              ["Director of Quality", leadership.directorOfQuality],
              ["Invoicing Contact", leadership.invoicing],
            ].map(([label, c]) => (
              <SummaryPerson
                key={label}
                label={label}
                name={`${c.firstName} ${c.lastName}`}
                lines={[
                  c.phone ? `Phone: ${c.phone}` : "",
                  c.email ? `Email: ${c.email}` : "",
                  c.street ? `Billing Address: ${c.street}, ${c.city}, ${c.state} ${c.zip}` : "",
                ]}
              />
            ))}
          </SummarySection>

          <SummarySection title="Site Information" onEdit={() => onEditStep(4)}>
            <SummaryRow label="Site Configuration" value={siteConfigLabel} />
            <SummaryRow label="Input Method" value={inputMethodLabel} />
            {reviewLocations.map((loc, i) => (
              <SummaryPerson
                key={loc.id}
                label={`Practice Location ${i + 1}`}
                name={[loc.address, loc.city, `${loc.state} ${loc.zip}`].filter(Boolean).join(", ")}
                lines={[
                  `FTEs: ${loc.ftes || "—"} | Shifts: ${loc.shifts || "—"} | Miles to Main: ${
                    loc.milesToMain || "—"
                  }`,
                  `Days Open: ${loc.daysOpen.join(", ") || "—"}`,
                ]}
              />
            ))}
          </SummarySection>

          <SummarySection title="Services & Certifications" onEdit={() => onEditStep(5)}>
            <SummaryChips label="Services Provided" items={[...services.selected, ...otherServices]} />
            <SummaryChips label="Standards to Apply" items={services.standards} bold />
            <SummaryRow label="Date of Application" value={formatDate(services.applicationDate)} />
            <SummaryRow
              label="Expiration Date of Current Stroke Certification"
              value={formatDate(services.strokeCertExpiration)}
            />
            <SummaryRow
              label="Dates of last twenty-five thrombolytic administrations"
              value={services.thrombolyticDates.map(formatDate).join(", ")}
            />
            <SummaryRow
              label="Dates of last fifteen thrombectomies"
              value={services.thrombectomyDates.map(formatDate).join(", ")}
            />
          </SummarySection>
        </FormSection>
      </Card>

      <Card>
        <FormSection title="Ready to Submit?">
          <Checkbox
            id="certify"
            label="I certify that all information provided is accurate and complete to the best of my knowledge"
            checked={review.certified}
            onChange={(v) => updateReview({ certified: v })}
          />
          {errors.certified && <p className={shared.fieldError}>{errors.certified}</p>}

          <p className={styles.terms}>
            By submitting this form, you agree to our terms and conditions. DNV will review your
            application and contact you within 2-3 business days.
          </p>

          <div className={styles.exportActions}>
            <Button variant="secondary" size="sm" onClick={handleDownloadPdf}>
              Download as PDF
            </Button>
            <Button variant="secondary" size="sm" onClick={handleExportCsv}>
              Export to CSV
            </Button>
          </div>

          {submitted && (
            <p className={styles.success}>
              Application submitted. Check the browser console for the full payload.
            </p>
          )}
        </FormSection>
      </Card>
    </StepLayout>
  );
}