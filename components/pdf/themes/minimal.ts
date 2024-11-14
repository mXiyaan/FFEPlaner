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
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666666',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5E5',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
  },
  text: {
    fontSize: 10,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#666666',
    fontSize: 10,
  },
  coverPage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  coverTitle: {
    fontSize: 36,
    marginBottom: 20,
    color: '#000000',
  },
  coverSubtitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#666666',
  },
  coverInfo: {
    fontSize: 14,
    marginBottom: 8,
    color: '#999999',
  },
})

export default minimalTheme