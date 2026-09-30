# QA Test Report — DNV Healthcare Quote Request Form

## Tools used

- Manual exploratory testing in the built app (`npm run dev`, Chromium)
- `npm run build` (Vite) as a compile-time smoke test
- ESLint (`eslint:recommended`, `plugin:react`, `plugin:react-hooks`) as a
  static-analysis pass
- Browser DevTools device toolbar for responsive checks (375px, 768px,
  1280px widths)

## Test scenarios executed

### Step 1 — DNV Quote Request
| # | Scenario | Result |
|---|---|---|
| 1.1 | Submit with all required fields empty | Blocked; error shown under each required field |
| 1.2 | Check "Same as Legal Entity Name", type into Legal Entity Name | d/b/a Name mirrors the input live and its field disables |
| 1.3 | Enter an invalid email (`abc@`) | Blocked with "Enter a valid email address." |
| 1.4 | Enter a valid email, click "Send Verification Email" | Badge switches from "Not Verified" to "Verified" |
| 1.5 | Edit the email after verifying | Badge reverts to "Not Verified" (a changed, unconfirmed email shouldn't show as verified) |
| 1.6 | Fill all required fields, click Continue | Advances to Step 2, values persist if you click Previous |


### Step 2 — Facility Details

| # | Scenario | Result |
| --- | --- | --- |
| 2.1 | Continue with no facility type selected | Blocked with "Select a facility type." |
| 2.2 | Check "Same as Legal Entity Name" in Step 1, then proceed to Step 2 | Option list automatically swaps to the "If Yes" variant (includes "Same as Legal Entity Name" as an option)|
| 2.3 | Uncheck "Same as Legal Entity Name" in Step 1, then proceed to Step 2 | Option list renders standard facility types |
| 2.4 | Select a facility type, go Previous then Next | Selection persists |

### Step 3 — Leadership Contacts
| # | Scenario | Result |
|---|---|---|
| 3.1 | Check "Same as Primary Contact" for CEO | First/last name, phone and email fields populate from Step 1 and disable |
| 3.2 | Uncheck it again | Fields re-enable but keep the last value (matches typical form UX; user can edit from there) |
| 3.3 | Submit Invoicing Contact with no billing address | Blocked with per-field required errors (Street, City, State, ZIP) |
| 3.4 | Enter ZIP `1234` (4 digits) | Blocked with "Enter a valid ZIP code." |
| 3.5 | Enter ZIP `12345-6789` | Accepted |

### Step 4 — Site Information
| # | Scenario | Result |
|---|---|---|
| 4.1 | Continue with no configuration chosen | Blocked |
| 4.2 | Choose "Multiple Locations" then Continue with no input method | Blocked with "Choose how to add site information." |
| 4.3 | Choose Manual Entry, Continue with 0 locations added | Blocked with "Add at least one practice location." |
| 4.4 | Add a location, fill fields, toggle days open | Days chips toggle independently per location |
| 4.5 | Add 3 locations, remove the 2nd | Only the 2nd is removed; 1st/3rd keep their data |
| 4.6 | Choose Upload CSV, select a file via "Select file(s)" | File appears in the "Uploaded" list as its own `FileCard` (name + size) with a remove control; its rows are parsed in the background |
| 4.7 | Select/drop a second file without removing the first | Both files remain listed independently; each keeps its own parsed rows |
| 4.8 | Drag a valid `.csv` file onto the dashed zone | Drop zone highlights while dragging; file is accepted the same as picking it via the button |
| 4.9 | Drag a file with an unsupported extension (e.g. `.pdf`) onto the drop zone | Silently ignored — not added to the uploaded list, no error shown |
| 4.10 | Upload 2 files, remove the 1st | Only the 1st file (and its parsed rows) is removed; the 2nd file and its rows are unaffected |
| 4.11 | Continue with Upload CSV chosen and 0 files uploaded | Blocked with "Upload at least one CSV or Excel file." |
| 4.12 | Upload a `.csv` whose rows don't match the template headers (e.g. a random file) | File still appears in the uploaded list; contributes 0 parsed locations (no crash, no error surfaced) |
| 4.13 | Click "Download CSV Template" | Downloads `dnv-site-information-template.csv` with the 8 expected column headers and no data rows |
| 4.14 | Switch from Multiple back to Single Location | Locations *and* uploaded CSV files/parsed rows all clear, so a stale multi-site payload can't leak into a single-site submission |


### Step 5 — Services & Certifications
| # | Scenario | Result |
|---|---|---|
| 5.1 | Check services across two different category groups | Both persist independently |
| 5.2 | Type into the search box | Non-matching services and empty groups are hidden |
| 5.3 | Click a category tab (e.g. "Diagnostic") | Only that category's group renders |
| 5.4 | Click "+ Add Other Service" twice, fill one, remove the other | The correct row is removed, not always the last one |
| 5.5 | Add the same date twice to "thrombolytic administrations" | Both are added (dates aren't deduplicated) — see Known Issues in README if uniqueness is desired |
| 5.6 | Add 25 thrombolytic dates | The helper text shows 25/25 and further adds are ignored (max enforced) |
| 5.7 | Add a Standard, confirm it disappears from the dropdown | Selected standards are removed from the remaining options list so they can't be added twice |

### Step 6 — Review & Submit
| # | Scenario | Result |
|---|---|---|
| 6.1 | Land on Review with data from all steps filled | Every section (Basic Info, Facility, Leadership, Site, Services) reflects the entered data |
| 6.2 | Click "Edit" on a section | Jumps back to that step with all data intact; returning to Review re-renders the updated values |
| 6.3 | Click "Submit Application" with the certify checkbox unchecked | Blocked with "You must certify the information before submitting." |
| 6.4 | Check the box, submit | Console logs the full form-state payload (per assessment requirement); a success message appears |
| 6.5 | Click "Export to CSV" | Downloads a `dnv-quote-request.csv` with the key submitted fields |
| 6.6 | Click "Download as PDF" | Opens the browser print dialog with a print stylesheet that hides the stepper chrome |

### Cross-cutting
| # | Scenario | Result |
|---|---|---|
| C.1 | Resize to 375px width | Footer buttons stack full-width; step labels in the progress track hide (bars remain) to avoid overflow |
| C.2 | Tab through a step using only the keyboard | Every input, checkbox, radio and button shows a visible focus ring |
| C.3 | Refresh mid-form | State resets (documented as a known limitation — no persistence layer in scope) |

## Bugs identified and how they were resolved

1. **Unused prop caused a lint failure.** `StepLayout` accepted a
   `totalSteps` prop that was never read inside the component
   (`no-unused-vars` from `eslint:recommended`). Fixed by removing the
   unused destructured parameter.
2. **Directory creation silently failed.** An early `mkdir -p` using brace
   expansion (`src/{components,steps,...}`) ran under a non-expanding
   shell and created one literally-named folder instead of four. Caught
   immediately via `ls`, corrected with explicit `mkdir -p` calls per
   folder before any files were written into it — no files were lost.
3. **Stale selections across dependent fields.** Initially, toggling
   "part of a larger legal entity" on Step 2 left the previously selected
   facility type in place even though it no longer belonged to the new
   list (e.g. "Short-Term Acute Care" surviving into the list that
   replaces it with "Same as Legal Entity Name"). Fixed by clearing
   `facilityType` whenever the toggle changes. Same class of bug fixed on
   Step 4: switching site configuration from Multiple back to Single now
   clears `locations`/`csvFileName` rather than leaving orphaned data that
   could still show up in the Review step or the submitted payload.
4. **Verified badge could go stale.** Editing the email after clicking
   "Send Verification Email" left the "Verified" badge showing against a
   different, unconfirmed address. Fixed by resetting `verified: false`
   on every keystroke in the email field.

## Not covered (out of scope for this pass)

- Automated unit/integration tests (Jest + React Testing Library) — the
  assessment's time box was spent on the required functionality plus
  manual QA above; an automated suite would be the next addition.
- Cross-browser testing beyond Chromium (Firefox/Safari-specific CSS
  quirks were not verified).
