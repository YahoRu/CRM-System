import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended', 'plugin:react/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
])
