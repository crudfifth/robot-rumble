import type { Preview } from '@storybook/vue3'
import { worker } from '../src/mocks/browser'
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize()

worker.start() // MSWのモックサーバーを起動

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
}

export default preview
