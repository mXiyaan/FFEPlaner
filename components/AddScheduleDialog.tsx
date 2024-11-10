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

type BudgetType = "No Budget Set" | "Flexible Budget" | "Fixed Budget"

type AddScheduleDialogProps = {
  isOpen: boolean
  onClose: () => void
  onAddSchedule: (scheduleName: string, budget?: number) => void
  projectBudgetType: BudgetType
  projectTotalBudget?: number
  projectCurrentTotal?: number
}

export default function AddScheduleDialog({
  isOpen = true,
  onClose = () => {},
  onAddSchedule = () => {},
  projectBudgetType = "Flexible Budget",
  projectTotalBudget = 10000,
  projectCurrentTotal = 5000,
}: AddScheduleDialogProps) {
  const [scheduleName, setScheduleName] = React.useState("")
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

    if (projectBudgetType === "Fixed Budget" && (!scheduleBudget || isNaN(parseFloat(scheduleBudget)))) {
      newErrors.scheduleBudget = "Schedule budget is required for Fixed Budget projects"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleAddSchedule = async () => {
    if (validateForm()) {
      setIsLoading(true)
      try {
        await onAddSchedule(scheduleName.trim(), scheduleBudget ? parseFloat(scheduleBudget) : undefined)
        setScheduleName("")
        setScheduleBudget("")
        onClose()
      } catch (error) {
        console.error("Error adding schedule:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  const renderBudgetSection = () => {
    switch (projectBudgetType) {
      case "No Budget Set":
        return null
      case "Flexible Budget":
        return (
          <div className="grid gap-2">
            <Label>Project Current Total</Label>
            <p className="text-sm font-medium">{formatCurrency(projectCurrentTotal || 0)}</p>
          </div>
        )
      case "Fixed Budget":
        return (
          <div className="grid gap-2">
            <Label htmlFor="scheduleBudget">Set Budget for Schedule</Label>
            <Input
              id="scheduleBudget"
              type="number"
              value={scheduleBudget}
              onChange={(e) => setScheduleBudget(e.target.value)}
              placeholder="Enter schedule budget"
              aria-invalid={errors.scheduleBudget ? "true" : "false"}
            />
            {errors.scheduleBudget && (
              <p className="text-sm text-destructive">{errors.scheduleBudget}</p>
            )}
            <p className="text-sm text-muted-foreground">Project Total Budget: {formatCurrency(projectTotalBudget || 0)}</p>
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="scheduleName">Schedule Name</Label>
            <Input
              id="scheduleName"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              placeholder="Enter schedule name"
              aria-invalid={errors.scheduleName ? "true" : "false"}
            />
            {errors.scheduleName && (
              <p className="text-sm text-destructive">{errors.scheduleName}</p>
            )}
          </div>
          {renderBudgetSection()}
        </div>
        <DialogFooter>
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