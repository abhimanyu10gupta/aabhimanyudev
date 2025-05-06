"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface GlitchTextProps {
  children: React.ReactNode
  intensity?: "low" | "medium" | "high"
  className?: string
}

export function GlitchText({ children, intensity = "medium", className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [text, setText] = useState<React.ReactNode>(children)
  const elementRef = useRef<HTMLSpanElement>(null)

  const glitchChars = "!<>-_\\/[]{}—=+*^?#________"

  const getGlitchIntensity = () => {
    switch (intensity) {
      case "low":
        return { chance: 0.2, duration: 50, interval: 3000 }
      case "high":
        return { chance: 0.6, duration: 150, interval: 1500 }
      default:
        return { chance: 0.4, duration: 100, interval: 2000 }
    }
  }

  const { chance, duration, interval } = getGlitchIntensity()

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setIsGlitching(true)

        const originalText = children

        // Create glitch effect
        const glitchEffect = setTimeout(() => {
          if (typeof originalText === "string") {
            const glitchedText = originalText
              .split("")
              .map((char) => {
                if (Math.random() < chance) {
                  return glitchChars[Math.floor(Math.random() * glitchChars.length)]
                }
                return char
              })
              .join("")

            setText(glitchedText)

            // Reset after glitch
            setTimeout(() => {
              setText(originalText)
              setIsGlitching(false)
            }, duration)
          }
        }, 0)

        return () => clearTimeout(glitchEffect)
      }
    }, interval)

    return () => clearInterval(glitchInterval)
  }, [children, chance, duration, interval])

  useEffect(() => {
    if (elementRef.current && isGlitching) {
      elementRef.current.setAttribute("data-text", typeof children === "string" ? children : "")
    }
  }, [isGlitching, children])

  return (
    <span
      ref={elementRef}
      className={`inline-block ${isGlitching ? "glitch" : ""} ${className}`}
      data-text={typeof children === "string" ? children : ""}
    >
      {text}
    </span>
  )
}
