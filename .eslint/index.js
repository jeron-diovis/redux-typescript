import cfgBase from './base.js'
import cfgImports from './imports.js'
import cfgJsxControlStatements from './jsx-control-statements.js'
import cfgPrettier from './prettier.js'
import cfgReact from './react.js'
import cfgTS from './typescript.js'

export default [
  cfgBase,
  cfgTS,
  cfgReact,
  cfgJsxControlStatements,
  cfgImports,
  cfgPrettier,

  {
    // infrastructure scripts/configs
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
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
