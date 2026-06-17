/** Icons shared by more than one component. Single-use icons live with their
 *  component. All inherit `currentColor` and are decorative (aria-hidden). */

export function ExternalIcon() {
  return (
    <svg className="ext-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5h6.5V10M12.5 3.5L6.5 9.5M11 9v3.5H3.5V5H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
