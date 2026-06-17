import type { FirstStep } from '../data/types';
import { CodeBlock } from './CodeBlock';

interface FirstRunStepProps {
  step: FirstStep;
  /** 1-based position, shown in the step marker. */
  number: number;
}

/** One numbered step in the first-run walkthrough, with an optional code sample. */
export function FirstRunStep({ step, number }: FirstRunStepProps) {
  return (
    <li className="step">
      <span className="step-num">{number}</span>
      <div className="step-body">
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        {step.code && <CodeBlock code={step.code} />}
      </div>
    </li>
  );
}
