const { configs } = require('eslint-plugin-storybook')
module.exports = {
  overrides: [
    {
      files: ['**/{*.,}stories.*'],
      rules: {
        ...configs.recommended.overrides[0].rules,
      },
    },
  ],
}
