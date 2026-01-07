"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export function FileUpload({ onUpload, isLoading }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    isLoading = true;
    if (!selectedFile) return;
    onUpload(selectedFile);
    setSelectedFile(null);
    if (input.current) input.current.value = "";
    isLoading = false;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          id="file-input"
          type="file"
          accept=".txt,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          Browse
        </Button>
        <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
          Upload
        </Button>
      </div>

      {selectedFile && (
        <p className="text-sm text-muted-foreground">
          Selected: {selectedFile.name}
        </p>
      )}
    </div>
  );
}
