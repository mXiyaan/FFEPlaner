import { Font } from '@react-pdf/renderer'

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { 
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      fontWeight: 'normal'
    },
    { 
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
      fontWeight: 'bold'
    }
  ]
})

// Configure default page size and platform
export const defaultPageConfig = {
  size: 'A3',
  orientation: 'landscape'
} as const