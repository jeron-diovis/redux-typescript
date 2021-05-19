module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:jsx-control-statements/recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  settings: {
    // Fix recognition of 'external' module type for 'import/order' rule
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },

  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-duplicate-imports': 'warn',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
    'no-underscore-dangle': [
      'error',
      {
        allowAfterThis: true,
      },
    ],

    // ---
    // @typescript-eslint config tweaks
    '@typescript-eslint/no-empty-interface': [
      'warn',
      {
        allowSingleExtends: true,
      },
    ],
    // Pointless rule. no-op funcs can be used pretty often
    '@typescript-eslint/no-empty-function': 'off',
    // It's a good rule, and it's worth to try to follow it –
    // but using it completely nullifies all the benefits from type inference.
    // Manually declaring return types for wrappers around 3-party library helpers can be quite complicated –
    // like, return type of _.debounce, or some redux-toolkit helpers, etc.
    // It quickly becomes way too time-consuming, with not so much benefit.
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Explicit `any` often may be needed for generic helpers.
    // Especially when working with complex 3-party types. `unknown` is just not enough there.
    // But that cases are still exceptions. Normally, explicit `any` in your code is a vulnerability.
    // So it's would be better to manually disable linter for some specific line, rather than allow `any` everywhere.
    '@typescript-eslint/no-explicit-any': [
      'warn',
      {
        ignoreRestArgs: true,
      },
    ],

    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        // In very rare cases, suppressing errors may be needed.
        // But never just ignore, always require some explanation.
        'ts-expect-error': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],

    // ---
    // imports
    'sort-imports': [
      'warn',
      {
        // Declarations sort will be handled by `import/order` rule
        ignoreDeclarationSort: true,
      },
    ],

    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: '*{react,redux}*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@material-ui/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '{./,../,}**.{s,}css',
            group: 'sibling',
            position: 'after',
          },
        ],
      },
    ],

    // Deny to create dozens of imports from material-ui (line per component). Force imports grouping.
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '@material-ui/core/*',
          '@material-ui/icons/*',
          '@material-ui/styles/*',
          '!@material-ui/core/colors',
          '!@material-ui/core/styles',
        ],
      },
    ],

    // ---
    // Support jsx-control-statements.
    // @see https://github.com/vkbansal/eslint-plugin-jsx-control-statements#important
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    // Don't enforce using <If> / <Choose>, because for simple one-liners, ternary is often much more convenient.
    // Like, {active ? <IconActive /> : <IconInactive />}
    'jsx-control-statements/jsx-use-if-tag': 'off',
    // This rule doesn't work with typescript.
    // It reports code like `ReturnType<typeof something>` as `'something' is not defined`.
    'jsx-control-statements/jsx-jcs-no-undef': 'off',
  },
}
