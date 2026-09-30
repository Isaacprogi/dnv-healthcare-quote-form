import { useRef, useState } from "react";
import { UploadCloudIcon } from "../../data/Icons";
import cx from "../../utils/cx";
import styles from "./UploadField.module.css";
import { VALID_EXTENSIONS } from "../../data";

export default function UploadField({ onFilesSelect, onDownloadTemplate }) {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.dataTransfer.types.includes("Files")) return;
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);

    const validFiles = Array.from(e.dataTransfer.files || []).filter((file) =>
      VALID_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext)),
    );
    if (validFiles.length > 0) onFilesSelect(validFiles);
  };

  const handleInputChange = (e) => {
    onFilesSelect(Array.from(e.target.files || []));
    e.target.value = ""; // allow re-selecting the same file name later
  };

  return (
    <div
      className={cx(styles.zone, isDragging && styles.dragging)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadCloudIcon className={styles.icon} />
      <div className={styles.bottom}>
        <div className={styles.description}>
          <p className={styles.title}>Upload Site Information</p>
          <p className={styles.hint}>
            Drag and drop your CSV or Excel files here, or click to select
          </p>
        </div>
        <div className={styles.actions}>
          <label className={styles.selectButton}>
            Select file(s)
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              multiple
              onChange={handleInputChange}
              className={styles.hiddenInput}
            />
          </label>
          <button
            type="button"
            className={styles.templateLink}
            onClick={onDownloadTemplate}
          >
            Download CSV Template
          </button>
        </div>
      </div>
    </div>
  );
}
