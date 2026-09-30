import { useContext } from "react";
import {
  FormStateContext,
  FormDispatchContext,
} from "./FormContexts";

export function useFormState() {
  const ctx = useContext(FormStateContext);
  if (!ctx) {
    throw new Error("useFormState must be used within a FormProvider");
  }
  return ctx;
}

export function useFormDispatch() {
  const ctx = useContext(FormDispatchContext);
  if (!ctx) {
    throw new Error("useFormDispatch must be used within a FormProvider");
  }
  return ctx;
}

export function useFormSection(section) {
  const state = useFormState();
  const dispatch = useFormDispatch();

  const update = (payload) =>
    dispatch({
      type: "UPDATE_SECTION",
      section,
      payload,
    });

  return [state[section], update];
}

export function useNestedSection(section, sub) {
  const state = useFormState();
  const dispatch = useFormDispatch();

  const update = (payload) =>
    dispatch({
      type: "UPDATE_NESTED",
      path: [section, sub],
      payload,
    });

  return [state[section][sub], update];
}