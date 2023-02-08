module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',

    './.eslint/typescript.cjs',
    './.eslint/imports.cjs',
    './.eslint/prettier.cjs',
  ],

  // This just suppresses warning from react-app config of 'react is not installed'.
  // Basically, the whole eslint-config-react-app is excessive for backend app. Should switch to smth more compact.
  settings: { react: { version: '>=18.0.0' } },

  rules: {
    'no-unreachable': 'warn',
    'no-var': 'error',
    'prefer-const': 'warn',
    'no-param-reassign': [
      'error',
      {
        // Allow to modify props. Mostly, to support immer producers.
        props: false,
      },
    ],
    'no-duplicate-imports': 'warn',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],
    'prefer-arrow-callback': [
      'warn',
      {
        allowUnboundThis: false,
        allowNamedFunctions: true,
      },
    ],

    'no-nested-ternary': 'warn',
    'no-unneeded-ternary': 'warn',
  },

  overrides: [
    /* infrastructure scripts/configs */
    {
      files: ['!src/**/*.{cjs,js,ts}'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
}
