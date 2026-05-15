import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier,
      react,
      'simple-import-sort': simpleImportSort,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'object-curly-spacing': ['error', 'always'],
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'block-scoped-var': 'error',
      'array-callback-return': 'error',
      'no-self-assign': 'error',
      'no-useless-catch': 'error',
      'no-global-assign': 'error',
      'for-direction': 'error',
      'no-unreachable': 'error',
      curly: ['error', 'all'],
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'prettier/prettier': 'error',
      'react/forbid-dom-props': ['warn', { forbid: ['style'] }],
      'react-hooks/exhaustive-deps': 'warn',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react/'],
            ['^(?!src/)@?\\w'],
            ['^src/components'],
            ['^src/pages'],
            ['^src/store'],
            ['^src/router'],
            ['^src/api'],
            ['^src/hooks'],
            ['^src/utils'],
            ['^src/constants'],
            ['^src/models'],
            ['\\.css$', '^src/styles'],
            ['^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
