import type { Meta, StoryObj } from '@storybook/react-vite';
import { RosettaTable } from './RosettaTable';
import { reactToAndroid } from '../data/guides/react-to-android';

const meta = {
  title: 'Guide/RosettaTable',
  component: RosettaTable,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof RosettaTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { groups: reactToAndroid.rosetta },
};

export const SingleGroup: Story = {
  args: { groups: reactToAndroid.rosetta.slice(0, 1) },
};
