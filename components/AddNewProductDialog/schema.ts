import { z } from 'zod'

export const vendorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Vendor name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  website: z.string().url().optional(),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required')
  })
})

export const productFinishSchema = z.object({
  id: z.string(),
  code: z.string().min(1, 'Finish code is required'),
  name: z.string().min(1, 'Finish name is required'),
  description: z.string(),
  image: z.string().url()
})

export const productAttachmentSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL'),
  type: z.enum(['file', 'link']),
  fileSize: z.number().optional(),
  fileType: z.string().optional()
})

export const productImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string(),
  isPrimary: z.boolean().optional()
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  modelNumber: z.string().min(1, 'Model number is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string(),
  productUrl: z.string().url().optional(),
  specifications: z.object({
    dimensions: z.string().min(1, 'Dimensions are required'),
    weight: z.string().min(1, 'Weight is required')
  }),
  images: z.array(productImageSchema).min(1, 'At least one image is required'),
  finishes: z.array(productFinishSchema),
  attachments: z.array(productAttachmentSchema),
  leadTime: z.number().min(1, 'Lead time is required'),
  vendor: vendorSchema.nullable(),
  pricing: z.object({
    isTaxable: z.boolean(),
    taxRate: z.number().optional(),
    supplierPrice: z.number().min(0, 'Supplier price must be greater than 0'),
    markupType: z.enum(['percentage', 'value']),
    markupAmount: z.number().min(0, 'Markup amount must be greater than 0'),
    finalPrice: z.number().min(0, 'Final price must be greater than 0')
  })
})