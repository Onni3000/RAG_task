"use server";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

export interface FileMetadata {
  filename: string;
  created_at: string;
}

export interface FileItem {
  id: string;
  metadata: FileMetadata;
}

interface FetchFilesResponse {
  files: FileItem[];
}

export async function fetchFiles(): Promise<FileItem[]> {
  const response = await fetch(`${BASE_URL}/files`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }

  const data: FetchFilesResponse = await response.json();
  return data.files;
}

export async function uploadFile(formData: FormData): Promise<FileItem> {
  const response = await fetch(`${BASE_URL}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Upload failed:", response.status, errorText);
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
  return data;
}

export async function deleteFile(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/files/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete file");
  }
}
