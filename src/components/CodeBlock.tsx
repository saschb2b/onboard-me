import { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

/** A code sample on the dark surface with a copy-to-clipboard button. */
export function CodeBlock({ code }: CodeBlockProps) {
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
