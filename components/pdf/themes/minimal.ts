import { StyleSheet } from '@react-pdf/renderer'
import { PDFStyleSheet } from '../types'

const minimalTheme: PDFStyleSheet = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: '1px solid #EAEAEA',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#111827',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#6B7280',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    border: '1px solid #F3F4F6',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    borderBottomStyle: 'solid',
    minHeight: 40,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    padding: 12,
    fontSize: 10,
    color: '#374151',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    color: '#4B5563',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 9,
    paddingTop: 10,
    borderTop: '1px solid #F3F4F6',
  },
  coverPage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  coverTitle: {
    fontSize: 36,
    marginBottom: 20,
    color: '#111827',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 20,
    marginBottom: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  coverInfo: {
    fontSize: 14,
    marginBottom: 8,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  cellText: {
    fontSize: 10,
    color: '#4B5563',
  },
  // Status-specific styles
  statusOrdered: {
    color: '#059669', // Green
    fontWeight: 'medium',
  },
  statusPending: {
    color: '#D97706', // Yellow
    fontWeight: 'medium',
  },
  statusCancelled: {
    color: '#DC2626', // Red
    fontWeight: 'medium',
  },
})

export default minimalTheme