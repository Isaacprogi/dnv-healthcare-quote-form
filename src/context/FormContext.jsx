import { createContext, useContext, useReducer } from "react";


export const initialFormState = {
  organization: {
    legalEntityName: "",
    dbaName: "",
    sameAsLegalEntity: false,
  },
  primaryContact: {
    firstName: "",
    lastName: "",
    title: "",
    workPhone: "",
    cellPhone: "",
    email: "",
    verified: false,
  },
  facility: {
    facilityType: "",
  },
  leadership: {
    ceo: { firstName: "", lastName: "", phone: "", email: "", sameAsPrimary: false },
    directorOfQuality: { firstName: "", lastName: "", phone: "", email: "", sameAsPrimary: false },
    invoicing: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      sameAsPrimary: false,
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  },
  site: {
    configuration: "", // "single" | "multiple"
    inputMethod: "", // "manual" | "csv"
    csvFiles: [], // [{ id, name, size, locations: [...] }] — multiple files allowed
    locations: [],
  },
  services: {
    selected: [],
    otherServices: [],
    standards: [],
    strokeCertExpiration: "",
    applicationDate: "",
    thrombolyticDates: [],
    thrombectomyDates: [],
  },
  review: {
    certified: false,
  },
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_SECTION":
      return {
        ...state,
        [action.section]: { ...state[action.section], ...action.payload },
      };
    case "UPDATE_NESTED": {
      // action.path: [section, subsection] e.g. ["leadership", "ceo"]
      const [section, sub] = action.path;
      return {
        ...state,
        [section]: {
          ...state[section],
          [sub]: { ...state[section][sub], ...action.payload },
        },
      };
    }
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

const FormStateContext = createContext(null);
const FormDispatchContext = createContext(null);

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>{children}</FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}

export function useFormState() {
  const ctx = useContext(FormStateContext);
  if (!ctx) throw new Error("useFormState must be used within a FormProvider");
  return ctx;
}

export function useFormDispatch() {
  const ctx = useContext(FormDispatchContext);
  if (!ctx) throw new Error("useFormDispatch must be used within a FormProvider");
  return ctx;
}

/** Convenience hook: returns [sectionState, updateSection] for a top-level slice. */
export function useFormSection(section) {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const update = (payload) => dispatch({ type: "UPDATE_SECTION", section, payload });
  return [state[section], update];
}

/** Convenience hook for a nested slice, e.g. useNestedSection("leadership", "ceo"). */
export function useNestedSection(section, sub) {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const update = (payload) => dispatch({ type: "UPDATE_NESTED", path: [section, sub], payload });
  return [state[section][sub], update];
}