import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { GuideView } from './GuideView';
import { reactToAndroid } from '../data/guides/react-to-android';

const meta = {
  title: 'Guide/GuideView',
  component: GuideView,
  parameters: { layout: 'fullscreen' },
  args: { onBack: fn(), onSwap: fn() },
} satisfies Meta<typeof GuideView>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The whole guide composed from its parts: the in-isolation view that should
 *  match the product exactly. */
export const ReactToAndroid: Story = {
  args: { guide: reactToAndroid },
};
