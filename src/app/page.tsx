"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { FileList } from "@/components/file-list";
import { DeleteDialog } from "@/components/delete-dialog";
import {
  fetchFiles as fetchFilesAction,
  uploadFile as uploadFileAction,
  deleteFile as deleteFileAction,
  FileItem,
} from "@/app/actions/files";

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<FileItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      const result = await fetchFilesAction();
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
      await uploadFileAction(formData);
      const result = await fetchFilesAction();
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
      await deleteFileAction(deleteTarget.id);
      setFiles((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <FileUpload onUpload={handleUpload} isLoading={isLoading} />

        <FileList
          files={files}
          onDelete={setDeleteTarget}
          onFetch={handleFetch}
          isLoading={isLoading}
        />

        <DeleteDialog
          file={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
