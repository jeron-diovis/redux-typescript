module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:storybook/recommended',
    './.eslint/base.cjs',
    './.eslint/typescript.cjs',
    './.eslint/jsx-control-statements.cjs',
    './.eslint/imports.cjs',
    './.eslint/prettier.cjs',
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
