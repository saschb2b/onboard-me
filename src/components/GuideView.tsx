import { useState } from 'react';
import type { ReactNode } from 'react';
import { getField } from '../data/fields';
import { GuideNav, ReadingProgress } from './GuideNav';
import type { GuideSection } from './GuideNav';
import type { Guide, ResourceKind } from '../data/types';

interface GuideViewProps {
  guide: Guide;
  onBack: () => void;
  /** Jump to the reverse pair (target → source). */
  onSwap: () => void;
}

export function GuideView({ guide, onBack, onSwap }: GuideViewProps) {
  const source = getField(guide.source);
  const target = getField(guide.target);
  const sourceShort = (source?.label ?? guide.source).replace(' Developer', '');
  const targetShort = (target?.label ?? guide.target).replace(' Developer', '');

  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const rosetta = q
    ? guide.rosetta
        .map((group) => ({
          ...group,
          rows: group.rows.filter((row) =>
            `${row.concept} ${row.from} ${row.to} ${row.note ?? ''}`.toLowerCase().includes(q),
          ),
        }))
        .filter((group) => group.rows.length > 0)
    : guide.rosetta;
  const matchCount = rosetta.reduce((total, group) => total + group.rows.length, 0);

  const sections: GuideSection[] = (
    [
      guide.mentalShifts.length > 0 && { id: 'shifts', label: 'Mental shifts' },
      guide.rosetta.length > 0 && { id: 'rosetta', label: 'Rosetta table' },
      guide.gotchas.length > 0 && { id: 'gotchas', label: 'Surprises' },
      guide.firstRun.length > 0 && { id: 'first-run', label: 'First run' },
      guide.packagesToKnow.length > 0 && { id: 'packages', label: 'Packages' },
      guide.resources.length > 0 && { id: 'resources', label: 'Resources' },
    ] as (GuideSection | false)[]
  ).filter(Boolean) as GuideSection[];

  return (
    <>
      <ReadingProgress />
      <div className="guide-shell">
        {sections.length > 0 && <GuideNav sections={sections} />}

        <article className="guide rise">
          <header className="guide-head">
            <button type="button" className="back" onClick={onBack}>
              <span aria-hidden>←</span> start over
            </button>

            <div className="route">
              <span className="route-field">
                {source?.label ?? guide.source}
                <span className="route-tag">{source?.tag}</span>
              </span>
              <button
                type="button"
                className="route-swap"
                onClick={onSwap}
                title="Swap direction"
                aria-label={`Swap direction to ${target?.label ?? guide.target} to ${
                  source?.label ?? guide.source
                }`}
              >
                <SwapIcon />
              </button>
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

          <Section id="shifts" title="The mental shifts" hint="Reframings, not tool swaps.">
            <div className="shift-grid">
              {guide.mentalShifts.map((shift) => (
                <div key={shift.title} className="shift glass">
                  <h3 className="shift-title">{shift.title}</h3>
                  <div className="shift-flow">
                    <div className="shift-side shift-side--from">
                      <span className="shift-label">{sourceShort}</span>
                      <p>{shift.from}</p>
                    </div>
                    <span className="shift-connector" aria-hidden>
                      <ShiftArrow />
                    </span>
                    <div className="shift-side shift-side--to">
                      <span className="shift-label">{targetShort}</span>
                      <p>{shift.to}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <section id="rosetta" className="g-section">
            <div className="g-section-head">
              <h2>The Rosetta table</h2>
              <span className="g-section-hint">What you do today, and what it becomes over there.</span>
            </div>

            <div className="rosetta-search">
              <SearchIcon />
              <input
                type="text"
                className="rosetta-search-input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter the table, e.g. useState, routing, build"
                aria-label="Filter the Rosetta table"
              />
              {q && <span className="rosetta-count">{matchCount === 1 ? '1 match' : `${matchCount} matches`}</span>}
              {query && (
                <button
                  type="button"
                  className="rosetta-search-clear"
                  onClick={() => setQuery('')}
                  aria-label="Clear filter"
                >
                  <ClearIcon />
                </button>
              )}
            </div>

            {rosetta.length === 0 ? (
              <p className="rosetta-empty">
                Nothing matches “{query.trim()}”. Try a shorter or different term.
              </p>
            ) : (
              <div className="rosetta">
                {rosetta.map((group) => (
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
            )}
          </section>

          <Section id="gotchas" title="What will surprise you" hint="The culture shocks worth bracing for.">
            <div className="gotchas">
              {guide.gotchas.map((g) => (
                <div key={g.title} className="gotcha glass">
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="first-run" title="Your first run" hint="From install to a running app.">
            <ol className="steps">
              {guide.firstRun.map((step, i) => (
                <li key={step.title} className="step">
                  <span className="step-num">{i + 1}</span>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    {step.code && <CodeBlock code={step.code} />}
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="packages" title="Packages to know" hint="The libraries you will reach for first.">
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

          <Section id="resources" title="Where to go next" hint="Bookmark these.">
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
      </div>
    </>
  );
}

function Section({
  id,
  title,
  hint,
  children,
}: {
  id?: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="g-section">
      <div className="g-section-head">
        <h2>{title}</h2>
        {hint && <span className="g-section-hint">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const clipboard = navigator.clipboard;
    if (!clipboard) return;
    clipboard.writeText(code).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  };

  return (
    <div className="code-block">
      <button
        type="button"
        className="code-copy"
        data-copied={copied || undefined}
        onClick={copy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
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

function SearchIcon() {
  return (
    <svg className="rosetta-search-icon" width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11.5 11.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 10.5A1.5 1.5 0 0 1 2.5 9V3.5A1.5 1.5 0 0 1 4 2h5a1.5 1.5 0 0 1 1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
