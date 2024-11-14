import React from 'react'
import { View, Text, Image } from '@react-pdf/renderer'
import { FFEItem } from '@/types/ffe'
import { PDFColumnVisibility } from '../types'

interface PDFTableProps {
  items: FFEItem[]
  columnVisibility: PDFColumnVisibility
  styles: any
}

const PDFTable: React.FC<PDFTableProps> = ({ items, columnVisibility, styles }) => {
  const renderHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader]}>
      {Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([column]) => (
          <View key={column} style={styles.tableCell}>
            <Text>{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
          </View>
        ))}
    </View>
  )

  const renderRow = (item: FFEItem) => (
    <View key={item.id} style={styles.tableRow}>
      {Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([column]) => (
          <View key={column} style={styles.tableCell}>
            {column === 'image' && item.image ? (
              <Image src={item.image} style={styles.image} />
            ) : (
              <Text>
                {column === 'unitPrice' ? `$${item.price.toLocaleString()}` :
                 column === 'totalPrice' ? `$${(item.price * item.quantity).toLocaleString()}` :
                 (item as any)[column]?.toString() || ''}
              </Text>
            )}
          </View>
        ))}
    </View>
  )

  return (
    <View style={styles.table}>
      {renderHeader()}
      {items.map(renderRow)}
    </View>
  )
}

export default PDFTable