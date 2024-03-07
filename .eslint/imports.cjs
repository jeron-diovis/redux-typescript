module.exports = {
  settings: {
    // Fix recognition of 'external' module type for 'import/order' rule
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },

  rules: {
    'import/newline-after-import': 'warn',

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          /* Stories have nothing to do with production build/env, so they can safely use dev deps. */
          '**/{*.,}stories.{j,t}s{x,}',
          /* storybook configs */
          '.storybook/**/*',
          /* tests */
          '**/*.test.ts{x,}',
          /* vite configs */
          '.vite/*',
          /* whatever other 'rc' config files */
          '.*rc.{c,}{j,t}s',
        ],
      },
    ],

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
            // This is for vite.config-related files
            pattern: '*{vite,esbuild,rollup}*{/**,}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '*{react,redux}*{/**,}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@mui/**',
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

    // Deny to create dozens of imports from mui (line per component). Force imports grouping.
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '@mui/material/*',
          '@mui/material/styles/*',
          '@mui/icons-material/*',
          '!@mui/material/colors',
          '!@mui/material/styles',
        ],
      },
    ],
  },
}
