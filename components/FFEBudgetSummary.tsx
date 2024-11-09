'use client'

import { Project, Schedule } from '@/types/ffe'

interface FFEBudgetSummaryProps {
  project: Project
  schedule: Schedule
}

export function FFEBudgetSummary({ project, schedule }: FFEBudgetSummaryProps) {
  const calculateScheduleTotal = () => {
    return schedule.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <div className="mb-4 flex justify-between items-center bg-muted p-4 rounded-lg">
      <div>
        <p className="text-sm font-semibold">
          Project Budget: ${project.totalBudget.toLocaleString()}
        </p>
        <p className="text-sm font-semibold">
          Schedule Budget: ${schedule.budget.toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold">
          Total Spent: ${calculateScheduleTotal().toLocaleString()}
        </p>
        <p className="text-sm font-semibold">
          Remaining: ${(schedule.budget - calculateScheduleTotal()).toLocaleString()}
        </p>
      </div>
    </div>
  )
}