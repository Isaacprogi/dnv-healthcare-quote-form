import StepHeader from "../stepheader/StepHeader";
import Button from "../button/Button";
import SupportChat from "../supportchat/SupportChat";
import cx from "../../utils/cx";
import styles from "./StepLayout.module.css";

/**
 * StepLayout — the page chrome every step shares: the progress header,
 * a content column, and the footer with Previous/Exit on the left and
 * Save / Continue (or Submit) on the right, plus the Support Chat pill.
 */
export default function StepLayout({
  currentStep,
  children,
  onPrevious,
  onSave,
  onContinue,
  continueLabel = "Continue",
  showExit = false,
  onExit,
  continueDisabled = false,
}) {
  return (
    <>
      <main className={cx(styles.layout, currentStep === 1 && styles.firstStep)}>
        <StepHeader currentStep={currentStep} />

        <div className={styles.content}>{children}</div>

        <footer className={styles.footer}>
          <div className={styles.start}>
            {currentStep > 1 && (
              <Button variant="secondary" onClick={onPrevious}>
                Previous
              </Button>
            )}
            {showExit && (
              <Button variant="secondary" onClick={onExit}>
                Exit
              </Button>
            )}
          </div>
          <div className={styles.end}>
            {onSave && (
              <Button onClick={onSave}>Save</Button>
            )}
            <Button onClick={onContinue} disabled={continueDisabled}>
              {continueLabel}
            </Button>
          </div>
        </footer>
      </main>

      <SupportChat />
    </>
  );
}
