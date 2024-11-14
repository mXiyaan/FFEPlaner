'use client'

import { PDFViewer, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer'
import { FFEItem } from '@/types/ffe'
import { PDFTheme, PDFColumnVisibility } from './FFEContext'

interface PDFPreviewProps {
  items: FFEItem[]
  theme: PDFTheme
  columnVisibility: PDFColumnVisibility
  projectName: string
  scheduleName: string
  clientName?: string
  organizationName?: string
}

const ORGANIZATION_NAME = "Acme Design Studio"

// Group items by category
const groupItemsByCategory = (items: FFEItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, FFEItem[]>)
}

const styles = {
  modern: StyleSheet.create({
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
      fontWeight: 'bold',
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
      fontWeight: 'bold',
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
      fontWeight: 'bold',
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
    tableCell: {
      padding: 8,
      fontSize: 10,
      textAlign: 'left',
    },
    imageCellContainer: {
      width: '8%',
      height: 80,
      padding: 8,
    },
    productCodeCell: {
      width: '8%',
    },
    nameCell: {
      width: '12%',
    },
    productCell: {
      width: '12%',
    },
    brandCell: {
      width: '8%',
    },
    dimensionsCell: {
      width: '10%',
    },
    materialCell: {
      width: '8%',
    },
    finishCell: {
      width: '8%',
    },
    quantityCell: {
      width: '5%',
    },
    priceCell: {
      width: '7%',
    },
    totalPriceCell: {
      width: '7%',
    },
    leadTimeCell: {
      width: '7%',
    },
    image: {
      width: 60,
      height: 60,
      objectFit: 'cover',
    },
  }),
  classic: StyleSheet.create({
    // ... same structure as modern but with classic styling
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
      borderWidth: 2,
      borderColor: '#000000',
      margin: 40,
    },
    coverTitle: {
      fontSize: 48,
      marginBottom: 20,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    coverSubtitle: {
      fontSize: 24,
      marginBottom: 16,
      color: '#333333',
      textAlign: 'center',
    },
    coverInfo: {
      fontSize: 18,
      marginBottom: 12,
      color: '#444444',
      textAlign: 'center',
    },
    coverOrg: {
      position: 'absolute',
      bottom: 60,
      fontSize: 16,
      color: '#666666',
    },
    header: {
      fontSize: 24,
      marginBottom: 20,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subheader: {
      fontSize: 16,
      marginBottom: 30,
      color: '#333333',
      textAlign: 'center',
    },
    categoryHeader: {
      fontSize: 18,
      marginTop: 20,
      marginBottom: 10,
      color: '#000000',
      fontWeight: 'bold',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      paddingBottom: 5,
    },
    table: {
      display: 'flex',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      minHeight: 80,
      alignItems: 'center',
    },
    tableHeader: {
      backgroundColor: '#FFFFFF',
      minHeight: 40,
      borderBottomWidth: 2,
    },
    tableCell: {
      padding: 8,
      fontSize: 10,
      textAlign: 'left',
      borderRightWidth: 1,
      borderRightColor: '#000000',
    },
    imageCellContainer: {
      width: '8%',
      height: 80,
      padding: 8,
      borderRightWidth: 1,
      borderRightColor: '#000000',
    },
    productCodeCell: {
      width: '8%',
    },
    nameCell: {
      width: '12%',
    },
    productCell: {
      width: '12%',
    },
    brandCell: {
      width: '8%',
    },
    dimensionsCell: {
      width: '10%',
    },
    materialCell: {
      width: '8%',
    },
    finishCell: {
      width: '8%',
    },
    quantityCell: {
      width: '5%',
    },
    priceCell: {
      width: '7%',
    },
    totalPriceCell: {
      width: '7%',
    },
    leadTimeCell: {
      width: '7%',
    },
    image: {
      width: 60,
      height: 60,
      objectFit: 'cover',
    },
  }),
  minimal: StyleSheet.create({
    // ... same structure as modern but with minimal styling
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
      fontSize: 42,
      marginBottom: 20,
      color: '#333333',
    },
    coverSubtitle: {
      fontSize: 21,
      marginBottom: 16,
      color: '#666666',
    },
    coverInfo: {
      fontSize: 16,
      marginBottom: 12,
      color: '#888888',
    },
    coverOrg: {
      position: 'absolute',
      bottom: 60,
      fontSize: 14,
      color: '#999999',
    },
    header: {
      fontSize: 20,
      marginBottom: 15,
      color: '#333333',
    },
    subheader: {
      fontSize: 14,
      marginBottom: 25,
      color: '#666666',
    },
    categoryHeader: {
      fontSize: 16,
      marginTop: 20,
      marginBottom: 10,
      color: '#333333',
    },
    table: {
      display: 'flex',
      width: 'auto',
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: '#E5E7EB',
      minHeight: 80,
      alignItems: 'center',
    },
    tableHeader: {
      backgroundColor: '#FFFFFF',
      minHeight: 40,
    },
    tableCell: {
      padding: 8,
      fontSize: 10,
      textAlign: 'left',
    },
    imageCellContainer: {
      width: '8%',
      height: 80,
      padding: 8,
    },
    productCodeCell: {
      width: '8%',
    },
    nameCell: {
      width: '12%',
    },
    productCell: {
      width: '12%',
    },
    brandCell: {
      width: '8%',
    },
    dimensionsCell: {
      width: '10%',
    },
    materialCell: {
      width: '8%',
    },
    finishCell: {
      width: '8%',
    },
    quantityCell: {
      width: '5%',
    },
    priceCell: {
      width: '7%',
    },
    totalPriceCell: {
      width: '7%',
    },
    leadTimeCell: {
      width: '7%',
    },
    image: {
      width: 60,
      height: 60,
      objectFit: 'cover',
    },
  }),
}

export default function PDFPreview({ 
  items, 
  theme, 
  columnVisibility, 
  projectName, 
  scheduleName,
  clientName,
  organizationName = ORGANIZATION_NAME
}: PDFPreviewProps) {
  const currentStyles = styles[theme]
  const groupedItems = groupItemsByCategory(items)

  const getCellStyle = (column: string) => {
    const baseStyle = currentStyles.tableCell
    switch (column) {
      case 'image':
        return currentStyles.imageCellContainer
      case 'productCode':
        return { ...baseStyle, ...currentStyles.productCodeCell }
      case 'name':
        return { ...baseStyle, ...currentStyles.nameCell }
      case 'product':
        return { ...baseStyle, ...currentStyles.productCell }
      case 'brand':
        return { ...baseStyle, ...currentStyles.brandCell }
      case 'dimensions':
        return { ...baseStyle, ...currentStyles.dimensionsCell }
      case 'material':
        return { ...baseStyle, ...currentStyles.materialCell }
      case 'finish':
        return { ...baseStyle, ...currentStyles.finishCell }
      case 'quantity':
        return { ...baseStyle, ...currentStyles.quantityCell }
      case 'price':
        return { ...baseStyle, ...currentStyles.priceCell }
      case 'totalPrice':
        return { ...baseStyle, ...currentStyles.totalPriceCell }
      case 'leadTime':
        return { ...baseStyle, ...currentStyles.leadTimeCell }
      default:
        return baseStyle
    }
  }

  const getColumnHeader = (key: string) => {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
  }

  const renderTableHeader = () => (
    <View style={[currentStyles.tableRow, currentStyles.tableHeader]}>
      {Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([column]) => (
          <View key={column} style={getCellStyle(column)}>
            <Text>{getColumnHeader(column)}</Text>
          </View>
        ))}
    </View>
  )

  const renderTableRow = (item: FFEItem) => (
    <View key={item.id} style={currentStyles.tableRow}>
      {Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([column]) => (
          <View key={column} style={getCellStyle(column)}>
            {column === 'image' && item.image ? (
              <Image src={item.image} style={currentStyles.image} />
            ) : (
              <Text>
                {column === 'price' ? `$${item.price.toLocaleString()}` :
                 column === 'totalPrice' ? `$${(item.price * item.quantity).toLocaleString()}` :
                 (item as any)[column]?.toString() || ''}
              </Text>
            )}
          </View>
        ))}
    </View>
  )

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A3" orientation="landscape" style={currentStyles.page}>
        <View style={currentStyles.coverContainer}>
          <Text style={currentStyles.coverTitle}>{projectName}</Text>
          <Text style={currentStyles.coverSubtitle}>{scheduleName}</Text>
          {clientName && (
            <Text style={currentStyles.coverInfo}>Client: {clientName}</Text>
          )}
          <Text style={currentStyles.coverOrg}>{organizationName}</Text>
        </View>
      </Page>

      {/* Content Pages */}
      <Page size="A3" orientation="landscape" style={currentStyles.page}>
        <Text style={currentStyles.header}>{projectName}</Text>
        <Text style={currentStyles.subheader}>{scheduleName}</Text>

        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <View key={category}>
            <Text style={currentStyles.categoryHeader}>{category}</Text>
            <View style={currentStyles.table}>
              {renderTableHeader()}
              {categoryItems.map(item => renderTableRow(item))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
}