import { useEffect, useState } from 'react';
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

  // Keep the URL hash and app state in sync, so guides are shareable and the
  // browser's back button works as expected.
  useEffect(() => {
    const onHashChange = () => setPair(readHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Land at the top whenever the route changes, so a guide never opens
  // mid-scroll and "start over" returns to the top of the landing page.
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="field-decor" aria-hidden>
        <span className="d1" />
        <span className="d2" />
        <span className="d3" />
        <span className="d4" />
      </div>

      <main className="app-main">
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
