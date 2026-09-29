import styles from "./Card.module.css";

/**
 * Card — Figma "Background+Shadow": the white rounded panel each step's
 * content sits in. Sections inside it are spaced 64px apart.
 */
export default function Card({ children }) {
  return <section className={styles.card}>{children}</section>;
}
