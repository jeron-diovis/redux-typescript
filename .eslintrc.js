module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:jsx-control-statements/recommended',
  ],

  settings: {
    // Fix recognition of "external" module type for "import/order" rule
    'import/external-module-folders': [ 'node_modules', 'node_modules/@types' ]
  },

  rules: {
    'no-duplicate-imports': 'warn',
    'object-shorthand': 'warn',
    'one-var': [ 'error', 'never' ],
    'no-underscore-dangle': [ 'error', {
      'allowAfterThis': true,
    } ],

    'sort-imports': [ 'warn', {
      // Declarations sort will be handled by `import/order` rule
      'ignoreDeclarationSort': true,
    }],

    'import/order': [ 'warn', {
      'newlines-between': 'always',
      'alphabetize': { order: 'asc' },
      'pathGroupsExcludedImportTypes': [ 'builtin' ],
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'pathGroups': [
        {
          'pattern': '*{react,redux}*',
          'group': 'external',
          'position': 'before',
        },
        {
          'pattern': '@material-ui/**',
          'group': 'external',
          'position': 'before',
        },
        {
          'pattern': 'src/**',
          'group': 'external',
          'position': 'after',
        },
        {
          'pattern': '{./,../,}**.{s,}css',
          'group': 'sibling',
          'position': 'after',
        },
      ]
    }],

    // ---
    // Support jsx-control-statements.
    // @see https://github.com/vkbansal/eslint-plugin-jsx-control-statements#important
    "react/jsx-no-undef": [ "error", { "allowGlobals": true } ],
    // Don't enforce using <If> / <Choose>, because for simple one-liners, ternary is often much more convenient.
    // Like, {active ? <IconActive /> : <IconInactive />}
    "jsx-control-statements/jsx-use-if-tag": "off",
    // This rule doesn't work with typescript.
    // It reports code like `ReturnType<typeof something>` as `'something' is not defined`.
    "jsx-control-statements/jsx-jcs-no-undef": "off",

  }
}
