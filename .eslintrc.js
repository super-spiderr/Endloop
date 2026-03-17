module.exports = {
  root: true,

  // ─── Parsers & Parser Options ────────────────────────────────────────────────
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    // Enables type-aware lint rules (e.g. no-floating-promises)
    // Uses tsconfig.eslint.json which extends tsconfig.json but also includes
    // JS config files and .eslintrc.js itself to avoid "not included" errors.
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },

  // ─── Environments ────────────────────────────────────────────────────────────
  env: {
    browser: false,
    es2021: true,
    'react-native/react-native': true,
  },

  // ─── Plugins ─────────────────────────────────────────────────────────────────
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],

  // ─── Extends ─────────────────────────────────────────────────────────────────
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // Type-aware rules — catches real bugs via the TypeScript compiler
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    // Must be last — disables ESLint rules that conflict with Prettier
    'prettier',
  ],

  // ─── Settings ────────────────────────────────────────────────────────────────
  settings: {
    react: {
      // Auto-detect React version from package.json
      version: 'detect',
    },
  },

  // ─── Rules ───────────────────────────────────────────────────────────────────
  rules: {
    // React 17+ new JSX transform — no need to import React in every file
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // Prop types are redundant when using TypeScript
    'react/prop-types': 'off',

    // Enforce hooks rules strictly
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // React Native — no inline styles
    'react-native/no-inline-styles': 'warn',
    // Allow platform-specific file extensions
    'react-native/split-platform-components': 'warn',
    // Catch hardcoded colours that should live in your theme
    'react-native/no-color-literals': 'warn',
    // Catch raw strings outside <Text>
    'react-native/no-raw-text': 'error',
    // Unused styles in StyleSheet.create
    'react-native/no-unused-styles': 'warn',

    // TypeScript — stricter than recommended defaults
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    // Prefer optional chaining over manual null checks
    '@typescript-eslint/prefer-optional-chain': 'warn',
    // Prefer nullish coalescing over ||
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    // Warn on unawaited promises
    '@typescript-eslint/no-floating-promises': 'warn',
    // Disallow misused async/await
    '@typescript-eslint/no-misused-promises': 'warn',

    // General best practices
    'no-console': 'warn',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    curly: ['error', 'all'],
  },

  // ─── Overrides ───────────────────────────────────────────────────────────────
  overrides: [
    {
      // Jest test files — relax some rules & enable jest globals
      files: ['**/__tests__/**/*.{ts,tsx}', '**/*.{spec,test}.{ts,tsx}'],
      env: { jest: true },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
    {
      // Plain JS config files at the root (babel, metro, jest, etc.)
      files: ['*.js', '*.config.js'],
      env: { node: true },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        // Config files don't have tsc project context
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
      },
    },
  ],
};
