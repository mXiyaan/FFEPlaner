'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema } from './schema'
import { Product } from '@/types/product'

import DetailsTab from './tabs/DetailsTab'
import SpecificationsTab from './tabs/SpecificationsTab'
import ImagesTab from './tabs/ImagesTab'
import FinishesTab from './tabs/FinishesTab'
import AttachmentsTab from './tabs/AttachmentsTab'
import LeadTimeTab from './tabs/LeadTimeTab'
import VendorTab from './tabs/VendorTab'
import PricingTab from './tabs/PricingTab'

export default function AddNewProductDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('details')

  const methods = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: '',
      name: '',
      modelNumber: '',
      brand: '',
      description: '',
      productUrl: '',
      specifications: {
        dimensions: '',
        weight: ''
      },
      images: [],
      finishes: [],
      attachments: [],
      leadTime: 0,
      vendor: null,
      pricing: {
        isTaxable: false,
        supplierPrice: 0,
        markupType: 'percentage',
        markupAmount: 0,
        finalPrice: 0
      }
    }
  })

  const onSubmit = (data: Product) => {
    console.log('Form submitted:', data)
    setIsOpen(false)
    methods.reset()
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add New Product
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the product details. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Tabs defaultValue="details" value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-8">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="specifications">Specs</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="finishes">Finishes</TabsTrigger>
                  <TabsTrigger value="attachments">Files</TabsTrigger>
                  <TabsTrigger value="leadTime">Lead Time</TabsTrigger>
                  <TabsTrigger value="vendor">Vendor</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <DetailsTab />
                </TabsContent>

                <TabsContent value="specifications">
                  <SpecificationsTab />
                </TabsContent>

                <TabsContent value="images">
                  <ImagesTab />
                </TabsContent>

                <TabsContent value="finishes">
                  <FinishesTab />
                </TabsContent>

                <TabsContent value="attachments">
                  <AttachmentsTab />
                </TabsContent>

                <TabsContent value="leadTime">
                  <LeadTimeTab />
                </TabsContent>

                <TabsContent value="vendor">
                  <VendorTab />
                </TabsContent>

                <TabsContent value="pricing">
                  <PricingTab onSubmit={methods.handleSubmit(onSubmit)} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (activeTab !== 'details') {
                      const tabs = ['details', 'specifications', 'images', 'finishes', 'attachments', 'leadTime', 'vendor', 'pricing']
                      const currentIndex = tabs.indexOf(activeTab)
                      setActiveTab(tabs[currentIndex - 1])
                    }
                  }}
                  disabled={activeTab === 'details'}
                >
                  Previous
                </Button>

                {activeTab !== 'pricing' && (
                  <Button
                    type="button"
                    onClick={() => {
                      const tabs = ['details', 'specifications', 'images', 'finishes', 'attachments', 'leadTime', 'vendor', 'pricing']
                      const currentIndex = tabs.indexOf(activeTab)
                      setActiveTab(tabs[currentIndex + 1])
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  )
}