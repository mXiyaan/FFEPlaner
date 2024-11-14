import { Document, Page, View, Text } from '@react-pdf/renderer'
import { FFEItem } from '@/types/ffe'
import { PDFColumnVisibility } from '../FFEContext'
import { PDFStyles } from './types'
import PDFTableHeader from './PDFTableHeader'
import PDFTableRow from './PDFTableRow'

interface PDFDocumentProps {
  items: FFEItem[]
  styles: PDFStyles
  columnVisibility: PDFColumnVisibility
  projectName: string
  scheduleName: string
  clientName?: string
  organizationName?: string
}

const ORGANIZATION_NAME = "Acme Design Studio"

const groupItemsByCategory = (items: FFEItem[]) => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, FFEItem[]>)
}

export default function PDFDocument({ 
  items, 
  styles, 
  columnVisibility, 
  projectName, 
  scheduleName,
  clientName,
  organizationName = ORGANIZATION_NAME
}: PDFDocumentProps) {
  const groupedItems = groupItemsByCategory(items)

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A3" orientation="landscape" style={styles.page}>
        <View style={styles.coverContainer}>
          <Text style={styles.coverTitle}>{projectName}</Text>
          <Text style={styles.coverSubtitle}>{scheduleName}</Text>
          {clientName && (
            <Text style={styles.coverInfo}>Client: {clientName}</Text>
          )}
          <Text style={styles.coverOrg}>{organizationName}</Text>
        </View>
      </Page>

      {/* Content Pages */}
      <Page size="A3" orientation="landscape" style={styles.page}>
        <Text style={styles.header}>{projectName}</Text>
        <Text style={styles.subheader}>{scheduleName}</Text>

        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <View key={category}>
            <Text style={styles.categoryHeader}>{category}</Text>
            <View style={styles.table}>
              <PDFTableHeader columnVisibility={columnVisibility} styles={styles} />
              {categoryItems.map(item => (
                <PDFTableRow 
                  key={item.id} 
                  item={item} 
                  columnVisibility={columnVisibility} 
                  styles={styles} 
                />
              ))}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
}