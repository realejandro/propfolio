import { defineConfig } from '@chakra-ui/react'

// Define the Chakra UI theme configuration with the correct properties
export const theme = defineConfig({
  // Basic system configuration
  cssVarsPrefix: 'chakra',

  // Global styles to reset and normalize
  globalCss: {
    'html, body': {
      bg: '#f7fafc',
      color: '#1a202c',
    },
  },

  // Define cascading layers for proper styling
  layers: {
    base: 'base',
    tokens: 'tokens',
    recipes: 'recipes',
    reset: 'reset',
  }
}) 