export function ManageAccountsIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M4.08496 17.5V16.85C4.08496 16.51 4.24496 16.19 4.49496 16.04C6.18496 15.03 8.11496 14.5 10.085 14.5C10.115 14.5 10.135 14.5 10.165 14.51C10.265 13.81 10.465 13.14 10.755 12.53C10.535 12.51 10.315 12.5 10.085 12.5C7.66496 12.5 5.40496 13.17 3.47496 14.32C2.59496 14.84 2.08496 15.82 2.08496 16.85V19.5H11.345C10.925 18.9 10.595 18.22 10.375 17.5H4.08496Z" />
      <path d="M10.085 11.5C12.295 11.5 14.085 9.71 14.085 7.5C14.085 5.29 12.295 3.5 10.085 3.5C7.87496 3.5 6.08496 5.29 6.08496 7.5C6.08496 9.71 7.87496 11.5 10.085 11.5ZM10.085 5.5C11.185 5.5 12.085 6.4 12.085 7.5C12.085 8.6 11.185 9.5 10.085 9.5C8.98496 9.5 8.08496 8.6 8.08496 7.5C8.08496 6.4 8.98496 5.5 10.085 5.5Z" />
      <path d="M20.835 15.5C20.835 15.28 20.805 15.08 20.775 14.87L21.915 13.86L20.915 12.13L19.465 12.62C19.145 12.35 18.785 12.14 18.385 11.99L18.085 10.5H16.085L15.785 11.99C15.385 12.14 15.025 12.35 14.705 12.62L13.255 12.13L12.255 13.86L13.395 14.87C13.365 15.08 13.335 15.28 13.335 15.5C13.335 15.72 13.365 15.92 13.395 16.13L12.255 17.14L13.255 18.87L14.705 18.38C15.025 18.65 15.385 18.86 15.785 19.01L16.085 20.5H18.085L18.385 19.01C18.785 18.86 19.145 18.65 19.465 18.38L20.915 18.87L21.915 17.14L20.775 16.13C20.805 15.92 20.835 15.72 20.835 15.5ZM17.085 17.5C15.985 17.5 15.085 16.6 15.085 15.5C15.085 14.4 15.985 13.5 17.085 13.5C18.185 13.5 19.085 14.4 19.085 15.5C19.085 16.6 18.185 17.5 17.085 17.5Z" />
    </svg>
  );
}

export function CachedIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M15.8334 6.66634L12.5 9.99967H15C15 12.758 12.7584 14.9997 10 14.9997C9.15837 14.9997 8.35837 14.7913 7.66671 14.4163L6.45004 15.633C7.47504 16.283 8.69171 16.6663 10 16.6663C13.6834 16.6663 16.6667 13.683 16.6667 9.99967H19.1667L15.8334 6.66634ZM5.00004 9.99967C5.00004 7.24134 7.24171 4.99967 10 4.99967C10.8417 4.99967 11.6417 5.20801 12.3334 5.58301L13.55 4.36634C12.525 3.71634 11.3084 3.33301 10 3.33301C6.31671 3.33301 3.33337 6.31634 3.33337 9.99967H0.833374L4.16671 13.333L7.50004 9.99967H5.00004Z" />
    </svg>
  );
}

export function ChevronUpIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M7.41 15.7051L12 11.1251L16.59 15.7051L18 14.2951L12 8.29508L6 14.2951L7.41 15.7051Z" />
    </svg>
  );
}

export function SearchIcon({ className }) {
  return (
    <svg className={className} width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.74974 12.7798C12.6604 11.5429 14.0171 8.18064 12.7801 5.2701C11.5432 2.35956 8.18083 1.00284 5.27019 2.23979C2.35954 3.47675 1.00278 6.83895 2.23978 9.7495C3.47677 12.66 6.83909 14.0168 9.74974 12.7798Z" />
      <path d="M11.5586 11.5586L15.9998 16.0003" />
    </svg>
  );
}

/** Plain X, used for the red "remove other service" control and inside chips. */
export function CloseIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
    </svg>
  );
}

/** White disc with a dark X — the remove control on the blue date chips. */
export function CloseDiscIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="8" fill="#ffffff" />
      <path fill="#000000" d="M12.6663 4.27301L11.7263 3.33301L7.99967 7.05967L4.27301 3.33301L3.33301 4.27301L7.05967 7.99967L3.33301 11.7263L4.27301 12.6663L7.99967 8.93967L11.7263 12.6663L12.6663 11.7263L8.93967 7.99967L12.6663 4.27301Z" />
    </svg>
  );
}

/** Blue disc with a white X — the remove control on an uploaded-file card. */
export function CloseBadgeIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="12" fill="#0056A3" />
      <path fill="#ffffff" d="M18.125 7.10875L16.8913 5.875L12 10.7663L7.10875 5.875L5.875 7.10875L10.7663 12L5.875 16.8913L7.10875 18.125L12 13.2337L16.8913 18.125L18.125 16.8913L13.2337 12L18.125 7.10875Z" />
    </svg>
  );
}

export function CalendarIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M15.8333 3.33366H15V1.66699H13.3333V3.33366H6.66667V1.66699H5V3.33366H4.16667C3.24167 3.33366 2.5 4.08366 2.5 5.00033V16.667C2.5 17.5837 3.24167 18.3337 4.16667 18.3337H15.8333C16.75 18.3337 17.5 17.5837 17.5 16.667V5.00033C17.5 4.08366 16.75 3.33366 15.8333 3.33366ZM15.8333 16.667H4.16667V8.33366H15.8333V16.667ZM15.8333 6.66699H4.16667V5.00033H15.8333V6.66699Z" />
    </svg>
  );
}

export function UploadCloudIcon({ className }) {
  return (
    <svg className={className} width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M32 32L24 24L16 32" />
      <path d="M24 24V42" />
      <path d="M40.7799 36.78C42.7306 35.7165 44.2716 34.0337 45.1597 31.9972C46.0477 29.9607 46.2323 27.6864 45.6843 25.5334C45.1363 23.3803 43.8869 21.471 42.1333 20.1069C40.3796 18.7427 38.2216 18.0014 35.9999 18H33.4799C32.8745 15.6585 31.7462 13.4846 30.1798 11.642C28.6134 9.79927 26.6496 8.33567 24.4361 7.36118C22.2226 6.3867 19.817 5.92669 17.4002 6.01573C14.9833 6.10478 12.6181 6.74057 10.4823 7.8753C8.34649 9.01003 6.49574 10.6142 5.06916 12.5671C3.64259 14.5201 2.6773 16.771 2.24588 19.1508C1.81446 21.5305 1.92813 23.977 2.57835 26.3065C3.22856 28.636 4.3984 30.7877 5.99992 32.6" />
    </svg>
  );
}

export function FileIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path strokeWidth="1.83" d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
      <path strokeWidth="1.83" d="M14 2V8H20" />
      <path strokeWidth="1.375" d="M16 13H8" />
      <path strokeWidth="1.375" d="M16 17H8" />
      <path strokeWidth="1.375" d="M10 9H9H8" />
    </svg>
  );
}

export function CaretDownIcon({ className }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 8L10 13L15 8L5 8Z" />
    </svg>
  );
}