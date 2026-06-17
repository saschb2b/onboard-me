import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FieldSelect } from './FieldSelect';

const meta = {
  title: 'Guide/FieldSelect',
  component: FieldSelect,
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
  args: { onChange: fn(), placeholder: 'choose your field', label: 'Your field' },
} satisfies Meta<typeof FieldSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { value: null },
};

export const Selected: Story = {
  args: { value: 'react' },
};
