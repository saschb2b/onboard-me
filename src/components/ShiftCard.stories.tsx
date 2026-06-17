import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShiftCard } from './ShiftCard';

const meta = {
  title: 'Guide/ShiftCard',
  component: ShiftCard,
  args: {
    fromLabel: 'React',
    toLabel: 'Android',
    shift: {
      title: 'A mental shift',
      from: 'How you think about it today.',
      to: 'How it works over there.',
    },
  },
} satisfies Meta<typeof ShiftCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shift: {
      title: 'A lifecycle instead of a page load',
      from: 'The page loads, you render, and a refresh wipes the slate. State lives as long as the tab does.',
      to: 'Your app runs inside an Activity with a lifecycle. The OS can rotate, background, or kill it, then restore it.',
    },
  },
};

export const ShortAndLong: Story = {
  name: 'Lopsided lengths',
  args: {
    shift: {
      title: 'One language for everything',
      from: 'HTML, CSS, and JS.',
      to: 'It is all Kotlin. Layout, styling, and logic are the same language, built by calling functions and chaining Modifiers rather than writing markup and stylesheets across three files.',
    },
  },
};

/** A row of cards: the subgrid keeps the source block, arrow, and target block
 *  aligned across cards even when their text lengths differ. */
export const Grid: Story = {
  render: (args) => (
    <div className="shift-grid">
      <ShiftCard
        {...args}
        shift={{
          title: 'Compiled and typed, not shipped as source',
          from: 'You ship JS/TS that a runtime parses; types vanish at build time.',
          to: 'Kotlin compiles ahead of time. Types are real and enforced, and null is part of the type system, so whole classes of runtime crashes become compile errors.',
        }}
      />
      <ShiftCard
        {...args}
        shift={{
          title: 'One language for everything',
          from: 'HTML for structure, CSS for style, JS for behavior.',
          to: 'It is all Kotlin.',
        }}
      />
      <ShiftCard
        {...args}
        shift={{
          title: 'A lifecycle instead of a page load',
          from: 'The page loads, you render, a refresh wipes the slate.',
          to: 'Your app runs inside an Activity with a lifecycle that the OS drives.',
        }}
      />
      <ShiftCard
        {...args}
        shift={{
          title: 'You target a matrix of devices',
          from: 'Your support matrix is browser versions.',
          to: 'Your matrix is API levels, screen sizes, and densities.',
        }}
      />
    </div>
  ),
};
