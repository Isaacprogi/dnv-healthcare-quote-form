import { ManageAccountsIcon } from "../icons/Icons";
import styles from "./SupportChat.module.css";

export default function SupportChat({ onClick }) {
  return (
    <button type="button" className={styles.chat} onClick={onClick}>
      <ManageAccountsIcon className={styles.icon} />
      <span>Support Chat</span>
    </button>
  );
}
