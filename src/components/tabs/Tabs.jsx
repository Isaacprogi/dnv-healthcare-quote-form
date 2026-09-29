import cx from "../../utils/cx";
import styles from "./Tabs.module.css";

export default function Tabs({ tabs, activeId, onChange, ariaLabel }) {
  return (
    <div className={styles.list} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={cx(styles.tab, active && styles.active)}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
