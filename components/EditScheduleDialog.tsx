'use client'

import * as React from "react"
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
import { Schedule } from "@/types/ffe"

type EditScheduleDialogProps = {
  isOpen: boolean
  onClose: () => void
  onUpdate: (scheduleName: string, budget?: number) => void
  onDelete: () => void
  schedule: Schedule
  projectBudgetType: "No Budget Set" | "Flexible Budget" | "Fixed Budget"
  projectTotalBudget?: number
  projectCurrentTotal?: number
}

export default function EditScheduleDialog({
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  schedule,
  projectBudgetType = "Flexible Budget",
  projectTotalBudget = 0,
  projectCurrentTotal = 0,
}: EditScheduleDialogProps) {
  const [scheduleName, setScheduleName] = React.useState(schedule.name)
  const [scheduleBudget, setScheduleBudget] = React.useState(schedule.budget.toString())
  const [errors, setErrors] = React.useState({ scheduleName: "", scheduleBudget: "" })
  const [isLoading, setIsLoading] = React.useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false)

  React.useEffect(() => {
    setScheduleName(schedule.name)
    setScheduleBudget(schedule.budget.toString())
  }, [schedule])

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

  const handleUpdate = async () => {
    if (validateForm()) {
      setIsLoading(true)
      try {
        await onUpdate(scheduleName.trim(), scheduleBudget ? parseFloat(scheduleBudget) : undefined)
        onClose()
      } catch (error) {
        console.error("Error updating schedule:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
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
            {projectBudgetType !== "No Budget Set" && (
              <div className="grid gap-2">
                <Label htmlFor="scheduleBudget">Budget</Label>
                <Input
                  id="scheduleBudget"
                  type="number"
                  value={scheduleBudget}
                  onChange={(e) => setScheduleBudget(e.target.value)}
                  placeholder="Enter budget"
                  aria-invalid={errors.scheduleBudget ? "true" : "false"}
                />
                {errors.scheduleBudget && (
                  <p className="text-sm text-destructive">{errors.scheduleBudget}</p>
                )}
                {projectBudgetType === "Fixed Budget" && (
                  <p className="text-sm text-muted-foreground">
                    Project Total Budget: {formatCurrency(projectTotalBudget)}
                  </p>
                )}
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => setShowDeleteAlert(true)}
              disabled={isLoading}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Schedule"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the schedule
              and all its associated items.
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
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}