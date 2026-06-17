import type { Gotcha } from '../data/types';

interface GotchaCardProps {
  gotcha: Gotcha;
}

/** A culture-shock card, led by a caution mark since these are things to brace for. */
export function GotchaCard({ gotcha }: GotchaCardProps) {
  return (
    <div className="gotcha glass">
      <div className="gotcha-head">
        <span className="gotcha-mark" aria-hidden>
          <AlertIcon />
        </span>
        <h3>{gotcha.title}</h3>
      </div>
      <p>{gotcha.body}</p>
    </div>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 3.2l6.4 11.1a0.6 0.6 0 0 1-0.52 0.9H3.12a0.6 0.6 0 0 1-0.52-0.9L9 3.2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M9 7.4v3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="12.7" r="0.55" fill="currentColor" />
    </svg>
  );
}
