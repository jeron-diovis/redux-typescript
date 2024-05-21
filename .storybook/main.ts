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
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
