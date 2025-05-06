"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"

interface ChatMessage {
  text: string
  isUser: boolean
  timestamp: string
}

interface ChatContextType {
  chatOpen: boolean
  chatMinimized: boolean
  messageCount: number
  currentCommand: string
  messages: ChatMessage[]
  openChat: (command?: string) => void
  minimizeChat: () => void
  expandChat: () => void
  closeChat: () => void
  addMessage: (message: ChatMessage) => void
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Load messages from localStorage on initial render
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages")
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages))
      } catch (error) {
        console.error("Failed to parse stored messages:", error)
        localStorage.removeItem("chatMessages")
      }
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages])

  const openChat = (command?: string) => {
    if (command) {
      setCurrentCommand(command)

      // Add the command as a user message if it's not already in the messages
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const newMessage: ChatMessage = {
        text: command,
        isUser: true,
        timestamp,
      }

      // Check if this exact message is already the last message
      const lastMessage = messages[messages.length - 1]
      if (!lastMessage || lastMessage.text !== command || !lastMessage.isUser) {
        setMessages((prev) => [...prev, newMessage])
      }
    }
    setChatOpen(true)
    setChatMinimized(false)
  }

  const minimizeChat = () => {
    setChatMinimized(true)
  }

  const expandChat = () => {
    setChatMinimized(false)
    setChatOpen(true)
  }

  const closeChat = () => {
    setChatOpen(false)
    setChatMinimized(false)
  }

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const clearMessages = () => {
    setMessages([])
    localStorage.removeItem("chatMessages")
  }

  return (
    <ChatContext.Provider
      value={{
        chatOpen,
        chatMinimized,
        messageCount: messages.length,
        currentCommand,
        messages,
        openChat,
        minimizeChat,
        expandChat,
        closeChat,
        addMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
