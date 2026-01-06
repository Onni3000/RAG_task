"use client";

import { Button } from "@/components/ui/button";
import { FileItem } from "@/app/actions/files";

interface FileListProps {
  files: FileItem[];
  onDelete: (file: FileItem) => void;
  onFetch: () => void;
  isLoading: boolean;
}

export function FileList({
  files,
  onDelete,
  onFetch,
  isLoading,
}: FileListProps) {
  return (
    <div className="space-y-4">
      <Button onClick={onFetch} disabled={isLoading} variant="outline">
        {isLoading ? "Loading..." : "Fetch Files"}
      </Button>

      {files.length > 0 && (
        <div className="border rounded-md divide-y">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="min-w-0 flex-1">
                <p
                  className="font-medium truncate"
                  title={file.metadata.filename}
                >
                  {file.metadata.filename}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {file.id}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="shrink-0"
                onClick={() => onDelete(file)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          No files. Click &quot;Fetch Files&quot; to load.
        </p>
      )}
    </div>
  );
}
