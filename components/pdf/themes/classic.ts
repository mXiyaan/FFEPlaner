import { StyleSheet } from '@react-pdf/renderer'
import { PDFStyleSheet } from '../types'

const classicTheme: PDFStyleSheet = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    minHeight: 35,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#E5E5E5',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    borderRightWidth: 1,
    borderRightColor: '#000000',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
  },
  text: {
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
  coverPage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderWidth: 4,
    borderColor: '#000000',
    margin: 20,
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  coverSubtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  coverInfo: {
    fontSize: 14,
    marginBottom: 8,
  },
})

export default classicTheme