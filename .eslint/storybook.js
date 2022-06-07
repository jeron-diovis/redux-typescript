const { configs } = require('eslint-plugin-storybook')
module.exports = {
  extends: [
    'plugin:storybook/recommended',
  ],
  overrides: [
    {
      files: ['**/{*.,}stories.*'],
      rules: {
        ...configs.recommended.overrides[0].rules,
      },
    },
  ],
}
