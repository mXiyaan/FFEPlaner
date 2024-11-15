'use client'

import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import PDFDocument from './PDFDocument'
import { PDFDocumentProps } from '../types'

export default function PDFPreview(props: PDFDocumentProps) {
  return (
    <PDFViewer width="100%" height="100%" className="border-0">
      <PDFDocument {...props} />
    </PDFViewer>
  )
}