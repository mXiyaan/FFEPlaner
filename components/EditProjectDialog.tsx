'use client'

import React, { useState, useEffect } from 'react'
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Project } from '@/types/ffe'

type EditProjectDialogProps = {
  isOpen: boolean
  onClose: () => void
  onUpdate: (project: Partial<Project>) => void
  onDelete: () => void
  project: Project
}

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR']

export default function EditProjectDialog({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  project,
}: EditProjectDialogProps) {
  const [projectName, setProjectName] = useState(project.name)
  const [clientName, setClientName] = useState(project.clientName || '')
  const [budgetType, setBudgetType] = useState<'no-budget' | 'flexible' | 'fixed'>(
    project.totalBudget > 0 ? 'fixed' : 'no-budget'
  )
  const [budget, setBudget] = useState(project.totalBudget.toString())
  const [currency, setCurrency] = useState('USD')
  const [errors, setErrors] = useState({ projectName: '', budget: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  useEffect(() => {
    setProjectName(project.name)
    setClientName(project.clientName || '')
    setBudgetType(project.totalBudget > 0 ? 'fixed' : 'no-budget')
    setBudget(project.totalBudget.toString())
  }, [project])

  const validateForm = () => {
    let isValid = true
    const newErrors = { projectName: '', budget: '' }

    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required'
      isValid = false
    }

    if (budgetType === 'fixed' && (!budget || isNaN(parseFloat(budget)))) {
      newErrors.budget = 'Budget is required for Fixed Budget projects'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleUpdate = async () => {
    if (validateForm()) {
      setIsLoading(true)
      try {
        const updatedProject: Partial<Project> = {
          name: projectName.trim(),
          clientName: clientName.trim() || undefined,
          totalBudget: budgetType === 'fixed' && budget ? parseFloat(budget) : 0
        }
        await onUpdate(updatedProject)
        onClose()
      } catch (error) {
        console.error('Error updating project:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                aria-invalid={errors.projectName ? "true" : "false"}
              />
              {errors.projectName && (
                <p className="text-sm text-destructive">{errors.projectName}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>

            <div className="space-y-4">
              <Label>Budget</Label>
              <Tabs value={budgetType} onValueChange={(value: any) => setBudgetType(value)}>
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
                        <div className="grid gap-2 flex-1">
                          <Label htmlFor="budget">Fixed Budget Amount</Label>
                          <div className="flex space-x-2">
                            <Input
                              id="budget"
                              type="number"
                              value={budget}
                              onChange={(e) => setBudget(e.target.value)}
                              placeholder="Enter budget amount"
                              className="flex-1"
                              aria-invalid={errors.budget ? "true" : "false"}
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => setShowDeleteAlert(true)}
              disabled={isLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Project
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Project"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and all its associated schedules and items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete()
                setShowDeleteAlert(false)
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}