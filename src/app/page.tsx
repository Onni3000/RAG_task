"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FileUpload } from "@/components/file-upload";
import { FileList } from "@/components/file-list";
import { DeleteDialog } from "@/components/delete-dialog";
import { Chat } from "@/components/chat";
import { Input } from "@/components/ui/input";
import {
  fetchFiles as fetchFilesAction,
  uploadFile as uploadFileAction,
  deleteFile as deleteFileAction,
  FileItem,
  ApiConfig,
} from "@/app/actions/files";

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<FileItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [baseUrl, setBaseUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const apiConfig: ApiConfig = {
    baseUrl: baseUrl || undefined,
    apiKey: apiKey || undefined,
  };

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const result = await fetchFilesAction(apiConfig);
      setFiles(result);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await uploadFileAction(formData, apiConfig);
      const result = await fetchFilesAction(apiConfig);
      setFiles(result);
    } catch (e) {
      console.error("Upload error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsLoading(true);
    try {
      await deleteFileAction(deleteTarget.id, apiConfig);
      setFiles((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success("File deleted successfully");
    } catch (e) {
      console.error("Delete error:", e);
      toast.error("Failed to delete file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <div className="grid grid-cols-[500px_1fr] gap-8 w-full max-w-6xl mt-32">
        <div className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
            <Input
              type="password"
              placeholder="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <FileUpload onUpload={handleUpload} isLoading={isLoading} />
          <FileList
            files={files}
            onDelete={setDeleteTarget}
            onFetch={handleFetch}
            isLoading={isLoading}
          />
        </div>

        <div>
          <Chat apiConfig={apiConfig} />
        </div>
      </div>

      <DeleteDialog
        file={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
