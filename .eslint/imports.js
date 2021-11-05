module.exports = {
  settings: {
    // Fix recognition of 'external' module type for 'import/order' rule
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },

  rules: {
    'import/newline-after-import': 'warn',

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
  },
}
