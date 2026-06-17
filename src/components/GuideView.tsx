import type { ReactNode } from 'react';
import { getField } from '../data/fields';
import type { Guide, ResourceKind } from '../data/types';

interface GuideViewProps {
  guide: Guide;
  onBack: () => void;
}

export function GuideView({ guide, onBack }: GuideViewProps) {
  const source = getField(guide.source);
  const target = getField(guide.target);

  return (
    <article className="guide container rise">
      <header className="guide-head">
        <button type="button" className="back" onClick={onBack}>
          <span aria-hidden>←</span> start over
        </button>

        <div className="route">
          <span className="route-field">
            {source?.label ?? guide.source}
            <span className="route-tag">{source?.tag}</span>
          </span>
          <span className="route-arrow" aria-hidden>→</span>
          <span className="route-field route-field--target">
            {target?.label ?? guide.target}
            <span className="route-tag">{target?.tag}</span>
          </span>
        </div>

        <h1 className="guide-title">{guide.headline}</h1>
        <p className="guide-intro">{guide.intro}</p>

        <div className="goodnews">
          <span className="goodnews-tag">What transfers cleanly</span>
          <p>{guide.goodNews}</p>
        </div>
      </header>

      <Section title="The mental shifts" hint="Reframings, not tool swaps.">
        <div className="shift-grid">
          {guide.mentalShifts.map((shift) => (
            <div key={shift.title} className="shift glass">
              <h3>{shift.title}</h3>
              <FromTo from={shift.from} to={shift.to} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="The Rosetta table" hint="What you do today, and what it becomes over there.">
        <div className="rosetta">
          {guide.rosetta.map((group) => (
            <div key={group.title} className="rosetta-group glass">
              <h3 className="rosetta-group-title">{group.title}</h3>
              <ul className="rosetta-rows">
                {group.rows.map((row) => (
                  <li key={row.concept} className="rosetta-row">
                    <span className="r-concept">{row.concept}</span>
                    <span className="r-pair">
                      <code className="r-from">{row.from}</code>
                      <span className="r-arrow" aria-hidden>→</span>
                      <code className="r-to">{row.to}</code>
                    </span>
                    {row.note && <span className="r-note">{row.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What will surprise you" hint="The culture shocks worth bracing for.">
        <div className="gotchas">
          {guide.gotchas.map((g) => (
            <div key={g.title} className="gotcha glass">
              <h3>{g.title}</h3>
              <p>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Your first run" hint="From install to a running app.">
        <ol className="steps">
          {guide.firstRun.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num">{i + 1}</span>
              <div className="step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.code && <pre className="code-block"><code>{step.code}</code></pre>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Packages to know" hint="The libraries you will reach for first.">
        <div className="pkg-grid">
          {guide.packagesToKnow.map((pkg) => (
            <div key={pkg.name} className="pkg glass">
              <h3>{pkg.name}</h3>
              <p>{pkg.what}</p>
              {pkg.analog && (
                <p className="pkg-analog">
                  <span>like</span> {pkg.analog}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Where to go next" hint="Bookmark these.">
        <ul className="resources glass">
          {guide.resources.map((res) => (
            <li key={res.href} className="resource">
              <span className={`res-kind res-kind--${res.kind}`}>{kindLabel(res.kind)}</span>
              <a href={res.href} target="_blank" rel="noreferrer">
                {res.label}
              </a>
              {res.note && <span className="res-note">{res.note}</span>}
            </li>
          ))}
        </ul>
      </Section>

      <footer className="guide-foot">
        <button type="button" className="cta cta--ghost" onClick={onBack}>
          Translate another field
        </button>
      </footer>
    </article>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="g-section">
      <div className="g-section-head">
        <h2>{title}</h2>
        {hint && <span className="g-section-hint">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

function FromTo({ from, to }: { from: string; to: string }) {
  return (
    <div className="fromto">
      <p className="fromto-from">{from}</p>
      <span className="fromto-arrow" aria-hidden>→</span>
      <p className="fromto-to">{to}</p>
    </div>
  );
}

function kindLabel(kind: ResourceKind): string {
  const map: Record<ResourceKind, string> = {
    docs: 'docs',
    course: 'course',
    sample: 'sample',
    tool: 'tool',
    community: 'community',
  };
  return map[kind];
}
