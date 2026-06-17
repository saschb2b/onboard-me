import type { FieldId, Guide } from '../types';
import { reactToAndroid } from './react-to-android';

/** Registry of curated guides, keyed by `${source}__${target}`. */
const GUIDES: Record<string, Guide> = {
  react__android: reactToAndroid,
};

export function pairKey(source: FieldId, target: FieldId): string {
  return `${source}__${target}`;
}

export function getGuide(source: FieldId, target: FieldId): Guide | undefined {
  return GUIDES[pairKey(source, target)];
}

/** Pairs we have hand-written content for, used to surface suggestions. */
export const CURATED_PAIRS: { source: FieldId; target: FieldId }[] = Object.values(GUIDES).map(
  (g) => ({ source: g.source, target: g.target }),
);
