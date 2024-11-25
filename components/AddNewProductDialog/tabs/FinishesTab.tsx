'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X } from 'lucide-react'
import { Product, ProductFinish } from '@/types/product'

const existingFinishes: ProductFinish[] = [
  {
    id: '1',
    code: 'MAT-BLK',
    name: 'Matte Black',
    description: 'Smooth matte black finish',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop'
  },
  {
    id: '2',
    code: 'BRS-SAT',
    name: 'Brushed Satin',
    description: 'Brushed satin metal finish',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=2064&auto=format&fit=crop'
  }
]

export default function FinishesTab() {
  const { watch, setValue, formState: { errors } } = useFormContext<Product>()
  const finishes = watch('finishes')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const newFinish: ProductFinish = {
        id: Math.random().toString(36).substr(2, 9),
        code: '',
        name: '',
        description: '',
        image: URL.createObjectURL(file)
      }
      setValue('finishes', [...finishes, newFinish])
    }
  }

  const updateFinish = (id: string, field: keyof ProductFinish, value: string) => {
    const updatedFinishes = finishes.map(finish =>
      finish.id === id ? { ...finish, [field]: value } : finish
    )
    setValue('finishes', updatedFinishes)
  }

  const removeFinish = (id: string) => {
    setValue('finishes', finishes.filter(finish => finish.id !== id))
  }

  const addExistingFinish = (finish: ProductFinish) => {
    if (!finishes.some(f => f.id === finish.id)) {
      setValue('finishes', [...finishes, finish])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Finishes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Existing Finishes</h3>
          <div className="grid grid-cols-2 gap-4">
            {existingFinishes.map((finish) => (
              <div
                key={finish.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <img
                  src={finish.image}
                  alt={finish.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold">{finish.name}</p>
                  <p className="text-sm text-muted-foreground">{finish.code}</p>
                  <p className="text-sm">{finish.description}</p>
                </div>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => addExistingFinish(finish)}
                  disabled={finishes.some(f => f.id === finish.id)}
                >
                  {finishes.some(f => f.id === finish.id) ? 'Added' : 'Add Finish'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Custom Finishes</h3>
          <div className="grid grid-cols-2 gap-4">
            {finishes.filter(f => !existingFinishes.some(ef => ef.id === f.id)).map((finish) => (
              <div key={finish.id} className="border rounded-lg p-4 space-y-4">
                <div className="relative">
                  <img
                    src={finish.image}
                    alt={finish.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeFinish(finish.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Finish Code"
                    value={finish.code}
                    onChange={(e) => updateFinish(finish.id, 'code', e.target.value)}
                  />
                  <Input
                    placeholder="Finish Name"
                    value={finish.name}
                    onChange={(e) => updateFinish(finish.id, 'name', e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={finish.description}
                    onChange={(e) => updateFinish(finish.id, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <Label
            htmlFor="finishImageUpload"
            className="cursor-pointer mt-4 flex items-center justify-center w-full h-40 border-2 border-dashed rounded-md"
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold">
                Add New Finish
              </span>
            </div>
            <Input
              id="finishImageUpload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageUpload}
            />
          </Label>
        </div>

        {errors.finishes && (
          <p className="text-sm text-destructive">{errors.finishes.message}</p>
        )}
      </CardContent>
    </Card>
  )
}