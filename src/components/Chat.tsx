"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Message } from "@/types/chat";
import { useUsageLimit } from "@/hooks/useUsageLimit";

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { incrementUsage, isLimitReached, remainingQuestions } =
    useUsageLimit();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (isLimitReached) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        // Try to parse error response
        try {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `HTTP ${response.status}: ${response.statusText}`
          );
        } catch {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: fullContent }
              : msg
          )
        );
      }

      incrementUsage();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);

      // Don't increment usage if there was an error
      // Remove the assistant message if there was an error
      setMessages((prev) => prev.filter((msg) => msg.role === "user"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] max-w-4xl mx-auto">
      {/* Chat Container */}
      <div className="flex-1 relative overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-2xl">
        {/* Star Wars-style fade overlay */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none"></div>

        {/* Messages */}
        <div className="h-full overflow-y-auto p-6 space-y-4 relative">
          {messages.length === 0 && (
            <div className="text-center text-white/80 py-12">
              <div className="text-6xl mb-6">🤖</div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Welcome to KAI!
              </h2>
              <p className="text-lg max-w-md mx-auto leading-relaxed">
                Ask me anything about frontend development, my skills, or job
                opportunities. I&apos;m Kyle, a frontend engineer from Irvine,
                CA.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`transition-all duration-500 ${
                index < messages.length - 3
                  ? "opacity-60 scale-95"
                  : "opacity-100 scale-100"
              }`}
            >
              <ChatMessage message={message} />
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                    <i className="pi pi-user text-white text-sm"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-white/70 mb-1 font-medium flex items-center gap-1">
                      <i className="pi pi-bolt text-teal-400"></i>
                      Kyle AI
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center mb-4">
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg px-4 py-3 max-w-md">
                <div className="flex items-start gap-2">
                  <div className="text-red-400 text-lg">⚠️</div>
                  <div>
                    <p className="text-sm text-red-400 font-medium mb-1">
                      Error
                    </p>
                    <p className="text-xs text-red-300/80">{error}</p>
                    {error.includes("quota exceeded") && (
                      <p className="text-xs text-white/60 mt-2">
                        Please check your OpenAI billing or try again later.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Usage Counter */}
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <i className="pi pi-clock text-teal-400"></i>
          <span className="text-white/80 text-sm">
            {remainingQuestions} questions left today
          </span>
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        isLimitReached={isLimitReached}
      />
    </div>
  );
}
