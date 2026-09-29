
# DNV Healthcare — Quote Request Multi-Step Form

A six-step React form that guides healthcare organizations through a DNV Healthcare accreditation quote request. Built for the Medlaunch Concepts Frontend Developer interview assessment.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (JavaScript, function components, and hooks) |
| Build Tool | Vite |
| Styling | Pure CSS with CSS custom properties |
| State Management | React Context and `useReducer` |
| Routing | Not required; step navigation is managed through component state |
| Linting | ESLint with React and React Hooks plugins |

## Installation and Local Setup

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository or download the project.
2. Navigate to the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal. By default, Vite uses:

   `http://localhost:5173`

### Production Build

To generate a production-ready build:

```bash
npm run build
```

The generated files will be available in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Development Approach

### 1. Reusable Component Architecture

The application uses reusable components to maintain consistency across all six steps. Shared components are located in `src/components/` and include:

- `FormField` — Consistent form field layout and labeling.
- `TextInput` — Reusable text input.
- `Checkbox` — Checkbox controls.
- `RadioOption` — Radio selection rows.
- `RadioCard` — Bordered selection cards.
- `Button` — Consistent button styling and behavior.
- `Card` — Reusable content containers.
- `StepHeader` — Step title and progress indicator.
- `StepLayout` — Shared page layout and navigation controls.
- `DateTagInput` — Repeatable date entries.
- `MultiSelectTags` — Multi-select options for accreditation standards.

This approach reduces duplication and makes the application easier to maintain.

### 2. Design System and Styling

The design system is defined in `src/index.css` using CSS custom properties for colors, typography, spacing, and shadows.

Components reuse these variables to maintain a consistent visual appearance and make global design changes easier.

The interface is implemented using pure CSS without a CSS framework.

### 3. State Management

React Context and `useReducer` manage the form's state through a shared `FormProvider`, located in `src/context/FormContext.jsx`.

This allows users to move between steps without losing their entered information during the current session.

The shared state also allows the Review & Submit step to display a summary of the collected information without extensive prop drilling.

The `useFormSection` and `useNestedSection` hooks simplify access to form data and updates.

### 4. Multi-Step Form Structure

Each step is implemented in its own component under `src/steps/`:

- `Step1QuoteRequest`
- `Step2FacilityDetails`
- `Step3LeadershipContacts`
- `Step4SiteInformation`
- `Step5ServicesCertifications`
- `Step6ReviewSubmit`

Each step uses the shared `StepLayout` component.

The current step is managed in `App.jsx`. Since the application is a single-page form, a separate routing library is not required.

### 5. Form Validation

Validation logic is centralized in `src/utils/validation.js`.

Reusable validation functions handle required fields, email addresses, phone numbers, and ZIP codes. Each step also has its own validation function.

Validation runs when users attempt to continue or submit the form. Errors are displayed inline, and users cannot proceed until the relevant validation errors are resolved.

## Assumptions Made

Here is the updated **Facility details** section for your documentation or Readme:

- **Facility details:** The Figma designs present two variants for the Facility Details options ("Facility Details" and "Facility Details-If Yes"). Rather than introducing an unnecessary UI control on Step 2, the displayed option set is dynamically derived from the `sameAsLegalEntity` selection made in Step 1 (**Quote Request**). If "Same as Legal Entity Name" is checked in Step 1, Step 2 automatically renders the system variant containing "Same as Legal Entity Name" as an option.


- **Standards to Apply:** The available standards were taken from the populated Review & Submit design because the initial input design only displayed placeholder tags.

- **CSV/Excel upload:** The "Upload CSV / Excel" flow accepts multiple files (drag-and-drop or
  the file picker), and each file is parsed with PapaParse against the
  "Download CSV Template" column headers into the same location-object
  shape Manual Entry produces. Every file still shows as its own
  removable `FileCard`; nothing about the upload UI changes. On Review &
  Submit, the parsed rows from every uploaded file are flattened into one
  list and rendered exactly like manual entries — the "N sites" count and
  the per-site cards both read from that same list, so CSV and Manual
  Entry can't disagree. `.xlsx`/`.xls` files are accepted by the file
  picker's `accept` filter but are not actually parsed (PapaParse is
  CSV-only); an uploaded `.xlsx` file shows as a `FileCard` but
  contributes zero parsed rows.

- **PDF download:** The Download as PDF action uses the browser's print dialog with print-friendly CSS rather than a client-side PDF generation library.

- **CSV export:** The Export to CSV action generates a flat CSV file containing key submitted fields in the browser.

- **Contact validation:** The Director of Quality's phone number and email address are optional because they are not marked as required in the supplied designs. The CEO and Invoicing Contact fields are treated as required.

## Known Issues and Limitations

- **CSV/Excel import:** Uploaded files are not parsed or validated against the CSV template. A production implementation could use a parsing library such as PapaParse and provide a preview and editing interface.

- **PDF generation:** PDF export relies on the browser's print-to-PDF functionality rather than generating a PDF file directly.

- **Data persistence:** Form data is stored in memory. The Save action does not persist data to a backend, and refreshing the page resets the form's progress.

- **Automated testing:** No automated test suite using tools such as Jest or React Testing Library is included. The application was tested manually. See `QA_Test_Report.md` for the test scenarios and results.