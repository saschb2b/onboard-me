import type { Meta, StoryObj } from '@storybook/react-vite';
import { GotchaCard } from './GotchaCard';

const meta = {
  title: 'Guide/GotchaCard',
  component: GotchaCard,
  args: {
    gotcha: { title: 'A culture shock', body: 'What will surprise you and why it matters.' },
  },
} satisfies Meta<typeof GotchaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gotcha: {
      title: 'Gradle is not Vite',
      body: 'Cold builds take minutes, not milliseconds. This is the single biggest culture shock. Lean on incremental builds, Apply Changes / Live Edit, and @Preview so you are not doing a full build to see a color change.',
    },
  },
};

export const TwoLineTitle: Story = {
  args: {
    gotcha: {
      title: 'Permissions and the manifest are real surface area',
      body: 'Camera, location, notifications, and storage require declared permissions and, since Android 6, runtime prompts.',
    },
  },
};

/** Equal heights per row; the caution mark gives the section its identity. */
export const Grid: Story = {
  render: () => (
    <div className="gotchas">
      <GotchaCard
        gotcha={{
          title: 'Gradle is not Vite',
          body: 'Cold builds take minutes, not milliseconds. Lean on incremental builds and Live Edit.',
        }}
      />
      <GotchaCard
        gotcha={{
          title: 'Configuration changes recreate your screen',
          body: 'Rotating the device destroys and recreates the Activity. Anything held only in a composable is gone; hoist real state into a ViewModel, which outlives those events.',
        }}
      />
      <GotchaCard
        gotcha={{
          title: 'The main thread is sacred',
          body: 'Blocking the UI thread freezes the app and can trigger an ANR. Network and disk work goes on coroutines dispatched to Dispatchers.IO.',
        }}
      />
    </div>
  ),
};
