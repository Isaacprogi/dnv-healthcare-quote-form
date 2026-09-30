import { useState } from "react";
import { FormProvider } from "./context/FormContext";

import Step1QuoteRequest from "./steps/QuoteRequest";
import Step2FacilityDetails from "./steps/FacilityDetails";
import Step3LeadershipContacts from "./steps/LeadershipContacts";
import Step4SiteInformation from "./steps/SiteInformation";
import Step5ServicesCertifications from "./steps/ServicesCertifications";
import Step6ReviewSubmit from "./steps/ReviewSubmit";

import Navbar from "./components/navbar/Navbar";
import styles from "./App.module.css";

const TOTAL_STEPS = 6;

function DnvForm() {
  const [step, setStep] = useState(1);

  const goTo = (n) => {
    setStep(Math.min(Math.max(n, 1), TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = () => goTo(step + 1);
  const previous = () => goTo(step - 1);

  const exit = () => {
    if (window.confirm("Exit without saving your progress?")) {
      goTo(1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1QuoteRequest onNext={next} onExit={exit} />;
      case 2:
        return <Step2FacilityDetails onNext={next} onPrevious={previous} />;
      case 3:
        return <Step3LeadershipContacts onNext={next} onPrevious={previous} />;
      case 4:
        return <Step4SiteInformation onNext={next} onPrevious={previous} />;
      case 5:
        return (
          <Step5ServicesCertifications onNext={next} onPrevious={previous} />
        );
      case 6:
        return <Step6ReviewSubmit onPrevious={previous} onEditStep={goTo} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar step={step} />
      <div className={styles.shell}>{renderStep()}</div>
    </>
  );
}

export default function App() {
  return (
    <FormProvider>
      <DnvForm />
    </FormProvider>
  );
}
