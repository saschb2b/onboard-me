import { useEffect, useRef, useState } from 'react';
import { Landing } from './components/Landing';
import { GuideView } from './components/GuideView';
import { GuideMissing } from './components/GuideMissing';
import { getGuide } from './data/guides';
import { getField } from './data/fields';
import type { FieldId } from './data/types';

interface Pair {
  source: FieldId;
  target: FieldId;
}

/** Reads a `#/source/target` hash into a valid pair, or null. */
function readHash(): Pair | null {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [source, target] = raw.split('/');
  if (source && target && getField(source) && getField(target)) {
    return { source, target };
  }
  return null;
}

export default function App() {
  const [pair, setPair] = useState<Pair | null>(readHash);
  const mainRef = useRef<HTMLElement>(null);
  const firstRoute = useRef(true);

  // Keep the URL hash and app state in sync, so guides are shareable and the
  // browser's back button works as expected.
  useEffect(() => {
    const onHashChange = () => setPair(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // On every route change, land at the top and move focus into the new view.
  // Without the focus move, clicking a guide or "start over" strands keyboard
  // and screen-reader users on a control that just unmounted; they get no
  // signal the content changed. Skip the first mount so we don't grab focus
  // on load.
  useEffect(() => {
    window.scrollTo(0, 0);
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pair?.source, pair?.target]);

  // Reflect the current pair in the tab title, so a shared link or a
  // bookmark reads as "React → Android · onboard-me" rather than a generic
  // home title.
  useEffect(() => {
    if (!pair) {
      document.title = 'onboard-me · learn a field through the one you know';
      return;
    }
    const label = (id: FieldId) => (getField(id)?.label ?? id).replace(' Developer', '');
    document.title = `${label(pair.source)} → ${label(pair.target)} · onboard-me`;
  }, [pair?.source, pair?.target]);

  const open = (source: FieldId, target: FieldId) => {
    window.location.hash = `/${source}/${target}`;
    setPair({ source, target });
  };

  const reset = () => {
    window.location.hash = '';
    setPair(null);
  };

  const guide = pair ? getGuide(pair.source, pair.target) : undefined;

  return (
    <div className="app">
      {/* Hero-framing panels. They belong on the short landing and missing
          screens; on the long, scrolling guide they would float over the
          content and the table of contents, so we drop them there. */}
      {!guide && (
        <div className="field-decor" aria-hidden>
          <span className="d1" />
          <span className="d2" />
          <span className="d3" />
          <span className="d4" />
        </div>
      )}

      <main ref={mainRef} tabIndex={-1} className="app-main">
        {!pair && <Landing onSubmit={open} />}
        {pair && guide && (
          <GuideView guide={guide} onBack={reset} onSwap={() => open(guide.target, guide.source)} />
        )}
        {pair && !guide && (
          <GuideMissing source={pair.source} target={pair.target} onBack={reset} onPick={open} />
        )}
      </main>
    </div>
  );
}
