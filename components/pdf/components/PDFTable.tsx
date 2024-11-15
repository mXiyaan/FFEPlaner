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
  const visibleColumns = Object.entries(columnVisibility)
    .filter(([_, isVisible]) => isVisible)
    .map(([column]) => column)

  const columnWidths: Record<string, string> = {
    image: '10%',
    productCode: '8%',
    name: '12%',
    product: '12%',
    brand: '8%',
    dimensions: '10%',
    material: '8%',
    finish: '8%',
    quantity: '6%',
    unitPrice: '6%',
    totalPrice: '6%',
    leadTime: '8%',
    supplier: '8%',
    status: '6%'
  }

  const getColumnStyle = (column: string) => ({
    ...styles.tableCell,
    width: columnWidths[column],
    flexShrink: 1,
    flexGrow: 0
  })

  const renderHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader]} wrap={false}>
      {visibleColumns.map(column => (
        <View key={column} style={getColumnStyle(column)}>
          <Text style={styles.headerText}>
            {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
          </Text>
        </View>
      ))}
    </View>
  )

  const renderRow = (item: FFEItem) => (
    <View key={item.id} style={styles.tableRow} wrap={false}>
      {visibleColumns.map(column => (
        <View key={column} style={getColumnStyle(column)}>
          {column === 'image' && item.image ? (
            <Image src={item.image} style={styles.image} />
          ) : (
            <Text style={styles.cellText}>
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