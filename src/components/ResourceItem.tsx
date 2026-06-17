import type { Resource, ResourceKind } from '../data/types';

interface ResourceItemProps {
  resource: Resource;
}

/** A single curated link in "where to go next": a kind tag, the link, an optional note. */
export function ResourceItem({ resource }: ResourceItemProps) {
  return (
    <li className="resource">
      <span className={`res-kind res-kind--${resource.kind}`}>{kindLabel(resource.kind)}</span>
      <span className="res-main">
        <a href={resource.href} target="_blank" rel="noreferrer" className="res-link">
          {resource.label}
        </a>
        {resource.note && <span className="res-note">{resource.note}</span>}
      </span>
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
