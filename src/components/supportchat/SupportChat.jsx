import { ManageAccountsIcon } from "../icons/Icons";
import styles from "./SupportChat.module.css";

/** SupportChat — the floating "Support Chat" pill (Figma "Button", bottom-right). */
export default function SupportChat({ onClick }) {
  return (
    <button type="button" className={styles.chat} onClick={onClick}>
      <ManageAccountsIcon className={styles.icon} />
      <span>Support Chat</span>
    </button>
  );
}
