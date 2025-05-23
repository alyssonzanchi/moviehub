import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{ts,js,mjs,cjs,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended', 'prettier']
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'warn'
    }
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  pluginReact.configs.flat.recommended
]);
