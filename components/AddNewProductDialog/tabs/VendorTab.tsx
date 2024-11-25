'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product, Vendor } from '@/types/product'

const existingVendors: Vendor[] = [
  {
    id: '1',
    name: 'Acme Furniture',
    contactPerson: 'John Doe',
    email: 'john@acme.com',
    phone: '123-456-7890',
    website: 'https://acme.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    }
  },
  {
    id: '2',
    name: 'Modern Designs',
    contactPerson: 'Jane Smith',
    email: 'jane@modern.com',
    phone: '987-654-3210',
    website: 'https://modern.com',
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    }
  }
]

export default function VendorTab() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<Product>()
  const vendor = watch('vendor')

  const handleSelectVendor = (vendorId: string) => {
    const selectedVendor = existingVendors.find(v => v.id === vendorId)
    setValue('vendor', selectedVendor)
  }

  const handleAddNewVendor = () => {
    const newVendor: Vendor = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: ''
      }
    }
    setValue('vendor', newVendor)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Select Existing Vendor</Label>
          <Select
            value={vendor?.id}
            onValueChange={handleSelectVendor}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a vendor" />
            </SelectTrigger>
            <SelectContent>
              {existingVendors.map((v) => (
                <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="px-4 text-sm text-muted-foreground">or</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddNewVendor}
            className="w-full"
          >
            Add New Vendor
          </Button>
        </div>

        {vendor && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vendor Name *</Label>
                <Input
                  {...register('vendor.name')}
                  placeholder="Enter vendor name"
                />
                {errors.vendor?.name && (
                  <p className="text-sm text-destructive">{errors.vendor.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Contact Person *</Label>
                <Input
                  {...register('vendor.contactPerson')}
                  placeholder="Enter contact person"
                />
                {errors.vendor?.contactPerson && (
                  <p className="text-sm text-destructive">{errors.vendor.contactPerson.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  {...register('vendor.email')}
                  type="email"
                  placeholder="Enter email"
                />
                {errors.vendor?.email && (
                  <p className="text-sm text-destructive">{errors.vendor.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input
                  {...register('vendor.phone')}
                  placeholder="Enter phone number"
                />
                {errors.vendor?.phone && (
                  <p className="text-sm text-destructive">{errors.vendor.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  {...register('vendor.website')}
                  type="url"
                  placeholder="Enter website URL"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Street Address *</Label>
                  <Input
                    {...register('vendor.address.street')}
                    placeholder="Enter street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input
                    {...register('vendor.address.city')}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label>State/Province *</Label>
                  <Input
                    {...register('vendor.address.state')}
                    placeholder="Enter state/province"
                  />
                </div>

                <div className="space-y-2">
                  <Label>ZIP/Postal Code *</Label>
                  <Input
                    {...register('vendor.address.zip')}
                    placeholder="Enter ZIP/postal code"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Input
                    {...register('vendor.address.country')}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}