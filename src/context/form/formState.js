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

export function formReducer(state, action) {
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