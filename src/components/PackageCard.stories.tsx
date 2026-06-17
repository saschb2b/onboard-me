import type { Meta, StoryObj } from '@storybook/react-vite';
import { PackageCard } from './PackageCard';

const meta = {
  title: 'Guide/PackageCard',
  component: PackageCard,
  args: {
    pkg: { name: 'A package', what: 'What it does, in a line.', analog: 'its source-field equivalent' },
  },
} satisfies Meta<typeof PackageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linked: Story = {
  args: {
    pkg: {
      name: 'Jetpack Compose + Material 3',
      what: 'Declarative UI toolkit and the Material design components.',
      analog: 'React + MUI',
      href: 'https://developer.android.com/develop/ui/compose',
    },
  },
};

export const NoLink: Story = {
  name: 'Without a link',
  args: {
    pkg: {
      name: 'Hilt',
      what: 'Dependency injection wired by the compiler.',
      analog: 'no clean React equivalent',
    },
  },
};

export const NoAnalog: Story = {
  args: {
    pkg: {
      name: 'Coil',
      what: 'Image loading and caching for Compose.',
      href: 'https://coil-kt.github.io/coil/',
    },
  },
};

/** Equal heights per row, with the analog pinned to the bottom as a footer. */
export const Grid: Story = {
  render: () => (
    <div className="pkg-grid">
      <PackageCard pkg={{ name: 'Jetpack Compose + Material 3', what: 'Declarative UI toolkit and the Material design components.', analog: 'React + MUI', href: 'https://developer.android.com/develop/ui/compose' }} />
      <PackageCard pkg={{ name: 'Navigation Compose', what: 'In-app navigation and a typed back stack.', analog: 'React Router', href: 'https://developer.android.com/guide/navigation' }} />
      <PackageCard pkg={{ name: 'ViewModel + Lifecycle', what: 'State holders that survive configuration changes.', analog: 'a store scoped to a route/screen', href: 'https://developer.android.com/topic/libraries/architecture/viewmodel' }} />
      <PackageCard pkg={{ name: 'Room', what: 'SQLite ORM with compile-time-checked queries.', analog: 'Prisma', href: 'https://developer.android.com/training/data-storage/room' }} />
    </div>
  ),
};
