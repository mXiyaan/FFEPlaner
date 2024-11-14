import React from 'react'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import { PDFDocumentProps } from '../types'
import PDFTable from './PDFTable'
import { defaultPageConfig } from '../config/setup'

const PDFDocument: React.FC<PDFDocumentProps> = ({
  items,
  theme,
  columnVisibility,
  projectName,
  scheduleName,
  clientName,
  organizationName = 'Acme Design Studio',
}) => {
  const groupItemsByCategory = (items: typeof items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    }, {} as Record<string, typeof items>)
  }

  const groupedItems = groupItemsByCategory(items)

  return (
    <Document>
      {/* Cover Page */}
      <Page {...defaultPageConfig} style={theme.page}>
        <View style={theme.coverPage}>
          <Text style={theme.coverTitle}>{projectName}</Text>
          <Text style={theme.coverSubtitle}>{scheduleName}</Text>
          {clientName && (
            <Text style={theme.coverInfo}>Client: {clientName}</Text>
          )}
          <Text style={theme.footer}>{organizationName}</Text>
        </View>
      </Page>

      {/* Content Pages */}
      <Page {...defaultPageConfig} style={theme.page}>
        <View style={theme.header}>
          <Text style={theme.title}>{projectName}</Text>
          <Text style={theme.subtitle}>{scheduleName}</Text>
        </View>

        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <View key={category} style={theme.section}>
            <Text style={theme.subtitle}>{category}</Text>
            <PDFTable
              items={categoryItems}
              columnVisibility={columnVisibility}
              styles={theme}
            />
          </View>
        ))}

        <Text style={theme.footer}>{organizationName}</Text>
      </Page>
    </Document>
  )
}

export default PDFDocument