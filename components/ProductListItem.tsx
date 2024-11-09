import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

interface ProductListItemProps {
  imageUrl?: string
  category?: string
  name?: string
  brand?: string
  price?: number
}

export default function ProductListItem({
  imageUrl = '/placeholder.svg',
  category = 'Furniture',
  name = 'Modern Chair',
  brand = 'Acme',
  price
}: ProductListItemProps = {}) {
  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/5">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt={name || 'Product image'}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Badge variant="secondary">
            {category}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{brand}</p>
        <p className="mt-1 text-lg font-bold">
          {price != null ? `$${price.toFixed(2)}` : 'Price not available'}
        </p>
      </div>
    </div>
  )
}