import { FFEItem } from '@/types/ffe'

export type PDFTheme = 'modern' | 'classic' | 'minimal'

export interface PDFColumnVisibility {
  image: boolean
  productCode: boolean
  name: boolean
  product: boolean
  brand: boolean
  dimensions: boolean
  material: boolean
  finish: boolean
  quantity: boolean
  unitPrice: boolean
  totalPrice: boolean
  leadTime: boolean
  supplier: boolean
  status: boolean
}

export interface PDFDocumentProps {
  items: FFEItem[]
  theme: PDFStyleSheet
  columnVisibility: PDFColumnVisibility
  projectName: string
  scheduleName: string
  clientName?: string
  organizationName?: string
}

export interface PDFTableProps {
  items: FFEItem[]
  columnVisibility: PDFColumnVisibility
  styles: PDFStyleSheet
}

export interface PDFStyleSheet {
  page: any
  section: any
  header: any
  title: any
  subtitle: any
  table: any
  tableRow: any
  tableHeader: any
  tableCell: any
  image: any
  text: any
  footer: any
  coverPage: any
  coverTitle: any
  coverSubtitle: any
  coverInfo: any
  [key: string]: any
}