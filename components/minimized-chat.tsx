"use client"

import { MessageSquare } from "lucide-react"
import { useChat } from "@/components/chat-provider"

export function MinimizedChat() {
  const { expandChat, messageCount } = useChat()

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={expandChat}
        className="relative h-12 w-12 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/30 hover:border-primary/60 transition-colors duration-300 group animate-slide-up"
      >
        <MessageSquare className="h-5 w-5 text-primary/80 group-hover:text-primary transition-colors" />
        <div className="absolute top-0 right-0 h-1 w-1 bg-primary"></div>

        {messageCount > 0 && (
          <div className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-[10px] text-white">
            {messageCount > 9 ? "9+" : messageCount}
          </div>
        )}
      </button>
    </div>
  )
}
