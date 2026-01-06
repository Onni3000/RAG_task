"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendChatMessage } from "@/app/actions/chat";

export function Chat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput("");
    setIsLoading(true);
    setResponse(null);

    try {
      const result = await sendChatMessage(message);
      setResponse(result);
    } catch (e) {
      console.error("Chat error:", e);
      setResponse("Failed to get response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-162.5 border rounded-md">
      <div className="flex-1 overflow-y-auto p-6">
        {!response && !isLoading && (
          <p className="text-muted-foreground text-center py-8">
            Ask a question
          </p>
        )}
        {isLoading && <p className="text-muted-foreground">Loading...</p>}
        {response && !isLoading && (
          <p className="whitespace-pre-wrap">{response}</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
