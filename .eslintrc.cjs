module.exports = {
  parser: '@typescript-eslint/parser',

  settings: {
    react: {
      version: 'detect',
    },
  },

  extends: [
    'eslint:recommended',
    'plugin:storybook/recommended',
    './.eslint/index.cjs',
  ],

  overrides: [
    {
      /* infrastructure scripts/configs */
      files: ['!src/**'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['src/**/*.test.*'],
      rules: {
        'no-console': 'off',
      },
    },

    {
      files: ['**/*.js'],
      rules: {
        'no-undef': 'error',
      },
    },
  ],
}
