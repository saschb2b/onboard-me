import type { MentalShift } from '../data/types';

interface ShiftCardProps {
  shift: MentalShift;
  /** Short name of the source field, e.g. "React". */
  fromLabel: string;
  /** Short name of the target field, e.g. "Android". */
  toLabel: string;
}

/**
 * One mental shift: the reframing as a title, then "you know X" over "now it's
 * Y", with the two worlds named. On wide screens a row of these aligns via the
 * grid subgrid set on `.shift-grid`.
 */
export function ShiftCard({ shift, fromLabel, toLabel }: ShiftCardProps) {
  return (
    <div className="shift glass">
      <h3 className="shift-title">{shift.title}</h3>
      <div className="shift-side shift-side--from">
        <span className="shift-label">{fromLabel}</span>
        <p>{shift.from}</p>
      </div>
      <span className="shift-connector" aria-hidden>
        <ShiftArrow />
      </span>
      <div className="shift-side shift-side--to">
        <span className="shift-label">{toLabel}</span>
        <p>{shift.to}</p>
      </div>
    </div>
  );
}

function ShiftArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2.5v11M3.5 9.5L8 14l4.5-4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
