"use client"

import { useChat } from "@/components/chat-provider"
import { ChatWindow } from "@/components/chat-window"
import { MinimizedChat } from "@/components/minimized-chat"

export function ChatInterface() {
  const { chatOpen, chatMinimized } = useChat()

  return (
    <>
      {chatOpen && !chatMinimized && <ChatWindow />}
      {chatMinimized && <MinimizedChat />}
    </>
  )
}
