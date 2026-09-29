import cx from "../../utils/cx";
import styles from "./Button.module.css";

/**
 * Button — the app's single button component (Figma "Button" set).
 *   variant: "primary" (Main Blue) | "secondary" (outlined) | "link"
 *   size:    "md" (48px, page footer) | "sm" (35px, in-card actions)
 */
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
      className={cx(styles.button, styles[variant], variant !== "link" && styles[size], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
