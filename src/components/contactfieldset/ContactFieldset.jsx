import TextInput from "../textinput/TextInput";
import Checkbox from "../checkbox/Checkbox";
import { SelectControl } from "../selectfield/SelectField";
import FormField from "../formfield/FormField";
import shared from "../../steps/Shared.module.css";
import styles from "./ContactFieldset.module.css";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY",
];

/**
 * ContactFieldset — one leadership contact block (Figma "Background"),
 * reused for CEO / Director of Quality / Invoicing Contact. `withAddress`
 * adds the Invoicing Contact's Billing Address fields.
 */
export default function ContactFieldset({
  title,
  contact,
  errors,
  onChange,
  primaryContact,
  requirePhoneEmail = true,
  withAddress = false,
}) {
  const idPrefix = title.replace(/\s+/g, "-").toLowerCase();

  const handleSameAsPrimary = (checked) => {
    onChange(
      checked
        ? {
            sameAsPrimary: true,
            firstName: primaryContact.firstName,
            lastName: primaryContact.lastName,
            phone: primaryContact.workPhone,
            email: primaryContact.email,
          }
        : { sameAsPrimary: false }
    );
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{title}</legend>

      <Checkbox
        id={`${idPrefix}-same`}
        label="Same as Primary Contact entered in Step 1"
        checked={contact.sameAsPrimary}
        onChange={handleSameAsPrimary}
      />

      <div className={shared.twoCol}>
        <TextInput
          id={`${idPrefix}-first`}
          label="First Name"
          required
          value={contact.firstName}
          error={errors.firstName}
          disabled={contact.sameAsPrimary}
          onChange={(v) => onChange({ firstName: v })}
        />
        <TextInput
          id={`${idPrefix}-last`}
          label="Last Name"
          required
          value={contact.lastName}
          error={errors.lastName}
          disabled={contact.sameAsPrimary}
          onChange={(v) => onChange({ lastName: v })}
        />
      </div>

      <TextInput
        id={`${idPrefix}-phone`}
        label="Phone"
        type="tel"
        required={requirePhoneEmail}
        value={contact.phone}
        error={errors.phone}
        disabled={contact.sameAsPrimary}
        onChange={(v) => onChange({ phone: v })}
      />
      <TextInput
        id={`${idPrefix}-email`}
        label="Email"
        type="email"
        required={requirePhoneEmail}
        value={contact.email}
        error={errors.email}
        disabled={contact.sameAsPrimary}
        onChange={(v) => onChange({ email: v })}
      />

      {withAddress && (
        <div className={styles.address}>
          <p className={styles.addressTitle}>Billing Address</p>
          <TextInput
            id={`${idPrefix}-street`}
            label="Street Address"
            required
            value={contact.street}
            error={errors.street}
            onChange={(v) => onChange({ street: v })}
          />
          <div className={styles.addressRow}>
            <TextInput
              id={`${idPrefix}-city`}
              label="City"
              required
              value={contact.city}
              error={errors.city}
              onChange={(v) => onChange({ city: v })}
            />
            <FormField id={`${idPrefix}-state`} label="State" required error={errors.state}>
              <SelectControl
                id={`${idPrefix}-state`}
                value={contact.state}
                onChange={(v) => onChange({ state: v })}
                options={US_STATES}
                placeholder="Select State"
              />
            </FormField>
            <TextInput
              id={`${idPrefix}-zip`}
              label="ZIP Code"
              required
              value={contact.zip}
              error={errors.zip}
              onChange={(v) => onChange({ zip: v })}
            />
          </div>
        </div>
      )}
    </fieldset>
  );
}
