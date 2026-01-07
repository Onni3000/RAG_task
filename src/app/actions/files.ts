"use server";

const DEFAULT_BASE_URL = process.env.BASE_URL;
const DEFAULT_API_KEY = process.env.API_KEY;

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

export interface ApiConfig {
  apiKey?: string;
  baseUrl?: string;
}

function getConfig(config?: ApiConfig) {
  return {
    baseUrl: config?.baseUrl || DEFAULT_BASE_URL,
    apiKey: config?.apiKey || DEFAULT_API_KEY,
  };
}

export async function fetchFiles(config?: ApiConfig): Promise<FileItem[]> {
  const { baseUrl, apiKey } = getConfig(config);

  const response = await fetch(`${baseUrl}/files`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch files");
  }

  const data: FetchFilesResponse = await response.json();
  return data.files;
}

export async function uploadFile(
  formData: FormData,
  config?: ApiConfig,
): Promise<FileItem> {
  const { baseUrl, apiKey } = getConfig(config);

  const response = await fetch(`${baseUrl}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  const data = await response.json();
  return data;
}

export async function deleteFile(
  id: string,
  config?: ApiConfig,
): Promise<void> {
  const { baseUrl, apiKey } = getConfig(config);

  const response = await fetch(`${baseUrl}/files/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete file");
  }
}
