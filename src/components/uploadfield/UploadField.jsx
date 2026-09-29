import { UploadCloudIcon } from "../icons/Icons";
import styles from "./UploadField.module.css";

/**
 * UploadField — Figma "Upload Field": dashed drop zone with the cloud
 * glyph, a "Select file" button, and a "Download CSV Template" link.
 */
export default function UploadField({ onFileSelect, onDownloadTemplate }) {
  return (
    <div className={styles.zone}>
      <UploadCloudIcon className={styles.icon} />
      <div className={styles.bottom}>
        <div className={styles.description}>
          <p className={styles.title}>Upload Site Information</p>
          <p className={styles.hint}>Drag and drop your CSV or Excel file here, or click to select</p>
        </div>
        <div className={styles.actions}>
          <label className={styles.selectButton}>
            Select file
            <input type="file" accept=".csv,.xlsx,.xls" onChange={onFileSelect} className={styles.hiddenInput} />
          </label>
          <button type="button" className={styles.templateLink} onClick={onDownloadTemplate}>
            Download CSV Template
          </button>
        </div>
      </div>
    </div>
  );
}
