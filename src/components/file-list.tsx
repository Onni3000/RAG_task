"use client";

import { Button } from "@/components/ui/button";
import { FileItem } from "@/app/actions/files";

interface FileListProps {
  files: FileItem[];
  onDelete: (file: FileItem) => void;
  onFetch: () => void;
  isLoading: boolean;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
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
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-medium">{file.metadata.filename}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(file.metadata.created_at)}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
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
