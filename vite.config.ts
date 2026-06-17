import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the app is served from /onboard-me/, so assets must resolve
// under that subpath. The CI deploy sets GITHUB_PAGES=true; local dev, preview,
// and Storybook stay at the root.
const base = process.env.GITHUB_PAGES ? '/onboard-me/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
