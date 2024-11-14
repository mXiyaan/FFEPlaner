'use client'

import { useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PDFTheme, PDFColumnVisibility } from './FFEContext'
import { FFEItem } from '@/types/ffe'
import { Download } from 'lucide-react'
import type { CheckedState } from '@radix-ui/react-checkbox'

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
  const previewRef = useRef<HTMLDivElement>(null)

  const handleGeneratePDF = async () => {
    if (!previewRef.current) return

    const jsPDF = (await import('jspdf')).default
    const html2canvas = (await import('html2canvas')).default

    const pdf = new jsPDF('l', 'mm', 'a3')
    
    // Add cover page
    pdf.setFontSize(40)
    pdf.text(projectName, 150, 100, { align: 'center' })
    pdf.setFontSize(24)
    pdf.text(scheduleName, 150, 120, { align: 'center' })
    if (clientName) {
      pdf.setFontSize(16)
      pdf.text(`Client: ${clientName}`, 150, 140, { align: 'center' })
    }
    pdf.setFontSize(12)
    pdf.text('Acme Design Studio', 150, 280, { align: 'center' })

    // Add content pages
    const canvas = await html2canvas(previewRef.current)
    const imgData = canvas.toDataURL('image/png')
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 10, 10, 400, 277) // A3 dimensions

    pdf.save(`${projectName}-${scheduleName}.pdf`)
  }

  const handleCheckboxChange = (key: keyof PDFColumnVisibility, checked: CheckedState) => {
    onColumnVisibilityChange({
      ...columnVisibility,
      [key]: checked === true
    })
  }

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
                          handleCheckboxChange(key as keyof PDFColumnVisibility, checked)
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

            <div className="flex space-x-2">
              <Button onClick={handleGeneratePDF} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="h-full overflow-auto">
            <div ref={previewRef} className="p-8">
              {/* ... rest of your preview content ... */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}