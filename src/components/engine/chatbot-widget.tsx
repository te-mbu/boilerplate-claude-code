"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 h-[500px] w-[380px] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b border-border bg-primary p-4 text-primary-foreground">
            <span className="text-sm font-medium">Chat with us</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          <div className="flex h-[calc(100%-56px)] items-center justify-center p-4">
            <p className="text-center text-sm text-muted-foreground">
              Connect your AI chatbot provider here.
            </p>
          </div>
        </div>
      )}
      <Button
        size="lg"
        className="size-14 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "✕" : "💬"}
      </Button>
    </div>
  );
}
