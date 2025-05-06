"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minimize, Send, Sparkles, Trash2 } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"
import { ChatMessage } from "@/components/chat-message"
import { useChat } from "@/components/chat-provider"

export function ChatWindow() {
  const { currentCommand, messages, addMessage, minimizeChat, closeChat, clearMessages } = useChat()
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add initial response if there's a command and no existing messages
  useEffect(() => {
    if (currentCommand && messages.length > 0 && messages[messages.length - 1].isUser) {
      setIsProcessing(true)
      const timer = setTimeout(() => {
        const responses = [
          "Analyzing neural patterns... I've detected an interesting correlation in your query.",
          "Processing request... Your question touches on advanced synthetic consciousness theory.",
          "Accessing knowledge base... I have several relevant data points to share with you.",
          "Neural connection established. I understand what you're asking about.",
          "Query processed successfully. Here's what I can tell you about that topic.",
        ]

        addMessage({
          text: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        })
        setIsProcessing(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [currentCommand, messages, addMessage])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isProcessing) return

    // Add user message
    const newMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    addMessage(newMessage)
    setInputValue("")
    setIsProcessing(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've analyzed your query and found some interesting patterns in our neural database.",
        "Based on quantum neural calculations, I can provide you with a detailed response to that.",
        "Your question touches on advanced concepts in synthetic consciousness theory.",
        "I've processed your request through my neural architecture and have a response.",
        "Interesting question. My synthetic intelligence framework has several perspectives on this.",
      ]

      addMessage({
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      })
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="fixed bottom-20 right-4 w-80 md:w-96 z-50 border border-primary/20 bg-background/80 backdrop-blur-sm shadow-lg flex flex-col h-96 animate-slide-up">
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b border-primary/20">
        <div className="flex items-center space-x-2">
          <div className="relative h-6 w-6 flex items-center justify-center bg-primary/10 border border-primary/20">
            <Sparkles className="h-3 w-3 text-primary/80" />
            <div className="absolute -top-1 -right-1 h-1 w-1 bg-primary animate-pulse"></div>
          </div>
          <span className="text-xs tracking-wider text-foreground/80">
            <GlitchText intensity="low">NEURAL ASSISTANT</GlitchText>
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={clearMessages}
            className="h-6 w-6 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
            title="Clear chat history"
          >
            <Trash2 className="h-3 w-3" />
          </button>
          <button
            onClick={minimizeChat}
            className="h-6 w-6 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
          >
            <Minimize className="h-3 w-3" />
          </button>
          <button
            onClick={closeChat}
            className="h-6 w-6 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-foreground/40">No messages yet. Start a conversation.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <form onSubmit={handleSubmit} className="border-t border-primary/20 p-3 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your message..."
          className="flex-1 bg-transparent border-0 focus:ring-0 text-xs px-2 py-1.5 placeholder:text-foreground/40"
          disabled={isProcessing}
        />
        <button
          type="submit"
          className={`flex items-center justify-center h-8 w-8 ${
            inputValue && !isProcessing ? "text-primary" : "text-foreground/30"
          } transition-colors duration-300`}
          disabled={!inputValue || isProcessing}
        >
          {isProcessing ? <Sparkles className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  )
}
