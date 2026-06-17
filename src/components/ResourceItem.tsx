import type { Resource, ResourceKind } from '../data/types';
import { ExternalIcon } from './icons';

interface ResourceItemProps {
  resource: Resource;
}

/** A single curated link in "where to go next": a kind tag, the external link, an optional note. */
export function ResourceItem({ resource }: ResourceItemProps) {
  return (
    <li className="resource">
      <span className={`res-kind res-kind--${resource.kind}`}>{kindLabel(resource.kind)}</span>
      <a href={resource.href} target="_blank" rel="noreferrer" className="res-link">
        {resource.label}
        <ExternalIcon />
      </a>
      {resource.note && <span className="res-note">{resource.note}</span>}
    </li>
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
