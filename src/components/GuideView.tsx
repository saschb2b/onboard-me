import type { ReactNode } from 'react';
import { getField } from '../data/fields';
import { GuideNav, ReadingProgress } from './GuideNav';
import type { GuideSection } from './GuideNav';
import { RosettaTable } from './RosettaTable';
import { ShiftCard } from './ShiftCard';
import { GotchaCard } from './GotchaCard';
import { FirstRunStep } from './FirstRunStep';
import { PackageCard } from './PackageCard';
import { ResourceItem } from './ResourceItem';
import { RouteHeader } from './RouteHeader';
import { GoodNews } from './GoodNews';
import type { Guide } from '../data/types';

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

            <RouteHeader
              sourceLabel={source?.label ?? guide.source}
              sourceTag={source?.tag}
              targetLabel={target?.label ?? guide.target}
              targetTag={target?.tag}
              onSwap={onSwap}
            />

            <h1 className="guide-title">{guide.headline}</h1>
            <p className="guide-intro">{guide.intro}</p>

            <GoodNews>{guide.goodNews}</GoodNews>
          </header>

          <Section id="shifts" title="The mental shifts" hint="Reframings, not tool swaps.">
            <div className="shift-grid">
              {guide.mentalShifts.map((shift) => (
                <ShiftCard key={shift.title} shift={shift} fromLabel={sourceShort} toLabel={targetShort} />
              ))}
            </div>
          </Section>

          <RosettaTable groups={guide.rosetta} />

          <Section id="gotchas" title="What will surprise you" hint="The culture shocks worth bracing for.">
            <div className="gotchas">
              {guide.gotchas.map((gotcha) => (
                <GotchaCard key={gotcha.title} gotcha={gotcha} />
              ))}
            </div>
          </Section>

          <Section id="first-run" title="Your first run" hint="From install to a running app.">
            <ol className="steps">
              {guide.firstRun.map((step, i) => (
                <FirstRunStep key={step.title} step={step} number={i + 1} />
              ))}
            </ol>
          </Section>

          <Section id="packages" title="Packages to know" hint="The libraries you will reach for first.">
            <div className="pkg-grid">
              {guide.packagesToKnow.map((pkg) => (
                <PackageCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </Section>

          <Section id="resources" title="Where to go next" hint="Bookmark these.">
            <ul className="resources glass">
              {guide.resources.map((res) => (
                <ResourceItem key={res.href} resource={res} />
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
