import { getField } from '../data/fields';
import { CURATED_PAIRS, getGuide } from '../data/guides';
import type { FieldId } from '../data/types';

interface GuideMissingProps {
  source: FieldId;
  target: FieldId;
  onBack: () => void;
  onPick: (source: FieldId, target: FieldId) => void;
}

/**
 * Shown for a pair we have not hand-written yet. In production this is the
 * seam where a generated guide would stream in (see README → Content strategy).
 * For now it stays honest about what exists.
 */
export function GuideMissing({ source, target, onBack, onPick }: GuideMissingProps) {
  const s = getField(source);
  const t = getField(target);
  const reverse = getGuide(target, source);

  return (
    <section className="missing container rise">
      <button type="button" className="back" onClick={onBack}>
        <span aria-hidden>←</span> start over
      </button>

      <div className="missing-card glass">
        <h1>
          {s?.label ?? source} <span className="route-arrow" aria-hidden>→</span> {t?.label ?? target}
        </h1>
        <p>
          We don’t have a hand-written guide for this pair yet. In the full product this is where a
          generated translation would stream in, built from the same template every curated guide
          uses. Until that backend is wired up, here is what already exists:
        </p>

        {reverse && (
          <button
            type="button"
            className="cta missing-reverse"
            onClick={() => onPick(target, source)}
          >
            Read {t?.label.replace(' Developer', '') ?? target}{' '}
            <span className="chip-arrow" aria-hidden>→</span> {s?.label.replace(' Developer', '') ?? source}{' '}
            instead
          </button>
        )}

        <div className="suggestions">
          {CURATED_PAIRS.map((pair) => {
            const ps = getField(pair.source);
            const pt = getField(pair.target);
            if (!ps || !pt) return null;
            return (
              <button
                key={`${pair.source}-${pair.target}`}
                type="button"
                className="chip"
                onClick={() => onPick(pair.source, pair.target)}
              >
                {ps.label.replace(' Developer', '')} <span className="chip-arrow">→</span>{' '}
                {pt.label.replace(' Developer', '')}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
