import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  imageUrl?: string
  category?: string
  name?: string
  brand?: string
  price?: number
}

export default function ProductCard({
  imageUrl = '/placeholder.svg',
  category = 'Furniture',
  name = 'Modern Chair',
  brand = 'Acme',
  price
}: ProductCardProps = {}) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={name || 'Product image'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute top-2 right-2" variant="secondary">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{brand}</p>
        <p className="mt-2 text-xl font-bold">
          {price != null ? `$${price.toFixed(2)}` : 'Price not available'}
        </p>
      </CardContent>
    </Card>
  )
}