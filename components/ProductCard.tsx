'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'

export interface Product {
  id: string
  name: string
  category: string
  brand: string
  price: number
  image: string
  description: string
  specifications: {
    material: string
    dimensions: string
    weight: string
  }
  stock: number
  dateAdded: string
}

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(product)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{product.category}</span>
          <span className="font-semibold">${product.price.toLocaleString()}</span>
        </div>
        <div className="mt-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="mt-2 text-sm">
          <p>Stock: {product.stock} units</p>
          <p className="text-muted-foreground">
            Added: {new Date(product.dateAdded).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}