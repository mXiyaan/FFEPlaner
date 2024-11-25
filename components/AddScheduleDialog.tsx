'use client'

import * as React from "react"
import { Loader2 } from "lucide-react"
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
import { useFFE } from "./FFEContext"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type AddScheduleDialogProps = {
  isOpen: boolean
  onClose: () => void
  onAddSchedule: (scheduleName: string, budget?: number) => void
  projectId: string
}

export default function AddScheduleDialog({
  isOpen,
  onClose,
  onAddSchedule,
  projectId
}: AddScheduleDialogProps) {
  const { projects } = useFFE()
  const project = projects.find(p => p.id === projectId)
  
  const [scheduleName, setScheduleName] = React.useState("")
  const [budgetType, setBudgetType] = React.useState<'no-budget' | 'custom'>('no-budget')
  const [scheduleBudget, setScheduleBudget] = React.useState("")
  const [errors, setErrors] = React.useState({ scheduleName: "", scheduleBudget: "" })
  const [isLoading, setIsLoading] = React.useState(false)

  const validateForm = () => {
    let isValid = true
    const newErrors = { scheduleName: "", scheduleBudget: "" }

    if (!scheduleName.trim()) {
      newErrors.scheduleName = "Schedule name is required"
      isValid = false
    }

    if (budgetType === 'custom' && (!scheduleBudget || isNaN(parseFloat(scheduleBudget)))) {
      newErrors.scheduleBudget = "Please enter a valid budget amount"
      isValid = false
    }

    if (project?.totalBudget && budgetType === 'custom') {
      const budget = parseFloat(scheduleBudget)
      const totalSchedulesBudget = project.schedules.reduce((sum, s) => sum + (s.budget || 0), 0)
      if (budget + totalSchedulesBudget > project.totalBudget) {
        newErrors.scheduleBudget = "Schedule budget exceeds remaining project budget"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddSchedule = async () => {
    if (validateForm()) {
      setIsLoading(true)
      try {
        const budget = budgetType === 'custom' ? parseFloat(scheduleBudget) : undefined
        await onAddSchedule(scheduleName.trim(), budget)
        setScheduleName("")
        setScheduleBudget("")
        setBudgetType('no-budget')
        onClose()
      } catch (error) {
        console.error("Error adding schedule:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value)
  }

  const getRemainingBudget = () => {
    if (!project?.totalBudget) return 0
    const totalSchedulesBudget = project.schedules.reduce((sum, s) => sum + (s.budget || 0), 0)
    return project.totalBudget - totalSchedulesBudget
  }

  const renderBudgetSection = () => {
    if (!project) return null

    return (
      <div className="space-y-4">
        <Label>Budget Settings</Label>
        <Tabs value={budgetType} onValueChange={(value: 'no-budget' | 'custom') => setBudgetType(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="no-budget">No Budget</TabsTrigger>
            <TabsTrigger value="custom">Set Budget</TabsTrigger>
          </TabsList>
          <TabsContent value="no-budget">
            <Card>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  No specific budget will be set for this schedule.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="custom">
            <Card>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleBudget">Schedule Budget</Label>
                  <Input
                    id="scheduleBudget"
                    type="number"
                    value={scheduleBudget}
                    onChange={(e) => setScheduleBudget(e.target.value)}
                    placeholder="Enter budget amount"
                    className="w-full"
                  />
                  {errors.scheduleBudget && (
                    <p className="text-sm text-destructive">{errors.scheduleBudget}</p>
                  )}
                  {project.totalBudget > 0 && (
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Project Total Budget: {formatCurrency(project.totalBudget)}</p>
                      <p>Remaining Budget: {formatCurrency(getRemainingBudget())}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="scheduleName">Schedule Name</Label>
            <Input
              id="scheduleName"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              placeholder="Enter schedule name"
            />
            {errors.scheduleName && (
              <p className="text-sm text-destructive">{errors.scheduleName}</p>
            )}
          </div>
          {renderBudgetSection()}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddSchedule} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Schedule"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}