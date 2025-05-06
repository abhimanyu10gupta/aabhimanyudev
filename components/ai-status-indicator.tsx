"use client"

import { useState, useEffect } from "react"
import { Brain, Signal } from "lucide-react"

export function AIStatusIndicator() {
  const [status, setStatus] = useState("ONLINE")
  const [activity, setActivity] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity(Math.floor(Math.random() * 100))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border border-primary/20 bg-background/70 backdrop-blur-sm p-2 rounded-sm">
      <div className="flex items-center space-x-3">
        <div className="relative h-8 w-8 flex items-center justify-center bg-primary/5 border border-primary/20">
          <Brain className="h-4 w-4 text-primary/80" />
          <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse"></div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-foreground/80">NEURAL ASSISTANT</span>
            <div className="h-1 w-1 rounded-full bg-primary"></div>
            <span className="text-xs text-primary">{status}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Signal className="h-3 w-3 text-primary/60" />
            <div className="h-1 bg-primary/40 w-16 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{ width: `${activity}%` }}
              ></div>
            </div>
            <span className="text-xs text-foreground/60">{activity}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
