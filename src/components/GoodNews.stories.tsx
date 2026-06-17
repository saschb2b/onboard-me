import type { Meta, StoryObj } from '@storybook/react-vite';
import { GoodNews } from './GoodNews';

const meta = {
  title: 'Guide/GoodNews',
  component: GoodNews,
  decorators: [(Story) => <div style={{ maxWidth: 780 }}><Story /></div>],
} satisfies Meta<typeof GoodNews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children:
      'If you can think in "UI is a function of state" and one-way data flow, you already know how to think in Compose. The hard part is the toolchain around it, not the UI model.',
  },
};

export const Short: Story = {
  args: { children: 'Your component instincts transfer almost intact.' },
};
