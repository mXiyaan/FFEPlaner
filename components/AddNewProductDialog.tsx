'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, Upload } from 'lucide-react'

type ProductImage = {
  id: string
  url: string
  alt: string
}

type ProductFile = {
  id: string
  name: string
  url: string
}

type MaterialImage = {
  id: string
  url: string
  alt: string
  finish: string
}

type TaxOption = 'GST' | 'VAT'

type Supplier = {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  taxType: TaxOption
  tinNumber: string
  taxPercentage: number
}

type ShippingMethod = 'land' | 'sea' | 'air'

type Product = {
  id: string
  name: string
  modelNumber: string
  brand: string
  category: string
  description: string
  dimensions: string
  weight: string
  additionalSpecs: string
  images: ProductImage[]
  materials: MaterialImage[]
  files: ProductFile[]
  supplierPrice: number
  includeTaxInSupplierPrice: boolean
  markupType: 'percentage' | 'value'
  markupAmount: number
  finalPrice: number
  supplier: Supplier | null
  shippingMethod: ShippingMethod
  courier: string
  trackingNumbers: string[]
  estimatedDuration: string
  leadTime: string
  productLink: string
}

export default function AddNewProductDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories] = useState<string[]>(['Seating', 'Tables', 'Lighting', 'Storage'])
  const [brands] = useState<string[]>(['Brand A', 'Brand B', 'Brand C'])
  const [suppliers] = useState<Supplier[]>([
    { id: '1', name: 'Supplier A', contactPerson: 'John Doe', email: 'john@suppliera.com', phone: '123-456-7890', taxType: 'GST', tinNumber: 'GST123456', taxPercentage: 18 },
    { id: '2', name: 'Supplier B', contactPerson: 'Jane Smith', email: 'jane@supplierb.com', phone: '987-654-3210', taxType: 'VAT', tinNumber: 'VAT789012', taxPercentage: 20 },
  ])

  const [newProduct, setNewProduct] = useState<Product>({
    id: '',
    name: '',
    modelNumber: '',
    brand: '',
    category: '',
    description: '',
    dimensions: '',
    weight: '',
    additionalSpecs: '',
    images: [],
    materials: [],
    files: [],
    supplierPrice: 0,
    includeTaxInSupplierPrice: false,
    markupType: 'percentage',
    markupAmount: 0,
    finalPrice: 0,
    supplier: null,
    shippingMethod: 'land',
    courier: '',
    trackingNumbers: [],
    estimatedDuration: '',
    leadTime: '',
    productLink: ''
  })

  const handleInputChange = (field: keyof Product, value: any) => {
    setNewProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        alt: file.name
      }))
      handleInputChange('images', [...newProduct.images, ...newImages])
    }
  }

  const removeImage = (id: string) => {
    handleInputChange('images', newProduct.images.filter(image => image.id !== id))
  }

  const handleSubmit = () => {
    console.log('New product:', newProduct)
    setIsOpen(false)
    // Reset form
    setNewProduct({
      id: '',
      name: '',
      modelNumber: '',
      brand: '',
      category: '',
      description: '',
      dimensions: '',
      weight: '',
      additionalSpecs: '',
      images: [],
      materials: [],
      files: [],
      supplierPrice: 0,
      includeTaxInSupplierPrice: false,
      markupType: 'percentage',
      markupAmount: 0,
      finalPrice: 0,
      supplier: null,
      shippingMethod: 'land',
      courier: '',
      trackingNumbers: [],
      estimatedDuration: '',
      leadTime: '',
      productLink: ''
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details for the new product. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
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
                      value={newProduct.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Select onValueChange={(value) => handleInputChange('brand', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map(brand => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelNumber">Model Number</Label>
                    <Input
                      id="modelNumber"
                      value={newProduct.modelNumber}
                      onChange={(e) => handleInputChange('modelNumber', e.target.value)}
                      placeholder="Enter model number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter product description"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={newProduct.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      placeholder="W x D x H (mm)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={newProduct.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      placeholder="Enter weight (kg)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalSpecs">Additional Specifications</Label>
                  <Textarea
                    id="additionalSpecs"
                    value={newProduct.additionalSpecs}
                    onChange={(e) => handleInputChange('additionalSpecs', e.target.value)}
                    placeholder="Enter additional specifications"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {newProduct.images.map((image) => (
                    <div key={image.id} className="relative">
                      <img src={image.url} alt={image.alt} className="w-full h-40 object-cover rounded-md" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Label htmlFor="imageUpload" className="cursor-pointer mt-4 flex items-center justify-center w-full h-40 border-2 border-dashed rounded-md">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                      Upload product images
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Product Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierPrice">Supplier Price</Label>
                  <Input
                    id="supplierPrice"
                    type="number"
                    value={newProduct.supplierPrice}
                    onChange={(e) => handleInputChange('supplierPrice', parseFloat(e.target.value))}
                    placeholder="Enter supplier price"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Markup Type</Label>
                  <RadioGroup
                    value={newProduct.markupType}
                    onValueChange={(value: 'percentage' | 'value') => handleInputChange('markupType', value)}
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
                  <Label htmlFor="markupAmount">Markup Amount</Label>
                  <Input
                    id="markupAmount"
                    type="number"
                    value={newProduct.markupAmount}
                    onChange={(e) => handleInputChange('markupAmount', parseFloat(e.target.value))}
                    placeholder={newProduct.markupType === 'percentage' ? "Enter percentage" : "Enter value"}
                  />
                </div>
                <Button onClick={handleSubmit} className="w-full">Add Product</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}