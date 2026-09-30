# QA Test Report — DNV Healthcare Quote Request Form

## Tools Used

* Manual testing of the app in Chromium using `npm run dev`
* `npm run build` (Vite) to check that the app builds successfully
* ESLint 10 with the flat config (eslint.config.js) to check for linting issues
* Browser DevTools device toolbar to check the layout at 375px, 768px, and 1280px widths

## Test Scenarios Executed

### Step 1 — DNV Quote Request

| #   | Scenario                                                        | Result                                                                                            |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1.1 | Submit with all required fields empty                           | Submission is blocked, and an error appears under each required field.                            |
| 1.2 | Check "Same as Legal Entity Name" and enter a Legal Entity Name | The d/b/a Name updates automatically as the Legal Entity Name changes, and its field is disabled. |
| 1.3 | Enter an invalid email (`abc@`)                                 | Submission is blocked with "Enter a valid email address."                                         |
| 1.4 | Enter a valid email and click "Send Verification Email"         | The badge changes from "Not Verified" to "Verified".                                              |
| 1.5 | Edit the email after verifying it                               | The badge changes back to "Not Verified", since the new email address has not been verified.      |
| 1.6 | Fill in all required fields and click Continue                  | The form advances to Step 2. Clicking Previous returns to Step 1 with the entered values intact.  |

### Step 2 — Facility Details

| #   | Scenario                                                              | Result                                                                                                |
| --- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 2.1 | Continue without selecting a facility type                            | Progress is blocked with "Select a facility type."                                                    |
| 2.2 | Check "Same as Legal Entity Name" in Step 1, then proceed to Step 2   | The facility type options switch to the "If Yes" variant, which includes "Same as Legal Entity Name". |
| 2.3 | Uncheck "Same as Legal Entity Name" in Step 1, then proceed to Step 2 | The standard facility type options are displayed.                                                     |
| 2.4 | Select a facility type, click Previous, then return to Step 2         | The selected facility type is still selected.                                                         |

### Step 3 — Leadership Contacts

| #   | Scenario                                                       | Result                                                                                                     |
| --- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 3.1 | Check "Same as Primary Contact" for the CEO                    | The first name, last name, phone, and email fields are populated with the values from Step 1 and disabled. |
| 3.2 | Uncheck the option                                             | The fields become editable again, and their existing values are retained.                                  |
| 3.3 | Submit the Invoicing Contact section without a billing address | Submission is blocked, with required-field errors for Street, City, State, and ZIP.                        |
| 3.4 | Enter a ZIP code with 4 digits (`1234`)                        | Submission is blocked with "Enter a valid ZIP code."                                                       |
| 3.5 | Enter a ZIP code in the format `12345-6789`                    | The ZIP code is accepted.                                                                                  |

### Step 4 — Site Information

| #    | Scenario                                                                      | Result                                                                                                                                              |
| ---- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1  | Continue without choosing a configuration                                     | Progress is blocked.                                                                                                                                |
| 4.2  | Select "Multiple Locations" and continue without choosing an input method     | Progress is blocked with "Choose how to add site information."                                                                                      |
| 4.3  | Select Manual Entry and continue without adding any locations                 | Progress is blocked with "Add at least one practice location."                                                                                      |
| 4.4  | Add a location, fill in its fields, and toggle the days open                  | The days can be selected and deselected independently for each location.                                                                            |
| 4.5  | Add 3 locations and remove the second one                                     | Only the second location is removed. The first and third locations retain their data.                                                               |
| 4.6  | Select Upload CSV and choose a file using "Select file(s)"                    | The file appears in the "Uploaded" list as its own `FileCard`, showing its name, size, and a remove control. Its rows are parsed in the background. |
| 4.7  | Select or drop a second file without removing the first                       | Both files remain in the list, and each keeps its own parsed rows.                                                                                  |
| 4.8  | Drag a valid `.csv` file onto the dashed drop zone                            | The drop zone highlights while dragging, and the file is accepted just as it would be through the file selection button.                            |
| 4.9  | Drag a file with an unsupported extension, such as `.pdf`, onto the drop zone | The file is ignored. It is not added to the uploaded list, and no error is displayed.                                                               |
| 4.10 | Upload 2 files and remove the first one                                       | Only the first file and its parsed rows are removed. The second file and its rows remain unchanged.                                                 |
| 4.11 | Continue with Upload CSV selected but no files uploaded                       | Progress is blocked with "Upload at least one CSV or Excel file."                                                                                   |
| 4.12 | Upload a `.csv` file whose rows do not match the template headers             | The file still appears in the uploaded list but contributes 0 parsed locations. The app does not crash or display an error.                         |
| 4.13 | Click "Download CSV Template"                                                 | Downloads `dnv-site-information-template.csv` with the 8 expected column headers and no data rows.                                                  |
| 4.14 | Switch from Multiple Locations back to Single Location                        | All locations, uploaded CSV files, and parsed rows are cleared, preventing old multi-site data from being included in a single-site submission.     |

### Step 5 — Services & Certifications

| #   | Scenario                                                                 | Result                                                                                                                  |
| --- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| 5.1 | Select services from two different category groups                       | Selections in both groups are retained independently.                                                                   |
| 5.2 | Type into the search box                                                 | Services that do not match the search and groups with no matching services are hidden.                                  |
| 5.3 | Click a category tab, such as "Diagnostic"                               | Only the selected category's group is displayed.                                                                        |
| 5.4 | Click "+ Add Other Service" twice, fill in one row, and remove the other | The selected row is removed rather than always removing the last row.                                                   |
| 5.5 | Add the same date twice to "thrombolytic administrations"                | Both dates are added. Duplicate dates are not prevented. See Known Issues in the README if date uniqueness is required. |
| 5.6 | Add 25 thrombolytic dates                                                | The helper text shows 25/25, and further additions are ignored once the limit is reached.                               |
| 5.7 | Add a Standard and check the dropdown                                    | The selected standard is removed from the remaining options, preventing it from being added twice.                      |

### Step 6 — Review & Submit

| #   | Scenario                                                          | Result                                                                                                                |
| --- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 6.1 | Open Review after filling in all steps                            | Each section (Basic Info, Facility, Leadership, Site, Services) displays the entered data.                            |
| 6.2 | Click "Edit" on a section                                         | The form returns to the relevant step with the existing data intact. Returning to Review displays the updated values. |
| 6.3 | Click "Submit Application" without checking the certification box | Submission is blocked with "You must certify the information before submitting."                                      |
| 6.4 | Check the certification box and submit                            | The full form-state payload is logged to the console, as required by the assessment, and a success message appears.   |
| 6.5 | Click "Export to CSV"                                             | Downloads `dnv-quote-request.csv` containing the key submitted fields.                                                |
| 6.6 | Click "Download as PDF"                                           | Opens the browser print dialog. The print stylesheet hides the stepper and other navigation elements.                 |

### Cross-cutting Tests

| #   | Scenario                                        | Result                                                                                                                                                     |
| --- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C.1 | Resize the app to 375px wide                    | Footer and export buttons stack and take up the full width. Step labels in the progress track are hidden while the progress bars remain visible, preventing overflow. |
| C.2 | Navigate through a step using only the keyboard | Every input, checkbox, radio button, and button displays a visible focus ring.                                                                             |
| C.3 | Refresh the page while partway through the form | The form state resets. This is a known limitation, as persistence is not included in the current scope.                                                    |

## Bugs Identified and Fixed

1. **Unused prop causing a lint error.** `StepLayout` accepted a `totalSteps` prop that was never used inside the component. ESLint flagged the unused destructured parameter through `no-unused-vars`. I removed the unused parameter.

2. **Verified badge remaining visible after an email change.** After clicking "Send Verification Email", editing the email address left the "Verified" badge visible for the new, unconfirmed address. I fixed this by resetting `verified: false` whenever the email field changes.

## Tooling Updates

- Updated the project to React 19 and the latest Vite setup.
- Migrated ESLint to the flat configuration format required by ESLint 10.
- Separated form state, reducer, and React contexts from `FormContext.jsx` so the React Fast Refresh lint rule can be satisfied without disabling the rule.
- Removed redundant lint suppression and unused assignments found during the migration.


## Not Covered (Out of Scope for This Pass)

* Automated unit and integration tests using Jest and React Testing Library. I focused on implementing the required functionality and completing the manual QA checks within the assessment's time limit. An automated test suite would be a useful next step.
* Cross-browser testing beyond Chromium. Browser-specific CSS behaviour in Firefox and Safari has not been verified.
