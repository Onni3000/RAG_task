"use server";

const DEFAULT_BASE_URL = process.env.BASE_URL;
const DEFAULT_API_KEY = process.env.API_KEY;

interface ChatResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
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

export async function sendChatMessage(
  message: string,
  config?: ApiConfig,
): Promise<string> {
  const { baseUrl, apiKey } = getConfig(config);

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "rag",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data: ChatResponse = await response.json();
  return data.choices[0].message.content;
}
