import type { Meta, StoryObj } from '@storybook/react-vite';
import { FirstRunStep } from './FirstRunStep';

const meta = {
  title: 'Guide/FirstRunStep',
  component: FirstRunStep,
  // Steps are <li> in an ordered list; render inside it.
  decorators: [
    (Story) => (
      <ol className="steps" style={{ maxWidth: 760 }}>
        <Story />
      </ol>
    ),
  ],
  args: {
    number: 1,
    step: { title: 'A step', body: 'What to do, and the familiar thing it maps to.' },
  },
} satisfies Meta<typeof FirstRunStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Prose: Story = {
  args: {
    number: 1,
    step: {
      title: 'Install Android Studio',
      body: 'It bundles the JDK, the Android SDK, Gradle, and the emulator. This one install replaces "set up Node, a bundler, and a dev server".',
    },
  },
};

export const WithCode: Story = {
  args: {
    number: 3,
    step: {
      title: 'Read MainActivity.kt and spot the familiar parts',
      body: 'setContent { } is your createRoot().render(). The @Composable Greeting() is your <App/>.',
      code: `@Composable
fun Greeting(name: String) {
  var count by remember { mutableStateOf(0) }   // const [count, setCount] = useState(0)
  Column(Modifier.padding(24.dp)) {
    Text("Hello, $name")
    Button(onClick = { count++ }) {
      Text("Tapped $count times")
    }
  }
}`,
    },
  },
};

export const Sequence: Story = {
  render: () => (
    <>
      <FirstRunStep number={1} step={{ title: 'Install Android Studio', body: 'It bundles the JDK, the SDK, Gradle, and the emulator.' }} />
      <FirstRunStep number={2} step={{ title: 'New Project → Empty Activity (Compose)', body: 'Pick Kotlin. You get a runnable app with a MaterialTheme already wired up.' }} />
      <FirstRunStep number={3} step={{ title: 'Press Run', body: 'An emulator boots and the app installs. The first build is the slow one.' }} />
    </>
  ),
};
