import type { Preview } from '@storybook/react'

import { viewport } from './viewport'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    viewport,
  },
}

export default preview
