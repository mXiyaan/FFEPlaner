'use client'

import { PDFTheme, PDFColumnVisibility } from './FFEContext'
import { FFEItem } from '@/types/ffe'
import { createPDFStyles } from './pdf/PDFStyles'
import PDFDocument from './pdf/PDFDocument'

interface PDFPreviewProps {
  items: FFEItem[]
  theme: PDFTheme
  columnVisibility: PDFColumnVisibility
  projectName: string
  scheduleName: string
  clientName?: string
  organizationName?: string
}

export default function PDFPreview(props: PDFPreviewProps) {
  const styles = createPDFStyles(props.theme)
  return <PDFDocument {...props} styles={styles} />
}