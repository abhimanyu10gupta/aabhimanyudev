"use client"

import type React from "react"
import { useState } from "react"

interface FluidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary" | "outline"
}

export function FluidButton({ children, onClick, className = "", variant = "primary" }: FluidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20"
      case "outline":
        return "bg-transparent text-foreground border border-border hover:bg-muted"
      default:
        return "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
    }
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative px-6 py-2 overflow-hidden transition-all duration-300 rounded-sm ${getVariantClasses()} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-0 transform transition-transform duration-500 ${
          isHovered ? "scale-x-100" : "scale-x-0"
        } ${variant === "primary" ? "bg-primary/10" : variant === "secondary" ? "bg-secondary/10" : "bg-muted/50"}`}
        style={{ transformOrigin: "left" }}
      ></span>
    </button>
  )
}
