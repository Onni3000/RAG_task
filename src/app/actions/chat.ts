"use server";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

interface ChatResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
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
