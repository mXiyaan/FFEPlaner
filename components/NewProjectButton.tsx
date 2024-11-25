'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { useFFE } from './FFEContext'

type NewProjectButtonProps = {
  existingClients?: string[]
  userSettings?: {
    defaultCurrency?: string
    defaultUnitSystem?: 'metric' | 'imperial'
  }
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR']

export default function NewProjectButton({ 
  existingClients = [], 
  userSettings = {} 
}: NewProjectButtonProps) {
  const router = useRouter()
  const { addProject } = useFFE()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [clientName, setClientName] = useState('')
  const [newClientName, setNewClientName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [teamMembers, setTeamMembers] = useState('')
  const [budgetType, setBudgetType] = useState('no-budget')
  const [budget, setBudget] = useState('')
  const [currency, setCurrency] = useState(userSettings?.defaultCurrency || 'USD')
  const [unitSystem, setUnitSystem] = useState(userSettings?.defaultUnitSystem || 'metric')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleOpenDialog = () => setIsDialogOpen(true)
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setProjectName('')
    setClientName('')
    setNewClientName('')
    setContactPerson('')
    setEmail('')
    setPhone('')
    setAddress('')
    setTeamMembers('')
    setBudgetType('no-budget')
    setBudget('')
    setCurrency(userSettings?.defaultCurrency || 'USD')
    setUnitSystem(userSettings?.defaultUnitSystem || 'metric')
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required'
    }

    if (clientName === 'new' && !newClientName.trim()) {
      newErrors.newClientName = 'Client name is required'
    }

    if (budgetType === 'fixed') {
      if (!budget) {
        newErrors.budget = 'Budget amount is required'
      } else if (isNaN(parseFloat(budget)) || parseFloat(budget) <= 0) {
        newErrors.budget = 'Please enter a valid budget amount'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddProject = () => {
    if (validateForm()) {
      const projectId = addProject({
        name: projectName.trim(),
        clientName: clientName === 'new' ? newClientName.trim() : clientName,
        totalBudget: budgetType === 'fixed' && budget ? parseFloat(budget) : 0
      })
      handleCloseDialog()
      // Redirect to the project page immediately after creation
      router.push(`/projects/${projectId}`)
    }
  }

  return (
    <>
      <Button variant="outline" className="w-full justify-start" onClick={handleOpenDialog}>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Project
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[900px] sm:max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className={errors.projectName ? 'border-destructive' : ''}
                  />
                  {errors.projectName && (
                    <p className="text-sm text-destructive">{errors.projectName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientSelect">Client</Label>
                  <Select onValueChange={setClientName} value={clientName}>
                    <SelectTrigger id="clientSelect">
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingClients.map((client) => (
                        <SelectItem key={client} value={client}>{client}</SelectItem>
                      ))}
                      <SelectItem value="new">Add New Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamMembers">Team Members</Label>
                  <Input
                    id="teamMembers"
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    placeholder="Separate names with commas"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Budget</Label>
                <Tabs defaultValue="no-budget" onValueChange={setBudgetType} value={budgetType}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="no-budget">No Budget</TabsTrigger>
                    <TabsTrigger value="flexible">Flexible</TabsTrigger>
                    <TabsTrigger value="fixed">Fixed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="no-budget">
                    <Card>
                      <CardContent className="pt-4">
                        <p>No specific budget has been set for this project.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="flexible">
                    <Card>
                      <CardContent className="pt-4">
                        <p>The budget for this project is flexible and can be adjusted as needed.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="fixed">
                    <Card>
                      <CardContent className="space-y-4 pt-4">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="budget">Fixed Budget Amount</Label>
                          <Input
                            id="budget"
                            type="number"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Enter amount"
                            className={`w-32 ${errors.budget ? 'border-destructive' : ''}`}
                          />
                          <Select value={currency} onValueChange={setCurrency}>
                            <SelectTrigger className="w-24">
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencies.map((curr) => (
                                <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {errors.budget && (
                          <p className="text-sm text-destructive">{errors.budget}</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="space-y-2">
                  <Label htmlFor="unitSystem">Unit System</Label>
                  <Select value={unitSystem} onValueChange={setUnitSystem}>
                    <SelectTrigger id="unitSystem">
                      <SelectValue placeholder="Select unit system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric</SelectItem>
                      <SelectItem value="imperial">Imperial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {clientName === 'new' && (
              <div className="space-y-4">
                <Separator />
                <Label className="text-lg font-semibold">New Client Information</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newClientName">Client Name</Label>
                    <Input
                      id="newClientName"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className={errors.newClientName ? 'border-destructive' : ''}
                    />
                    {errors.newClientName && (
                      <p className="text-sm text-destructive">{errors.newClientName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}