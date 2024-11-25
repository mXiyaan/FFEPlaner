'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from '@/types/product'

export default function SpecificationsTab() {
  const { register, formState: { errors } } = useFormContext<Product>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions *</Label>
            <Input
              id="dimensions"
              {...register('specifications.dimensions')}
              placeholder="W x D x H (mm)"
            />
            {errors.specifications?.dimensions && (
              <p className="text-sm text-destructive">
                {errors.specifications.dimensions.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight *</Label>
            <Input
              id="weight"
              {...register('specifications.weight')}
              placeholder="Enter weight (kg)"
            />
            {errors.specifications?.weight && (
              <p className="text-sm text-destructive">
                {errors.specifications.weight.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}