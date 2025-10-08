import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-icons/fi'],
  },
  server: {
    proxy: {
      '/api/github': {
        target: 'https://github-readme-stats.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github/, ''),
      },
    },
  },
});