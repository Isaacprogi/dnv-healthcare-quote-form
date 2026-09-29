import cx from "../../utils/cx";
import styles from "./Navbar.module.css";

/**
 * Navbar — Figma "Header". Step 1 uses the 72px bar with the user
 * profile on the right; Steps 2-6 use the taller centered-brand bar.
 */
export default function Navbar({ step = 1 }) {
  const isFirstStep = step === 1;

  if (isFirstStep) {
    return (
      <header className={cx(styles.header, styles.withProfile)}>
        <p className={styles.logo}>DNV Healthcare</p>
        <div className={styles.profile}>
          <span className={styles.avatar} aria-hidden="true">
            KM
          </span>
          <span className={styles.userName}>Katherine Martinez</span>
        </div>
      </header>
    );
  }

  return (
    <header className={cx(styles.header, styles.simple)}>
      <div className={styles.container}>
        <p className={styles.brand}>DNV Healthcare</p>
      </div>
    </header>
  );
}
