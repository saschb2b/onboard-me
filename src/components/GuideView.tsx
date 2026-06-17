import { useState } from 'react';
import type { ReactNode } from 'react';
import { getField } from '../data/fields';
import { GuideNav, ReadingProgress } from './GuideNav';
import type { GuideSection } from './GuideNav';
import { RosettaTable } from './RosettaTable';
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
                aria-label={`Reverse direction, ${targetShort} to ${sourceShort}`}
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
              ))}
            </div>
          </Section>

          <RosettaTable groups={guide.rosetta} />

          <Section id="gotchas" title="What will surprise you" hint="The culture shocks worth bracing for.">
            <div className="gotchas">
              {guide.gotchas.map((g) => (
                <div key={g.title} className="gotcha glass">
                  <div className="gotcha-head">
                    <span className="gotcha-mark" aria-hidden>
                      <AlertIcon />
                    </span>
                    <h3>{g.title}</h3>
                  </div>
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
              {guide.packagesToKnow.map((pkg) => {
                const body = (
                  <>
                    <h3 className="pkg-name">
                      {pkg.name}
                      {pkg.href && <ExternalIcon />}
                    </h3>
                    <p>{pkg.what}</p>
                    {pkg.analog && (
                      <p className="pkg-analog">
                        <span>like</span> {pkg.analog}
                      </p>
                    )}
                  </>
                );
                return pkg.href ? (
                  <a
                    key={pkg.name}
                    className="pkg pkg--link glass"
                    href={pkg.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={pkg.name} className="pkg glass">
                    {body}
                  </div>
                );
              })}
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

function ExternalIcon() {
  return (
    <svg className="pkg-ext" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
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
