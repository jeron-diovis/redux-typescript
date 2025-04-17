import plugin from 'eslint-plugin-jsx-control-statements'
import { mapValues } from 'lodash-es'

export default {
  plugins: {
    'jsx-control-statements': {
      ...plugin,
      rules: mapValues(plugin.rules, rule => {
        /* v9 rules: */
        if (rule.hasOwnProperty('create')) {
          return rule
        }
        /* adopt legacy rules: */
        return { create: rule }
      }),
    },
  },
  rules: {
    ...plugin.configs.recommended.rules,

    // @see https://github.com/vkbansal/eslint-plugin-jsx-control-statements#important
    'react/jsx-no-undef': ['error', { allowGlobals: true }],

    // Don't enforce using <If> / <Choose>, because for simple one-liners,
    // ternary is often much more convenient.
    // Like, {active ? <IconActive />: <IconInactive />}
    'jsx-control-statements/jsx-use-if-tag': 'off',

    // Weird rule, complaining about `module` var in cjs modules.
    'jsx-control-statements/jsx-jcs-no-undef': 'off',
  },
}
