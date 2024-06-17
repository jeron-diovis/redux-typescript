module.exports = {
  extends: ['plugin:jsx-control-statements/recommended'],

  rules: {
    // @see https://github.com/vkbansal/eslint-plugin-jsx-control-statements#important
    'react/jsx-no-undef': ['error', { allowGlobals: true }],

    // Don't enforce using <If> / <Choose>, because for simple one-liners, ternary is often much more convenient.
    // Like, {active ? <IconActive /> : <IconInactive />}
    'jsx-control-statements/jsx-use-if-tag': 'off',

    // Weird rule, complaining about `module` var in cjs modules.
    'jsx-control-statements/jsx-jcs-no-undef': 'off',
  },
}
