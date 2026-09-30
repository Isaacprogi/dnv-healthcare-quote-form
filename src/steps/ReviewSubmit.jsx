import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import Checkbox from "../components/checkbox/Checkbox";
import Button from "../components/button/Button";
import { SummarySection, SummaryRow, SummaryPerson, SummaryChips } from "../components/summary/Summary";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/form/FormHooks";
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
    console.log("DNV Healthcare quote request submitted:", state);
    setSubmitted(true);
    onSubmitted?.(state);
  };

  const handleExportCsv = () => {
    const contactRows = (label, c, { withAddress = false } = {}) => {
      const rows = [
        [`${label} - First Name`, c.firstName],
        [`${label} - Last Name`, c.lastName],
        [`${label} - Same as Primary Contact`, c.sameAsPrimary ? "Yes" : "No"],
        [`${label} - Phone`, c.phone],
        [`${label} - Email`, c.email],
      ];
      if (withAddress) {
        rows.push(
          [`${label} - Billing Street Address`, c.street],
          [`${label} - Billing City`, c.city],
          [`${label} - Billing State`, c.state],
          [`${label} - Billing ZIP Code`, c.zip]
        );
      }
      return rows;
    };

    const locationRows = reviewLocations.flatMap((loc, i) => {
      const label = `Practice Location ${i + 1}`;
      return [
        [`${label} - Street Address`, loc.address],
        [`${label} - City`, loc.city],
        [`${label} - State`, loc.state],
        [`${label} - ZIP Code`, loc.zip],
        [`${label} - FTEs`, loc.ftes],
        [`${label} - Shifts`, loc.shifts],
        [`${label} - Miles to Main`, loc.milesToMain],
        [`${label} - Days Open`, loc.daysOpen.join("; ")],
      ];
    });

    const rows = [
      ["Field", "Value"],

      // Step 1 — DNV Quote Request
      ["Legal Entity Name", organization.legalEntityName],
      ["Same as Legal Entity Name (d/b/a)", organization.sameAsLegalEntity ? "Yes" : "No"],
      ["d/b/a Name", organization.dbaName],
      ["Primary Contact - First Name", primaryContact.firstName],
      ["Primary Contact - Last Name", primaryContact.lastName],
      ["Primary Contact - Title", primaryContact.title],
      ["Primary Contact - Work Phone", primaryContact.workPhone],
      ["Primary Contact - Cell Phone", primaryContact.cellPhone],
      ["Primary Contact - Email", primaryContact.email],
      ["Primary Contact - Email Verified", primaryContact.verified ? "Yes" : "No"],

      // Step 2 — Facility Details
      ["Part of Larger Legal Entity / Health System", facility.sameAsLegalEntityName ? "Yes" : "No"],
      ["Facility Type", facility.facilityType],

      // Step 3 — Leadership Contacts
      ...contactRows("CEO", leadership.ceo),
      ...contactRows("Director of Quality", leadership.directorOfQuality),
      ...contactRows("Invoicing Contact", leadership.invoicing, { withAddress: true }),

      // Step 4 — Site Information
      ["Site Configuration", site.configuration],
      ["Site Input Method", site.inputMethod],
      ["Uploaded Files", site.csvFiles.map((f) => f.name).join("; ")],
      ...locationRows,

      // Step 5 — Services & Certifications
      ["Services Provided", services.selected.join("; ")],
      ["Other Services", services.otherServices.filter(Boolean).join("; ")],
      ["Standards to Apply", services.standards.join("; ")],
      ["Expiration Date of Current Stroke Certification", formatDate(services.strokeCertExpiration)],
      ["Date of Application", formatDate(services.applicationDate)],
      [
        "Dates of Last 25 Thrombolytic Administrations",
        services.thrombolyticDates.map(formatDate).join("; "),
      ],
      ["Dates of Last 15 Thrombectomies", services.thrombectomyDates.map(formatDate).join("; ")],

      // Step 6 — Review & Submit
      ["Certified Accurate and Complete", review.certified ? "Yes" : "No"],
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
  <div className={styles.downloadPdf}>
    <Button
      variant="secondary"
      size="sm"
      onClick={handleDownloadPdf}
    >
      Download as PDF
    </Button>
  </div>

  <div className={styles.exportCsv}>
    <Button
      variant="secondary"
      size="sm"
      onClick={handleExportCsv}
    >
      Export to CSV
    </Button>
  </div>
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