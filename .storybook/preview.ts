import type { Preview } from '@storybook/react'

//____________Import where Bulma file path below____________

import '../client/styles/main.scss'

import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/js/all.min.js'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
