'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product } from '@/types/product'

const leadTimeOptions = [
  { id: '1', label: '1-2 weeks', value: 2 },
  { id: '2', label: '2-4 weeks', value: 4 },
  { id: '3', label: '4-6 weeks', value: 6 },
  { id: '4', label: '6-8 weeks', value: 8 },
  { id: '5', label: '8-10 weeks', value: 10 },
  { id: '6', label: '10-12 weeks', value: 12 },
  { id: '7', label: '12-16 weeks', value: 16 },
  { id: '8', label: '16-20 weeks', value: 20 },
  { id: '9', label: '20-24 weeks', value: 24 },
  { id: '10', label: '24-32 weeks', value: 32 },
  { id: '11', label: '32-40 weeks', value: 40 },
  { id: '12', label: '40-52 weeks', value: 52 },
  { id: '13', label: '52-80 weeks', value: 80 }
]

export default function LeadTimeTab() {
  const { setValue, watch, formState: { errors } } = useFormContext<Product>()
  const leadTime = watch('leadTime')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          value={leadTime?.toString()}
          onValueChange={(value) => setValue('leadTime', parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select lead time" />
          </SelectTrigger>
          <SelectContent>
            {leadTimeOptions.map((option) => (
              <SelectItem key={option.id} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.leadTime && (
          <p className="text-sm text-destructive">{errors.leadTime.message}</p>
        )}

        {leadTime && (
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Estimated delivery time: {leadTimeOptions.find(opt => opt.value === leadTime)?.label}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}