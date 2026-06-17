interface RouteHeaderProps {
  sourceLabel: string;
  sourceTag?: string;
  targetLabel: string;
  targetTag?: string;
  /** Jump to the reverse pair. */
  onSwap: () => void;
}

const short = (label: string) => label.replace(' Developer', '');

/**
 * The "where you are → where you're going" pills. Source sits on light glass,
 * target on the dark surface (the contrast is meaningful), with the arrow
 * doubling as a reverse-direction button.
 */
export function RouteHeader({ sourceLabel, sourceTag, targetLabel, targetTag, onSwap }: RouteHeaderProps) {
  return (
    <div className="route">
      <span className="route-field">
        {sourceLabel}
        {sourceTag && <span className="route-tag">{sourceTag}</span>}
      </span>
      <button
        type="button"
        className="route-swap"
        onClick={onSwap}
        title="Swap direction"
        aria-label={`Reverse direction, ${short(targetLabel)} to ${short(sourceLabel)}`}
      >
        <SwapIcon />
      </button>
      <span className="route-field route-field--target">
        {targetLabel}
        {targetTag && <span className="route-tag">{targetTag}</span>}
      </span>
    </div>
  );
}

function SwapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M5 4.5h9M11 1.5L14.5 4.5 11 7.5M13 13.5H4M7 16.5L3.5 13.5 7 10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
