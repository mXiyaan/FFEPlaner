import { StyleSheet } from '@react-pdf/renderer'
import { PDFStyleSheet } from '../types'

const modernTheme: PDFStyleSheet = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginBottom: 30,
    width: '100%',
  },
  header: {
    marginBottom: 25,
    backgroundColor: '#2C3E50',
    padding: 20,
    borderRadius: 8,
  },
  categoryHeader: {
    backgroundColor: '#34495E',
    padding: 16,
    marginBottom: 15,
    borderRadius: 6,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ECF0F1',
    marginBottom: 5,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 10,
    overflow: 'hidden',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    minHeight: 50,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#2C3E50',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    minHeight: 60,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  tableCell: {
    padding: 12,
    fontSize: 11,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 4,
  },
  text: {
    fontSize: 11,
    color: '#2D3748',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#718096',
    fontSize: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  coverPage: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    backgroundColor: '#FFFFFF',
  },
  coverTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C3E50',
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 28,
    marginBottom: 20,
    color: '#4A5568',
    textAlign: 'center',
  },
  coverInfo: {
    fontSize: 18,
    color: '#718096',
    marginBottom: 12,
    textAlign: 'center',
  },
  // Status badges
  statusBadge: {
    padding: '6 12',
    borderRadius: 16,
    fontSize: 11,
    textAlign: 'center',
    width: 'auto',
    display: 'inline-block',
  },
  statusOrdered: {
    backgroundColor: '#EBF8FF',
    color: '#2B6CB0',
  },
  statusPending: {
    backgroundColor: '#FFFBEB',
    color: '#B45309',
  },
  statusDelivered: {
    backgroundColor: '#F0FDF4',
    color: '#166534',
  },
  // Notes column
  notes: {
    fontSize: 11,
    color: '#718096',
    fontStyle: 'italic',
    lineHeight: 1.4,
  },
  // Specifications column
  specifications: {
    fontSize: 11,
    color: '#4A5568',
    lineHeight: 1.5,
  },
  // Cost columns
  cost: {
    fontSize: 11,
    color: '#2D3748',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  totalCost: {
    fontSize: 11,
    color: '#2D3748',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  // Item code styling
  itemCode: {
    fontSize: 11,
    color: '#4A5568',
    fontWeight: 'medium',
    fontFamily: 'Inter',
  },
})

export default modernTheme