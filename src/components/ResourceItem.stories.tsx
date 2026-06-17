import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResourceItem } from './ResourceItem';
import { reactToAndroid } from '../data/guides/react-to-android';

const meta = {
  title: 'Guide/ResourceItem',
  component: ResourceItem,
  // Resources are <li> rows; render them inside the list surface they live in.
  decorators: [
    (Story) => (
      <ul className="resources glass" style={{ maxWidth: 720 }}>
        <Story />
      </ul>
    ),
  ],
  args: {
    resource: { label: 'developer.android.com', href: 'https://developer.android.com', kind: 'docs', note: 'The MDN of Android. Start here.' },
  },
} satisfies Meta<typeof ResourceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  args: {
    resource: { label: 'developer.android.com', href: 'https://developer.android.com', kind: 'docs', note: 'The MDN of Android. Start here.' },
  },
};

export const Course: Story = {
  args: {
    resource: { label: 'Android Basics with Compose', href: 'https://developer.android.com/courses', kind: 'course', note: 'Google’s guided path from zero.' },
  },
};

export const NoNote: Story = {
  args: {
    resource: { label: 'r/androiddev', href: 'https://www.reddit.com/r/androiddev/', kind: 'community' },
  },
};

/** Every kind together, the way the section actually renders. */
export const FullList: Story = {
  render: () => (
    <>
      {reactToAndroid.resources.map((res) => (
        <ResourceItem key={res.href} resource={res} />
      ))}
    </>
  ),
};
