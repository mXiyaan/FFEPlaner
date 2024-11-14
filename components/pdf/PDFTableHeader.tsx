import { View, Text } from '@react-pdf/renderer'
import { PDFColumnVisibility } from '../FFEContext'

interface PDFTableHeaderProps {
  columnVisibility: PDFColumnVisibility
  styles: Record<string, any>
}

export default function PDFTableHeader({ columnVisibility, styles }: PDFTableHeaderProps) {
  return (
    <View style={[styles.tableRow, styles.tableHeader]}>
      {Object.entries(columnVisibility)
        .filter(([_, isVisible]) => isVisible)
        .map(([column]) => (
          <View 
            key={column} 
            style={[styles.cellBase, styles[`cell${column.charAt(0).toUpperCase() + column.slice(1)}`]]}
          >
            <Text>{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
          </View>
        ))}
    </View>
  )
}