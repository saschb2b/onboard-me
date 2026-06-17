import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { GuideMissing } from './GuideMissing';

const meta = {
  title: 'Guide/GuideMissing',
  component: GuideMissing,
  parameters: { layout: 'fullscreen' },
  args: { onBack: fn(), onPick: fn() },
} satisfies Meta<typeof GuideMissing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoReverse: Story = {
  args: { source: 'python', target: 'rust' },
};

/** When the reverse pair is curated, the page offers it. */
export const WithReverse: Story = {
  args: { source: 'android', target: 'react' },
};
