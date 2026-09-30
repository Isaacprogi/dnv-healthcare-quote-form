import { useReducer } from "react";
import {
  FormStateContext,
  FormDispatchContext,
} from "./FormContexts";
import { formReducer, initialFormState } from "./formState";

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}