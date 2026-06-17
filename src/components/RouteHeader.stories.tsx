import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { RouteHeader } from './RouteHeader';

const meta = {
  title: 'Guide/RouteHeader',
  component: RouteHeader,
  args: { onSwap: fn() },
} satisfies Meta<typeof RouteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sourceLabel: 'React Developer',
    sourceTag: 'JS / TS',
    targetLabel: 'Android Developer',
    targetTag: 'Kotlin',
  },
};

export const LongLabels: Story = {
  args: {
    sourceLabel: 'Node Backend Developer',
    sourceTag: 'JS / TS',
    targetLabel: 'Data / ML Engineer',
    targetTag: 'Python',
  },
};

export const NoTags: Story = {
  args: {
    sourceLabel: 'Go Developer',
    targetLabel: 'Rust Developer',
  },
};
