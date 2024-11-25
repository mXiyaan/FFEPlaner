'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, Link } from 'lucide-react'
import { Product, ProductAttachment } from '@/types/product'

export default function AttachmentsTab() {
  const { watch, setValue, formState: { errors } } = useFormContext<Product>()
  const attachments = watch('attachments')

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newAttachments: ProductAttachment[] = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        title: file.name,
        url: URL.createObjectURL(file),
        type: 'file',
        fileSize: file.size,
        fileType: file.type
      }))
      setValue('attachments', [...attachments, ...newAttachments].slice(0, 4))
    }
  }

  const addUrlAttachment = () => {
    const newAttachment: ProductAttachment = {
      id: Math.random().toString(36).substr(2, 9),
      title: '',
      url: '',
      type: 'link'
    }
    setValue('attachments', [...attachments, newAttachment])
  }

  const updateAttachment = (id: string, field: keyof ProductAttachment, value: string) => {
    const updatedAttachments = attachments.map(attachment =>
      attachment.id === id ? { ...attachment, [field]: value } : attachment
    )
    setValue('attachments', updatedAttachments)
  }

  const removeAttachment = (id: string) => {
    setValue('attachments', attachments.filter(attachment => attachment.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Attachments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Files</h3>
          <div className="space-y-4">
            {attachments.filter(a => a.type === 'file').map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <Input
                    value={attachment.title}
                    onChange={(e) => updateAttachment(attachment.id, 'title', e.target.value)}
                    placeholder="File title"
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {attachment.fileType} • {formatFileSize(attachment.fileSize || 0)}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {attachments.filter(a => a.type === 'file').length < 4 && (
              <Label
                htmlFor="fileUpload"
                className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-2 block text-sm font-semibold">
                    Upload Files (Max 4)
                  </span>
                </div>
                <Input
                  id="fileUpload"
                  type="file"
                  multiple
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </Label>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">External Links</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addUrlAttachment}
              disabled={attachments.filter(a => a.type === 'link').length >= 4}
            >
              Add Link
            </Button>
          </div>
          
          <div className="space-y-4">
            {attachments.filter(a => a.type === 'link').map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center space-x-4 p-4 <boltAction type="file" filePath="components/AddNewProductDialog/tabs/AttachmentsTab.tsx">                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <Input
                    value={attachment.title}
                    onChange={(e) => updateAttachment(attachment.id, 'title', e.target.value)}
                    placeholder="Link title"
                  />
                  <div className="flex items-center space-x-2">
                    <Link className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={attachment.url}
                      onChange={(e) => updateAttachment(attachment.id, 'url', e.target.value)}
                      placeholder="Enter URL"
                      type="url"
                    />
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {errors.attachments && (
          <p className="text-sm text-destructive">{errors.attachments.message}</p>
        )}
      </CardContent>
    </Card>
  )
}