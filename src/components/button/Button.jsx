import cx from "../../utils/cx";
import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}) {
  return (
    <button
      type={type}
      className={cx(
        styles.button,
        styles[variant],
        variant !== "link" && styles[size],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
