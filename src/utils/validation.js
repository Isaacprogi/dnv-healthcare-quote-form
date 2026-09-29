const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9()+\-.\s]{7,20}$/;

export function required(value, message = "This field is required.") {
  if (value === undefined || value === null) return message;
  if (typeof value === "string" && value.trim() === "") return message;
  return "";
}

export function email(value) {
  if (!value) return "";
  return EMAIL_RE.test(value) ? "" : "Enter a valid email address.";
}

export function phone(value) {
  if (!value) return "";
  return PHONE_RE.test(value) ? "" : "Enter a valid phone number.";
}

export function zip(value) {
  if (!value) return "";
  return /^\d{5}(-\d{4})?$/.test(value) ? "" : "Enter a valid ZIP code.";
}

/**
 * validateStep1 — Identify Healthcare Organization.
 * Returns a field->message error map; empty object means valid.
 */
export function validateStep1({ organization, primaryContact }) {
  const errors = {};
  if (required(organization.legalEntityName)) errors.legalEntityName = "Legal Entity Name is required.";
  if (!organization.sameAsLegalEntity && required(organization.dbaName)) {
    errors.dbaName = "Doing Business As name is required.";
  }
  if (required(primaryContact.firstName)) errors.firstName = "First name is required.";
  if (required(primaryContact.lastName)) errors.lastName = "Last name is required.";
  if (required(primaryContact.title)) errors.title = "Title is required.";
  if (required(primaryContact.workPhone)) errors.workPhone = "Work phone is required.";
  else if (phone(primaryContact.workPhone)) errors.workPhone = phone(primaryContact.workPhone);
  if (required(primaryContact.email)) errors.email = "Email is required.";
  else if (email(primaryContact.email)) errors.email = email(primaryContact.email);
  return errors;
}

export function validateStep2({ facility }) {
  const errors = {};
  if (required(facility.facilityType)) errors.facilityType = "Select a facility type.";
  return errors;
}

function validateContactBlock(contact, { requirePhone = true, requireEmail = true } = {}) {
  const errors = {};
  if (required(contact.firstName)) errors.firstName = "First name is required.";
  if (required(contact.lastName)) errors.lastName = "Last name is required.";
  if (requirePhone) {
    if (required(contact.phone)) errors.phone = "Phone is required.";
    else if (phone(contact.phone)) errors.phone = phone(contact.phone);
  }
  if (requireEmail) {
    if (required(contact.email)) errors.email = "Email is required.";
    else if (email(contact.email)) errors.email = email(contact.email);
  }
  return errors;
}

export function validateStep3({ leadership }) {
  return {
    ceo: leadership.ceo.sameAsPrimary ? {} : validateContactBlock(leadership.ceo),
    directorOfQuality: leadership.directorOfQuality.sameAsPrimary
      ? {}
      : validateContactBlock(leadership.directorOfQuality, { requirePhone: false, requireEmail: false }),
    invoicing: (() => {
      const errs = leadership.invoicing.sameAsPrimary ? {} : validateContactBlock(leadership.invoicing);
      if (required(leadership.invoicing.street)) errs.street = "Street address is required.";
      if (required(leadership.invoicing.city)) errs.city = "City is required.";
      if (required(leadership.invoicing.state)) errs.state = "State is required.";
      const zipError = zip(leadership.invoicing.zip);
      if (required(leadership.invoicing.zip)) errs.zip = "ZIP code is required.";
      else if (zipError) errs.zip = zipError;
      return errs;
    })(),
  };
}

export function hasErrors(errorObj) {
  return Object.values(errorObj).some((v) =>
    v && typeof v === "object" ? hasErrors(v) : Boolean(v)
  );
}

export function validateStep4({ site }) {
  const errors = {};
  if (required(site.configuration)) errors.configuration = "Choose single or multiple locations.";
  if (site.configuration === "multiple") {
    if (required(site.inputMethod)) errors.inputMethod = "Choose how to add site information.";
    if (site.inputMethod === "csv" && !site.csvFile) {
      errors.csvFile = "Upload a CSV or Excel file.";
    }
    if (site.inputMethod === "manual" && site.locations.length === 0) {
      errors.locations = "Add at least one practice location.";
    }
  }
  return errors;
}

export function validateStep6({ review }) {
  const errors = {};
  if (!review.certified) errors.certified = "You must certify the information before submitting.";
  return errors;
}
