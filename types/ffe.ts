export type FFEItem = {
  id: string
  category: string
  name: string
  product: string
  productCode: string
  brand: string
  dimensions: string
  material: string
  finish: string
  quantity: number
  leadTime: string
  supplier: string
  status: 'Approved' | 'Pending' | 'In Production'
  image: string
  price: number
  modelNumber?: number
  location?: string
  website?: string
  alternatives: string[]
}

export type Schedule = {
  id: string
  name: string
  items: FFEItem[]
  budget: number
}

export type Project = {
  id: string
  name: string
  schedules: Schedule[]
  totalBudget: number
}

export type CategoryPrefix = {
  category: string
  prefix: string
}