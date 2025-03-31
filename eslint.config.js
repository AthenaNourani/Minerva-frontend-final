import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default [
  { ignores: ['dist', 'node_modules'] }, // Ignoriere auch `node_modules`
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { 
      react: { version: 'detect' } // Automatische Erkennung der React-Version
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin, // Fügt Import-Sortierungsregeln hinzu
    },
    rules: {
      // 🌟 Bestehende Regeln
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // 🚀 Verbessertes React-Handling
      'react/jsx-no-target-blank': 'off', // Ermöglicht `target="_blank"`
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 🔥 Import-Optimierungen
      'import/order': [
        'warn',
        {
          'groups': ['builtin', 'external', 'internal'],
          'newlines-between': 'always',
        },
      ],

      // 📌 Code-Qualitätsverbesserungen
      'no-console': 'warn', // Verhindert übermäßige `console.log`-Nutzung
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignoriert `_` als ungenutzte Variable
      'react/jsx-uses-react': 'off', // Nicht nötig in React 18+
      'react/react-in-jsx-scope': 'off', // Nicht nötig in React 18+

      // ✅ React Hooks Best Practices
      'react-hooks/exhaustive-deps': 'warn', // Warnung, wenn Abhängigkeiten in useEffect fehlen
      'react-hooks/rules-of-hooks': 'error', // Fehler, wenn Hooks falsch benutzt werden
    },
  },
];
