import { useState } from "react";
import Card from "../components/card/Card";
import FormSection from "../components/formsection/FormSection";
import Checkbox from "../components/checkbox/Checkbox";
import TextInput from "../components/textinput/TextInput";
import Button from "../components/button/Button";
import Tabs from "../components/tabs/Tabs";
import SearchField from "../components/searchfield/SearchField";
import DateField from "../components/datefield/DateField";
import DateTagInput from "../components/datetaginput/DateTagInput";
import MultiSelectTags from "../components/multiselecttags/MultiSelectTags";
import { CloseIcon } from "../data/Icons";
import StepLayout from "../components/steplayout/StepLayout";
import { useFormState, useFormDispatch } from "../context/form/FormHooks";
import shared from "./Shared.module.css";
import styles from "./ServicesCertifications.module.css";

const SERVICE_GROUPS = [
  {
    tab: "clinical",
    name: "Emergency & Critical Care",
    services: [
      "Emergency Department",
      "Neonatal Intensive Care Services",
      "Pediatric Intensive Care Services",
    ],
  },
  {
    tab: "surgical",
    name: "Cardiac Services",
    services: ["Cardiac Catheterization Laboratory", "Open Heart"],
  },
  {
    tab: "diagnostic",
    name: "Diagnostic Services",
    services: [
      "Magnetic Resonance Imaging (MRI)",
      "Diagnostic Radioisotope Facility",
      "Lithotripsy",
    ],
  },
  {
    tab: "rehabilitation",
    name: "Rehabilitation Services",
    services: [
      "Physical Rehabilitation Services",
      "Physical Therapy",
      "Occupational Therapy",
      "Speech/Language Therapy",
      "Audiology",
    ],
  },
];

const STANDARDS_OPTIONS = [
  "Emergency Department",
  "Inpatient Acute Care",
  "General Anesthetizing Location",
  "Diagnostic Services",
  "Therapy Services",
];

const TABS = [
  { id: "all", label: "All Services" },
  { id: "clinical", label: "Clinical" },
  { id: "surgical", label: "Surgical" },
  { id: "diagnostic", label: "Diagnostic" },
  { id: "rehabilitation", label: "Rehabilitation" },
  { id: "specialty", label: "Specialty" },
];

export default function Step5ServicesCertifications({ onNext, onPrevious }) {
  const { services } = useFormState();
  const dispatch = useFormDispatch();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const update = (payload) => dispatch({ type: "UPDATE_SECTION", section: "services", payload });

  const toggleService = (name) => {
    update({
      selected: services.selected.includes(name)
        ? services.selected.filter((s) => s !== name)
        : [...services.selected, name],
    });
  };

  const addOtherService = () => update({ otherServices: [...services.otherServices, ""] });
  const updateOtherService = (index, value) =>
    update({
      otherServices: services.otherServices.map((s, i) => (i === index ? value : s)),
    });
  const removeOtherService = (index) =>
    update({ otherServices: services.otherServices.filter((_, i) => i !== index) });

  const visibleGroups = SERVICE_GROUPS.filter((g) => activeTab === "all" || g.tab === activeTab)
    .map((g) => ({
      ...g,
      services: g.services.filter((s) => s.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((g) => g.services.length > 0);

  return (
    <StepLayout currentStep={5} onPrevious={onPrevious} onContinue={onNext}>
      <Card>
        <FormSection title="Service Offering" description="Primary Site Service offering">
          <Tabs tabs={TABS} activeId={activeTab} onChange={setActiveTab} ariaLabel="Service categories" />

          <SearchField id="serviceSearch" value={search} onChange={setSearch} />

          <div className={styles.serviceColumns}>
            {visibleGroups.map((group) => (
              <div className={styles.serviceGroup} key={group.name}>
                <h4 className={styles.serviceGroupTitle}>{group.name}</h4>
                <div className={styles.serviceList}>
                  {group.services.map((service) => (
                    <Checkbox
                      key={service}
                      id={`service-${service}`}
                      label={service}
                      checked={services.selected.includes(service)}
                      onChange={() => toggleService(service)}
                    />
                  ))}
                </div>
              </div>
            ))}
            {visibleGroups.length === 0 && (
              <p className={styles.noResults}>No services match your search.</p>
            )}
          </div>

          <Button variant="secondary" size="sm" onClick={addOtherService}>
            + Add Other Service
          </Button>

          {services.otherServices.map((service, i) => (
            <div key={i} className={styles.otherServiceRow}>
              <TextInput
                id={`other-service-${i}`}
                label={i === 0 ? "Other Service" : ""}
                placeholder="Specify other service"
                value={service}
                onChange={(v) => updateOtherService(i, v)}
              />
              <button
                type="button"
                className={styles.otherServiceRemove}
                aria-label="Remove other service"
                onClick={() => removeOtherService(i)}
              >
                <CloseIcon className={styles.otherServiceRemoveIcon} />
              </button>
            </div>
          ))}
        </FormSection>
      </Card>

      <Card>
        <FormSection title="Standards to Apply">
          <MultiSelectTags
            id="standards"
            ariaLabel="Select Standard(s)"
            placeholder="Select Standard(s)"
            options={STANDARDS_OPTIONS}
            values={services.standards}
            onChange={(v) => update({ standards: v })}
          />

          <div className={shared.twoCol}>
            <DateField
              id="strokeCertExpiration"
              label="Expiration Date of Current Stroke Certification"
              value={services.strokeCertExpiration}
              onChange={(v) => update({ strokeCertExpiration: v })}
            />
            <DateField
              id="applicationDate"
              label="Date of Application"
              value={services.applicationDate}
              onChange={(v) => update({ applicationDate: v })}
            />
          </div>

          <DateTagInput
            id="thrombolyticDates"
            label="Dates of last twenty-five thrombolytic administrations"
            max={25}
            values={services.thrombolyticDates}
            onChange={(v) => update({ thrombolyticDates: v })}
          />

          <DateTagInput
            id="thrombectomyDates"
            label="Dates of last fifteen thrombectomies"
            max={15}
            values={services.thrombectomyDates}
            onChange={(v) => update({ thrombectomyDates: v })}
          />
        </FormSection>
      </Card>
    </StepLayout>
  );
}
