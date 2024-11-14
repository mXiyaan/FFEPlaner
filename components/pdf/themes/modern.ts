import { StyleSheet } from '@react-pdf/renderer'
import { PDFStyleSheet } from '../types'

const modernTheme: PDFStyleSheet = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#4a4a4a',
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 4,
  },
  text: {
    fontSize: 10,
    color: '#1a1a1a',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 10,
  },
  coverPage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  coverSubtitle: {
    fontSize: 24,
    marginBottom: 10,
    color: '#4a4a4a',
  },
  coverInfo: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
})

export default modernTheme