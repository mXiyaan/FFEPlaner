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
import { Project } from '@/types/ffe'

type NewProjectButtonProps = {
  onAddProject: (project: Pick<Project, 'name' | 'totalBudget' | 'clientName'>) => void
  existingClients?: string[]
  userSettings?: {
    defaultCurrency?: string
    defaultUnitSystem?: 'metric' | 'imperial'
  }
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR']

export default function NewProjectButton({ 
  onAddProject, 
  existingClients = [], 
  userSettings = {} 
}: NewProjectButtonProps) {
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
  }

  const handleAddProject = () => {
    if (projectName.trim()) {
      onAddProject({
        name: projectName.trim(),
        clientName: clientName === 'new' ? newClientName.trim() : clientName,
        totalBudget: budgetType === 'fixed' && budget ? parseFloat(budget) : 0
      })
      handleCloseDialog()
    }
  }

  return (
    <>
      <Button variant="outline" className="w-full justify-start" onClick={handleOpenDialog}>
        <PlusCircle className="mr-2 h-4 w-4" />
        New Project
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectName" className="text-right">
                Project Name
              </Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Client</Label>
              <Select onValueChange={setClientName} value={clientName}>
                <SelectTrigger>
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
                    />
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamMembers" className="text-right">
                Team Members
              </Label>
              <Input
                id="teamMembers"
                value={teamMembers}
                onChange={(e) => setTeamMembers(e.target.value)}
                className="col-span-3"
                placeholder="Separate names with commas"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Budget</Label>
              <Tabs defaultValue="no-budget" onValueChange={setBudgetType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="no-budget">No Budget Set</TabsTrigger>
                  <TabsTrigger value="flexible">Flexible Budget</TabsTrigger>
                  <TabsTrigger value="fixed">Fixed Budget</TabsTrigger>
                </TabsList>
                <TabsContent value="no-budget">
                  <Card>
                    <CardContent className="pt-6">
                      <p>No specific budget has been set for this project.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="flexible">
                  <Card>
                    <CardContent className="pt-6">
                      <p>The budget for this project is flexible and can be adjusted as needed.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="fixed">
                  <Card>
                    <CardContent className="space-y-4 pt-6">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="budget">Fixed Budget Amount</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="Enter budget amount"
                          className="w-40"
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
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Unit System</Label>
              <Select value={unitSystem} onValueChange={setUnitSystem}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric</SelectItem>
                  <SelectItem value="imperial">Imperial</SelectItem>
                </SelectContent>
              </Select>
            </div>
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