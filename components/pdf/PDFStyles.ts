import { StyleSheet } from '@react-pdf/renderer'

export const createPDFStyles = (theme: 'modern' | 'classic' | 'minimal') => {
  const baseStyles = {
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 40,
    },
    coverContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
    },
    coverTitle: {
      fontSize: 48,
      marginBottom: 20,
      color: '#1a1a1a',
    },
    coverSubtitle: {
      fontSize: 24,
      marginBottom: 16,
      color: '#4a4a4a',
    },
    coverInfo: {
      fontSize: 18,
      marginBottom: 12,
      color: '#666666',
    },
    coverOrg: {
      position: 'absolute',
      bottom: 60,
      fontSize: 16,
      color: '#888888',
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      color: '#1a1a1a',
    },
    subheader: {
      fontSize: 16,
      marginBottom: 30,
      color: '#4a4a4a',
    },
    categoryHeader: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
      color: '#1a1a1a',
    },
    table: {
      display: 'flex',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
      minHeight: 80,
      alignItems: 'center',
    },
    tableHeader: {
      backgroundColor: '#F9FAFB',
      minHeight: 40,
    },
    cellBase: {
      padding: 8,
      fontSize: 10,
    },
    image: {
      width: 60,
      height: 60,
      objectFit: 'cover',
    },
    cellImage: { width: '8%' },
    cellCode: { width: '8%' },
    cellName: { width: '12%' },
    cellProduct: { width: '12%' },
    cellBrand: { width: '8%' },
    cellDimensions: { width: '10%' },
    cellMaterial: { width: '8%' },
    cellFinish: { width: '8%' },
    cellQuantity: { width: '5%' },
    cellPrice: { width: '7%' },
    cellTotal: { width: '7%' },
    cellLeadTime: { width: '7%' },
  }

  // Theme-specific modifications could be added here
  switch (theme) {
    case 'classic':
      return StyleSheet.create({
        ...baseStyles,
        // Add classic theme overrides
      })
    case 'minimal':
      return StyleSheet.create({
        ...baseStyles,
        // Add minimal theme overrides
      })
    default:
      return StyleSheet.create(baseStyles)
  }
}