import { useState } from 'react';
import { FieldSelect } from './FieldSelect';
import { getField } from '../data/fields';
import { CURATED_PAIRS } from '../data/guides';
import type { FieldId } from '../data/types';

interface LandingProps {
  onSubmit: (source: FieldId, target: FieldId) => void;
}

export function Landing({ onSubmit }: LandingProps) {
  const [source, setSource] = useState<FieldId | null>(null);
  const [target, setTarget] = useState<FieldId | null>(null);

  const ready = source !== null && target !== null && source !== target;
  const sameField = source !== null && source === target;

  return (
    <section className="landing container rise">
      <p className="eyebrow">onboard-me</p>
      <h1 className="hero-title">
        Learn a new field through
        <br />
        the one you already know.
      </h1>
      <p className="hero-sub">
        Pick where you are fluent and where you are headed. We translate the new world into the
        concepts, tools, and habits you already trust, then flag exactly where the ground shifts.
      </p>

      <form
        className="picker glass"
        onSubmit={(event) => {
          event.preventDefault();
          if (ready) onSubmit(source, target);
        }}
      >
        <div className="picker-fields">
          <div className="picker-line">
            <span className="picker-word">I am a</span>
            <FieldSelect value={source} onChange={setSource} placeholder="choose your field" label="Your current field" />
          </div>
          <button
            type="button"
            className="picker-swap"
            onClick={() => {
              setSource(target);
              setTarget(source);
            }}
            disabled={source === null && target === null}
            title="Swap the two fields"
            aria-label="Swap the two fields"
          >
            <SwapIcon />
          </button>
          <div className="picker-line">
            <span className="picker-word">and I want to know about</span>
            <FieldSelect value={target} onChange={setTarget} placeholder="choose a new field" label="The field to learn" />
          </div>
        </div>

        <button type="submit" className="cta" disabled={!ready}>
          {sameField ? 'Pick two different fields' : 'Onboard me'}
          {ready && <Arrow />}
        </button>
      </form>

      <div className="suggestions">
        <span className="suggestions-label">Ready to read:</span>
        {CURATED_PAIRS.map((pair) => {
          const s = getField(pair.source);
          const t = getField(pair.target);
          if (!s || !t) return null;
          return (
            <button
              key={`${pair.source}-${pair.target}`}
              type="button"
              className="chip"
              onClick={() => onSubmit(pair.source, pair.target)}
            >
              {s.label.replace(' Developer', '')} <span className="chip-arrow">→</span> {t.label.replace(' Developer', '')}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 9h11M10 4.5L14.5 9 10 13.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M5.5 13.5V4.5M3 7l2.5-2.5L8 7M12.5 4.5v9M10 11l2.5 2.5L15 11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
