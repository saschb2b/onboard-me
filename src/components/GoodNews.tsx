import type { ReactNode } from 'react';

interface GoodNewsProps {
  /** The single most reassuring sentence: the thing that transfers cleanly. */
  children: ReactNode;
}

/** The reassuring takeaway, set apart in a warm panel near the top of a guide. */
export function GoodNews({ children }: GoodNewsProps) {
  return (
    <div className="goodnews">
      <span className="goodnews-tag">What transfers cleanly</span>
      <p>{children}</p>
    </div>
  );
}
