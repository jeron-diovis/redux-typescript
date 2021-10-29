// Guides
// Default export:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// Story args:
// https://storybook.js.org/docs/react/writing-stories/args
// Component templates pattern:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args

module.exports = {
  'stories': [
    '../src/**/@(*.|)stories.mdx',
    '../src/**/@(*.|)stories.@(js|jsx|ts|tsx)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app'
  ],
}
