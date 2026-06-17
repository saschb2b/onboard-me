import { useState } from 'react';
import type { RosettaGroup } from '../data/types';

interface RosettaTableProps {
  groups: RosettaGroup[];
}

/**
 * The Rosetta section: a live-filterable table of "what you do today → what it
 * becomes over there". Owns its own filter state, since nothing outside this
 * section needs it.
 */
export function RosettaTable({ groups }: RosettaTableProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filtered = q
    ? groups
        .map((group) => ({
          ...group,
          rows: group.rows.filter((row) =>
            `${row.concept} ${row.from} ${row.to} ${row.note ?? ''}`.toLowerCase().includes(q),
          ),
        }))
        .filter((group) => group.rows.length > 0)
    : groups;
  const matchCount = filtered.reduce((total, group) => total + group.rows.length, 0);

  return (
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

      {filtered.length === 0 ? (
        <p className="rosetta-empty">
          Nothing matches “{query.trim()}”. Try a shorter or different term.
        </p>
      ) : (
        <div className="rosetta">
          {filtered.map((group) => (
            <div key={group.title} className="rosetta-group glass">
              <h3 className="rosetta-group-title">{group.title}</h3>
              <ul className="rosetta-rows">
                {group.rows.map((row) => (
                  <li key={row.concept} className="rosetta-row">
                    <span className="r-concept">{row.concept}</span>
                    <span className="r-pair">
                      <code className="r-from">{row.from}</code>
                      <span className="r-to-group">
                        <span className="r-arrow" aria-hidden>→</span>
                        <code className="r-to">{row.to}</code>
                      </span>
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
