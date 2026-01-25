import { defineFormKitConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme.ts'
import { genesisIcons } from '@formkit/icons'

export default defineFormKitConfig({
  config: {
    rootClasses
  },
  icons: {
    ...genesisIcons
  }
})
