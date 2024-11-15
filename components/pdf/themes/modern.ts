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
    marginBottom: 20,
    width: '100%',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    width: '100%',
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
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginVertical: 10,
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 35,
    alignItems: 'center',
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  cellText: {
    fontSize: 9,
    color: '#1a1a1a',
  },
  image: {
    width: 30,
    height: 30,
    objectFit: 'cover',
    borderRadius: 4,
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
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  coverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 24,
    marginBottom: 10,
    color: '#4a4a4a',
    textAlign: 'center',
  },
  coverInfo: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'center',
  },
})

export default modernTheme