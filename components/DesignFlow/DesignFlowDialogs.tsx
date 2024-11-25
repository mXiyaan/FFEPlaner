'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DesignFlowDialogsProps {
  state: any // Replace with proper type
  actions: any // Replace with proper type
}

export function DesignFlowDialogs({ state, actions }: DesignFlowDialogsProps) {
  return (
    <>
      {/* Add Category Dialog */}
      <Dialog open={state.isAddingCategory} onOpenChange={actions.setIsAddingCategory}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-name" className="text-right">
                Category Name
              </Label>
              <Input
                id="category-name"
                value={state.newCategoryName}
                onChange={(e) => actions.setNewCategoryName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category-prefix" className="text-right">
                Prefix
              </Label>
              <Input
                id="category-prefix"
                value={state.newCategoryPrefix}
                onChange={(e) => actions.setNewCategoryPrefix(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={actions.addCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add other dialogs here */}
    </>
  )
}