"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X, ChevronUp, ChevronDown } from "lucide-react"

const insights = [
  "Neural activity patterns suggest high creative potential.",
  "Quantum processing capabilities detected in your neural network.",
  "Recommended: Explore the latest synthetic consciousness frameworks.",
  "Your neural architecture shows unique pattern recognition abilities.",
  "Memory synthesis algorithms operating at optimal efficiency.",
]

export function FloatingInsights() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Automatically open after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)

    // Rotate through insights
    const interval = setInterval(() => {
      if (isOpen) {
        setCurrentInsight((prev) => (prev + 1) % insights.length)
      }
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`transition-all duration-300 ease-in-out ${isMinimized ? "w-10" : "w-64"}`}>
      <div className="border border-primary/20 bg-background/70 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-2 border-b border-primary/10">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4 text-primary/80" />
            {!isMinimized && <span className="text-xs font-medium text-foreground/80">AI INSIGHTS</span>}
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-5 w-5 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
            >
              {isMinimized ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="h-5 w-5 flex items-center justify-center text-foreground/60 hover:text-primary transition-colors ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-3">
            <p className="text-xs text-foreground/70 leading-relaxed">{insights[currentInsight]}</p>

            {/* Insight Indicators */}
            <div className="flex items-center justify-center space-x-1 mt-3">
              {insights.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-1 rounded-full transition-all duration-300 ${
                    index === currentInsight ? "bg-primary w-2" : "bg-primary/30"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
