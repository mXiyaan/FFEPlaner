'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Product } from '@/types/product'

export default function DetailsTab() {
  const { register, formState: { errors } } = useFormContext<Product>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="modelNumber">Model Number *</Label>
            <Input
              id="modelNumber"
              {...register('modelNumber')}
              placeholder="Enter model number"
            />
            {errors.modelNumber && (
              <p className="text-sm text-destructive">{errors.modelNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand *</Label>
            <Input
              id="brand"
              {...register('brand')}
              placeholder="Enter brand name"
            />
            {errors.brand && (
              <p className="text-sm text-destructive">{errors.brand.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="productUrl">Product URL</Label>
            <Input
              id="productUrl"
              {...register('productUrl')}
              placeholder="Enter product URL"
              type="url"
            />
            {errors.productUrl && (
              <p className="text-sm text-destructive">{errors.productUrl.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter product description"
            rows={5}
          />
          {errors.description && (
            <p className="text-sm text-destructive">{errors.description.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}