import type { KnownPackage } from '../data/types';
import { ExternalIcon } from './icons';

interface PackageCardProps {
  pkg: KnownPackage;
}

/**
 * A library worth knowing. Links to its canonical docs when an href is given;
 * the source-field analog is pinned to the bottom as a footer so equal-height
 * cards in a row read as deliberate.
 */
export function PackageCard({ pkg }: PackageCardProps) {
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

  if (pkg.href) {
    return (
      <a className="pkg pkg--link glass" href={pkg.href} target="_blank" rel="noreferrer">
        {body}
      </a>
    );
  }
  return <div className="pkg glass">{body}</div>;
}
