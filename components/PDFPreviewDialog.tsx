'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PDFTheme, PDFColumnVisibility } from './FFEContext'
import { FFEItem } from '@/types/ffe'
import { Download, Loader2 } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
)

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink),
  { ssr: false }
)

const PDFPreview = dynamic(() => import('./PDFPreview'), { ssr: false })

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h2 className="text-lg font-semibold text-red-600 mb-2">Error loading PDF preview</h2>
      <p className="text-sm text-gray-600 text-center">{error.message}</p>
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
  clientName
}: PDFPreviewDialogProps) {
  const handleCheckboxChange = (key: keyof PDFColumnVisibility, checked: boolean) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [key]: checked
    })
  }

  const PreviewDocument = () => (
    <PDFPreview
      items={items}
      theme={theme}
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

            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<Button className="w-full" disabled><Loader2 className="w-4 h-4 mr-2 animate-spin" />Loading...</Button>}>
                <PDFDownloadLink
                  document={<PreviewDocument />}
                  fileName={`${projectName}-${scheduleName}.pdf`}
                >
                  {({ loading, error }) => (
                    <Button className="w-full" disabled={loading}>
                      <Download className="w-4 h-4 mr-2" />
                      {loading ? 'Preparing PDF...' : error ? 'Error' : 'Download PDF'}
                    </Button>
                  )}
                </PDFDownloadLink>
              </Suspense>
            </ErrorBoundary>
          </div>

          <div className="h-full overflow-auto bg-white rounded-lg shadow">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<LoadingSpinner />}>
                <PDFViewer width="100%" height="100%" className="border-0">
                  <PreviewDocument />
                </PDFViewer>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}