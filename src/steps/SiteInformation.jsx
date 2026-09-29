import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import RadioCard from "../components/radio/RadioCard";
import Button from "../components/button/Button";
import UploadField from "../components/uploadfield/UploadField";
import FileCard from "../components/filecard/FileCard";
import LocationCard from "../components/locationcard/LocationCard";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/FormContext";
import { validateStep4, hasErrors } from "../utils/validation";
import shared from "./Shared.module.css";
import styles from "./SiteInformation.module.css";

function emptyLocation() {
  return {
    id: crypto.randomUUID(),
    address: "",
    city: "",
    state: "",
    zip: "",
    ftes: "",
    shifts: "",
    milesToMain: "",
    daysOpen: [],
  };
}

export default function Step4SiteInformation({ onNext, onPrevious }) {
  const { site } = useFormState();
  const dispatch = useFormDispatch();
  const [errors, setErrors] = useState({});

  const update = (payload) => dispatch({ type: "UPDATE_SECTION", section: "site", payload });

  const setConfiguration = (configuration) =>
    update({ configuration, inputMethod: "", locations: [], csvFile: null });

  const setInputMethod = (inputMethod) => update({ inputMethod });

  const addLocation = () => update({ locations: [...site.locations, emptyLocation()] });

  const updateLocation = (id, payload) =>
    update({
      locations: site.locations.map((loc) => (loc.id === id ? { ...loc, ...payload } : loc)),
    });

  const removeLocation = (id) =>
    update({ locations: site.locations.filter((loc) => loc.id !== id) });

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) update({ csvFile: { name: file.name, size: file.size } });
  };

  const runValidation = () => {
    const result = validateStep4({ site });
    setErrors(result);
    return !hasErrors(result);
  };

  return (
    <StepLayout currentStep={4} onPrevious={onPrevious} onContinue={() => runValidation() && onNext()}>
      <Card>
        <FormSection title="Do you have multiple sites or locations?">
          <div className={styles.choiceRow} role="radiogroup" aria-label="Site configuration">
            <RadioCard
              name="siteConfiguration"
              title="Single Location"
              description="We operate from one facility only"
              selected={site.configuration === "single"}
              onSelect={() => setConfiguration("single")}
            />
            <RadioCard
              name="siteConfiguration"
              title="Multiple Locations"
              description="We have multiple facilities or practice locations"
              selected={site.configuration === "multiple"}
              onSelect={() => setConfiguration("multiple")}
            />
          </div>
          {errors.configuration && <p className={shared.fieldError}>{errors.configuration}</p>}

          {site.configuration === "multiple" && (
            <div className={styles.subSection}>
              <p className={styles.subLabel}>How would you like to add your site information?</p>
              <div className={styles.choiceRow} role="radiogroup" aria-label="Input method">
                <RadioCard
                  name="inputMethod"
                  title="Upload CSV / Excel"
                  description="Upload a spreadsheet with all site information"
                  selected={site.inputMethod === "csv"}
                  onSelect={() => setInputMethod("csv")}
                />
                <RadioCard
                  name="inputMethod"
                  title="Manual Entry"
                  description="Add each practice location one at a time"
                  selected={site.inputMethod === "manual"}
                  onSelect={() => setInputMethod("manual")}
                />
              </div>
              {errors.inputMethod && <p className={shared.fieldError}>{errors.inputMethod}</p>}

              {site.inputMethod === "csv" && (
                <div className={styles.uploadPanel}>
                  <UploadField
                    onFileSelect={handleFileSelect}
                    onDownloadTemplate={() => {}}
                  />
                  {site.csvFile && (
                    <>
                      <p className={styles.uploadedLabel}>Uploaded</p>
                      <FileCard
                        name={site.csvFile.name}
                        size={site.csvFile.size}
                        onRemove={() => update({ csvFile: null })}
                      />
                    </>
                  )}
                  {errors.csvFile && <p className={shared.fieldError}>{errors.csvFile}</p>}
                </div>
              )}

              {site.inputMethod === "manual" && (
                <div className={styles.locations}>
                  {site.locations.map((loc, i) => (
                    <LocationCard
                      key={loc.id}
                      index={i}
                      location={loc}
                      onChange={(payload) => updateLocation(loc.id, payload)}
                      onRemove={() => removeLocation(loc.id)}
                    />
                  ))}
                  {errors.locations && <p className={shared.fieldError}>{errors.locations}</p>}
                  <Button variant="secondary" size="sm" onClick={addLocation}>
                    + Add Practice Location
                  </Button>
                </div>
              )}
            </div>
          )}
        </FormSection>
      </Card>
    </StepLayout>
  );
}
