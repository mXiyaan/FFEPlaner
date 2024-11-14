import { View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import { FFEItem } from '@/types/ffe'
import { PDFColumnVisibility } from '../FFEContext'

interface PDFTableRowProps {
  item: FFEItem
  columnVisibility: PDFColumnVisibility
  styles: Record<string, any>
}

export default function PDFTableRow({ item, columnVisibility, styles }: PDFTableRowProps) {
  return (
    <View style={styles.tableRow}>
      {Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([column]) => (
          <View 
            key={column} 
            style={[styles.cellBase, styles[`cell${column.charAt(0).toUpperCase() + column.slice(1)}`]]}
          >
            {column === 'image' && item.image ? (
              <Image src={item.image} style={styles.image} />
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
}