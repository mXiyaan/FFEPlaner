'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X } from 'lucide-react'
import { Product, ProductImage } from '@/types/product'

export default function ImagesTab() {
  const { watch, setValue, formState: { errors } } = useFormContext<Product>()
  const images = watch('images')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: ProductImage[] = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        alt: file.name,
        isPrimary: images.length === 0 // First image is primary by default
      }))
      setValue('images', [...images, ...newImages].slice(0, 7)) // Limit to 7 images
    }
  }

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id)
    setValue('images', updatedImages)
  }

  const setPrimaryImage = (id: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === id
    }))
    setValue('images', updatedImages)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <img 
                src={image.url} 
                alt={image.alt} 
                className={`w-full h-40 object-cover rounded-md ${image.isPrimary ? 'ring-2 ring-primary' : ''}`}
              />
              <div className="absolute top-2 right-2 space-x-2">
                {!image.isPrimary && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPrimaryImage(image.id)}
                  >
                    Set as Main
                  </Button>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeImage(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {image.isPrimary && (
                <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs">
                  Main Image
                </span>
              )}
            </div>
          ))}
        </div>

        {images.length < 7 && (
          <Label 
            htmlFor="imageUpload" 
            className="cursor-pointer mt-4 flex items-center justify-center w-full h-40 border-2 border-dashed rounded-md"
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold">
                Upload Images (Max 7)
              </span>
            </div>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={handleImageUpload}
            />
          </Label>
        )}

        {errors.images && (
          <p className="text-sm text-destructive mt-2">{errors.images.message}</p>
        )}
      </CardContent>
    </Card>
  )
}