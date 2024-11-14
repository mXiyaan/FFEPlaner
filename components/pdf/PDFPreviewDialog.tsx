import React, { Suspense, useEffect } from 'react'
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
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './components/PDFDocument'
import modernTheme from './themes/modern'
import classicTheme from './themes/classic'
import minimalTheme from './themes/minimal'
import './config/setup'

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
    case 'classic':
      return classicTheme
    case 'minimal':
      return minimalTheme
    default:
      return modernTheme
  }
}

const PDFPreview = dynamic(() => Promise.resolve(PDFDocument), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ),
})

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
  const handleCheckboxChange = (key: keyof PDFColumnVisibility, checked: boolean) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [key]: checked
    })
  }

  const themeStyles = getThemeStyles(theme)

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

            <PDFDownloadLink
              document={
                <PDFDocument
                  items={items}
                  theme={themeStyles}
                  columnVisibility={columnVisibility}
                  projectName={projectName}
                  scheduleName={scheduleName}
                  clientName={clientName}
                />
              }
              fileName={`${projectName}-${scheduleName}.pdf`}
            >
              {({ loading }) => (
                <Button className="w-full" disabled={loading}>
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? 'Preparing PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>

          <div className="h-full overflow-auto bg-white rounded-lg shadow">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            }>
              <PDFViewer width="100%" height="100%" className="border-0">
                <PDFDocument
                  items={items}
                  theme={themeStyles}
                  columnVisibility={columnVisibility}
                  projectName={projectName}
                  scheduleName={scheduleName}
                  clientName={clientName}
                />
              </PDFViewer>
            </Suspense>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}