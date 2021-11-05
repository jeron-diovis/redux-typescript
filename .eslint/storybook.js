module.exports = {
  overrides: [
    {
      files: ['**/{*.,}stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
}
