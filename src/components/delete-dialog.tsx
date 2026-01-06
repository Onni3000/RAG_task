"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileItem } from "@/app/actions/files";

interface DeleteDialogProps {
  file: FileItem | null;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function DeleteDialog({
  file,
  onClose,
  onConfirm,
  isLoading,
}: DeleteDialogProps) {
  return (
    <Dialog open={!!file} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{file?.metadata.filename}
            &quot;?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
