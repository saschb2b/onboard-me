import { prefersReducedMotion, useReadingProgress, useScrollSpy } from '../hooks';

export interface GuideSection {
  id: string;
  label: string;
}

/** A thin fixed bar at the top of the viewport showing scroll progress. */
export function ReadingProgress() {
  const progress = useReadingProgress();
  return (
    <div className="reading-progress" aria-hidden>
      <span className="reading-progress-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

interface GuideNavProps {
  sections: GuideSection[];
}

/**
 * Sticky "on this page" rail with scroll-spy. Shown only on wide screens; the
 * reading-progress bar carries orientation on narrower ones. Uses buttons, not
 * hash anchors, so it never collides with the app's `#/source/target` routing.
 */
export function GuideNav({ sections }: GuideNavProps) {
  const active = useScrollSpy(sections.map((s) => s.id));

  const go = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className="guide-toc" aria-label="Sections of this guide">
      <span className="guide-toc-label">On this page</span>
      <ul className="guide-toc-list">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              className="guide-toc-link"
              data-active={active === section.id || undefined}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={() => go(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
