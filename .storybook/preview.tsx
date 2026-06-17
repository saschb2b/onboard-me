import type { Preview, Decorator } from '@storybook/react-vite';
import '../src/styles/global.css';
import '../src/styles/components.css';
import './sb.css';

/**
 * The components are designed to sit on the lavender field gradient (the glass
 * surfaces are translucent), so render every story on it by default. A story
 * can opt out with parameters: { field: false }.
 */
const withField: Decorator = (Story, context) => {
  if (context.parameters.field === false) return <Story />;
  return (
    <div className="sb-field">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withField],
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
