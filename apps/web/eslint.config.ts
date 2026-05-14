import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
  ],
  plugins: {
    prettier,
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'simple-import-sort': simpleImportSort,
  },
  languageOptions: {
    globals: globals.browser,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['error', { allow: ['error', 'warn'] }],
    curly: ['error', 'all'],
    'prettier/prettier': 'error',
    'react/forbid-dom-props': ['warn', { forbid: ['style'] }],
    'react-hooks/exhaustive-deps': 'warn',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react$', '^react/'],
          ['^@?\\w'],
          ['^src/components'],
          ['^src/common'],
          ['^src/store'],
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
});
