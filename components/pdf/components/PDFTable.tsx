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
    image: '8%',
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
    status: '8%',
    notes: '10%'
  }

  const getColumnStyle = (column: string) => ({
    ...styles.tableCell,
    width: columnWidths[column],
    flexShrink: 0,
    flexGrow: 0,
    justifyContent: column === 'status' ? 'center' : 'flex-start',
    alignItems: 'center'
  })

  const renderHeader = () => (
    <View style={[styles.tableRow, styles.tableHeader]} wrap={false}>
      {visibleColumns.map(column => (
        <View key={column} style={getColumnStyle(column)}>
          <Text style={styles.tableHeaderText}>
            {column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
          </Text>
        </View>
      ))}
    </View>
  )

  const renderCell = (item: FFEItem, column: string) => {
    if (column === 'image' && item.image) {
      return <Image src={item.image} style={styles.image} />
    }

    if (column === 'status') {
      return (
        <View style={[
          styles.statusBadge,
          styles[`status${item.status.replace(/\s+/g, '')}`]
        ]}>
          <Text>{item.status}</Text>
        </View>
      )
    }

    if (column === 'unitPrice') {
      return <Text style={styles.cost}>${item.price.toLocaleString()}</Text>
    }

    if (column === 'totalPrice') {
      return <Text style={styles.totalCost}>${(item.price * item.quantity).toLocaleString()}</Text>
    }

    if (column === 'notes') {
      return <Text style={styles.notes}>{item.notes}</Text>
    }

    return (
      <Text style={column === 'productCode' ? styles.itemCode : styles.text}>
        {(item as any)[column]?.toString() || ''}
      </Text>
    )
  }

  const renderRow = (item: FFEItem) => (
    <View key={item.id} style={styles.tableRow} wrap={false}>
      {visibleColumns.map(column => (
        <View key={column} style={getColumnStyle(column)}>
          {renderCell(item, column)}
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