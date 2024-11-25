export type Vendor = {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export type ProductFinish = {
  id: string
  code: string
  name: string
  description: string
  image: string
}

export type ProductAttachment = {
  id: string
  title: string
  url: string
  type: 'file' | 'link'
  fileSize?: number
  fileType?: string
}

export type LeadTimeOption = {
  id: string
  label: string
  value: number // in weeks
}

export type ProductImage = {
  id: string
  url: string
  alt: string
  isPrimary?: boolean
}

export interface Product {
  id: string
  name: string
  modelNumber: string
  brand: string
  description: string
  productUrl?: string
  specifications: {
    dimensions: string
    weight: string
  }
  images: ProductImage[]
  finishes: ProductFinish[]
  attachments: ProductAttachment[]
  leadTime: number
  vendor: Vendor | null
  pricing: {
    isTaxable: boolean
    taxRate?: number
    supplierPrice: number
    markupType: 'percentage' | 'value'
    markupAmount: number
    finalPrice: number
  }
}