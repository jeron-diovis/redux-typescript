import type { StorybookConfig } from '@storybook/react-vite'

const storiesPattern = '**/@(*.|)stories.@(js|jsx|mjs|ts|tsx)'

const config: StorybookConfig = {
  stories: [
    `../src/${storiesPattern}`,
    '../src/**/*.mdx',
    './example/**/*.mdx',
    `./example/${storiesPattern}`,
  ],

  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
