import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNormalize from 'postcss-normalize';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      // Alias para resolver o import do leaflet corretamente
      'leaflet': 'leaflet/dist/leaflet-src.esm.js'
    }
  },
  css: {
    // Inclua a configuração para processar os arquivos CSS do Leaflet
    postcss: {
      plugins: [
        postcssImport(),
        postcssUrl(),
        postcssPresetEnv({ stage: 1 }),
        postcssNormalize()
      ]
    }
  }
});
