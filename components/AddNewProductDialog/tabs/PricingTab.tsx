'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Product } from '@/types/product'

interface PricingTabProps {
  onSubmit: () => void
}

export default function PricingTab({ onSubmit }: PricingTabProps) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<Product>()
  
  const pricing = watch('pricing')
  const { isTaxable, supplierPrice, markupType, markupAmount } = pricing

  const calculateFinalPrice = () => {
    let finalPrice = supplierPrice
    
    if (markupType === 'percentage') {
      finalPrice += supplierPrice * (markupAmount / 100)
    } else {
      finalPrice += markupAmount
    }

    if (isTaxable && pricing.taxRate) {
      finalPrice += finalPrice * (pricing.taxRate / 100)
    }

    setValue('pricing.finalPrice', Number(finalPrice.toFixed(2)))
    return finalPrice
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isTaxable"
              checked={isTaxable}
              onCheckedChange={(checked) => setValue('pricing.isTaxable', checked === true)}
            />
            <Label htmlFor="isTaxable">Product is taxable</Label>
          </div>

          {isTaxable && (
            <div className="space-y-2">
              <Label>Tax Rate (%)</Label>
              <Input
                type="number"
                {...register('pricing.taxRate')}
                placeholder="Enter tax rate"
                step="0.01"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Supplier Price *</Label>
          <Input
            type="number"
            value={supplierPrice}
            onChange={(e) => {
              setValue('pricing.supplierPrice', parseFloat(e.target.value))
              calculateFinalPrice()
            }}
            placeholder="Enter supplier price"
            step="0.01"
          />
          {errors.pricing?.supplierPrice && (
            <p className="text-sm text-destructive">{errors.pricing.supplierPrice.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label>Markup Type</Label>
          <RadioGroup
            value={markupType}
            onValueChange={(value: 'percentage' | 'value') => {
              setValue('pricing.markupType', value)
              calculateFinalPrice()
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage">Percentage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="value" id="value" />
              <Label htmlFor="value">Value</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Markup Amount *</Label>
          <Input
            type="number"
            value={markupAmount}
            onChange={(e) => {
              setValue('pricing.markupAmount', parseFloat(e.target.value))
              calculateFinalPrice()
            }}
            placeholder={markupType === 'percentage' ? "Enter percentage" : "Enter value"}
            step="0.01"
          />
          {errors.pricing?.markupAmount && (
            <p className="text-sm text-destructive">{errors.pricing.markupAmount.message}</p>
          )}
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Final Price:</span>
            <span className="text-xl font-bold">
              ${pricing.finalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
          </div>
        </div>

        <Button onClick={onSubmit} className="w-full">
          Add Product
        </Button>
      </CardContent>
    </Card>
  )
}