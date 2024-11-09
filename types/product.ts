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