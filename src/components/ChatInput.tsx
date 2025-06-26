"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isLimitReached: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading,
  isLimitReached,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !isLimitReached) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <InputText
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isLimitReached
                ? "KAI's magic is recharging. Come back tomorrow."
                : "Ask Kyle anything..."
            }
            disabled={isLoading || isLimitReached}
            className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 rounded-xl"
            autoComplete="off"
          />
        </div>
        <Button
          type="submit"
          icon="pi pi-send"
          disabled={!message.trim() || isLoading || isLimitReached}
          loading={isLoading}
          className="p-button-primary bg-gradient-to-r from-teal-500 to-blue-500 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        />
      </div>
    </form>
  );
}
