import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  {
    files: ['./src/**/*.{js,ts,vue}'],
    ignores: ['coverage', 'public/mockServiceWorker.js'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Vue の推奨ルール
      ...vue.configs['vue3-recommended'].rules,

      // TypeScript の推奨ルール
      ...tseslint.configs.recommended.rules,

      'no-console': 'warn',
    },
  },
]
