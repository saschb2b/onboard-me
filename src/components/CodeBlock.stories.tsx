import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const meta = {
  title: 'Guide/CodeBlock',
  component: CodeBlock,
  decorators: [(Story) => <div style={{ maxWidth: 760 }}><Story /></div>],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: `class MainActivity : ComponentActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContent {                       // ReactDOM.createRoot(...).render(...)
      AppTheme {                       // <ThemeProvider>
        Greeting(name = "Android")     // <Greeting name="Android" />
      }
    }
  }
}`,
  },
};

export const OneLine: Story = {
  args: { code: 'val message = "Hello, Android"' },
};

/** A long line that exceeds the width scrolls horizontally inside the block. */
export const Overflowing: Story = {
  args: {
    code: 'val veryLongDeclaration = listOf("one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten")',
  },
};
