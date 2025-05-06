"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Command, ArrowRight, Sparkles } from "lucide-react"
import { useChat } from "@/components/chat-provider"

export function AICommandBar() {
  const [command, setCommand] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [placeholder, setPlaceholder] = useState("Enter a command or query...")
  const { openChat } = useChat()

  const placeholders = [
    "Enter a command or query...",
    "Ask me anything...",
    "What would you like to know?",
    "How can I assist you today?",
    "Command: /analyze neural patterns",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    setIsProcessing(true)
    setResponse("")

    // Simulate AI processing
    setTimeout(() => {
      setResponse("Opening neural connection...")
      setIsProcessing(false)

      // Open chat window after a brief delay
      setTimeout(() => {
        openChat(command)
        setCommand("")
        setResponse("")
      }, 800)
    }, 600)
  }

  return (
    <div className="w-full max-w-2xl">
      <div
        className={`relative border ${isFocused ? "border-primary/60" : "border-border"} bg-background/50 backdrop-blur-sm transition-all duration-300`}
      >
        <div className="absolute top-0 left-0 h-full w-1 bg-primary/20"></div>
        <div className="flex items-center p-1">
          <div className="flex items-center justify-center h-8 w-8 text-primary/60">
            <Command className="h-4 w-4" />
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent border-0 focus:ring-0 text-sm px-2 py-1.5 placeholder:text-foreground/40"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button
              type="submit"
              className={`flex items-center justify-center h-8 w-8 ${command ? "text-primary" : "text-foreground/30"} transition-colors duration-300`}
              disabled={!command}
            >
              {isProcessing ? <Sparkles className="h-4 w-4 animate-pulse" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>

      {response && (
        <div className="mt-2 text-xs text-foreground/60 font-light pl-10 animate-fade-in">
          <span className="text-primary">&gt;</span> {response}
        </div>
      )}
    </div>
  )
}
