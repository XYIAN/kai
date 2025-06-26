"use client";

import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
            : "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
        }`}
      >
        <div className="flex items-start gap-3">
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <i className="pi pi-user text-white text-sm"></i>
            </div>
          )}
          <div className="flex-1 min-w-0">
            {!isUser && (
              <div className="text-xs text-white/70 mb-1 font-medium flex items-center gap-1">
                <i className="pi pi-bolt text-teal-400"></i>
                Kyle AI
              </div>
            )}
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
          {isUser && (
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg">
              <i className="pi pi-user text-white text-sm"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
