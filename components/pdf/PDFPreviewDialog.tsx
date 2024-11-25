'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PDFTheme, PDFColumnVisibility } from './types'
import { FFEItem } from '@/types/ffe'
import { Download, Loader2 } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import PDFDocument from './components/PDFDocument'
import modernTheme from './themes/modern'
import classicTheme from './themes/classic'
import minimalTheme from './themes/minimal'

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
)

function PDFPreview({ document }: { document: React.ReactElement }) {
  return (
    <PDFViewer width="100%" height="100%" className="border-0">
      {document}
    </PDFViewer>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading PDF preview...</span>
    </div>
  )
}

interface PDFPreviewDialogProps {
  isOpen: boolean
  onClose: () => void
  theme: PDFTheme
  onThemeChange: (theme: PDFTheme) => void
  columnVisibility: PDFColumnVisibility
  onColumnVisibilityChange: (visibility: PDFColumnVisibility) => void
  items: FFEItem[]
  projectName: string
  scheduleName: string
  clientName?: string
}

const getThemeStyles = (theme: PDFTheme) => {
  switch (theme) {
    case 'classic': return classicTheme
    case 'minimal': return minimalTheme
    default: return modernTheme
  }
}

export default function PDFPreviewDialog({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  columnVisibility,
  onColumnVisibilityChange,
  items,
  projectName,
  scheduleName,
  clientName,
}: PDFPreviewDialogProps) {
  if (!isOpen) return null

  const themeStyles = getThemeStyles(theme)

  const handleCheckboxChange = (key: keyof PDFColumnVisibility, checked: boolean) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [key]: checked
    })
  }

  const pdfDocument = (
    <PDFDocument
      items={items}
      theme={themeStyles}
      columnVisibility={columnVisibility}
      projectName={projectName}
      scheduleName={scheduleName}
      clientName={clientName}
    />
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[300px,1fr] gap-4 h-full">
          <div className="space-y-4 border-r pr-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={onThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Visible Columns</Label>
              <ScrollArea className="h-[400px] border rounded-md p-4">
                <div className="space-y-2">
                  {Object.entries(columnVisibility).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange(key as keyof PDFColumnVisibility, checked as boolean)
                        }
                      />
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="h-full overflow-auto bg-white rounded-lg shadow">
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <h3 className="text-lg font-semibold mb-2">Error Loading PDF Preview</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {error.message}
                  </p>
                  <Button onClick={resetErrorBoundary}>Try Again</Button>
                </div>
              )}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <PDFPreview document={pdfDocument} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}