"use client"

import { useState } from "react"
import Link from "next/link"
import { BrainCircuit, FileText, Code, ArrowUpRight } from "lucide-react"

interface HolographicCardProps {
  title: string
  description: string
  icon: "BrainCircuit" | "FileText" | "Code"
  link: string
}

export function HolographicCard({ title, description, icon, link }: HolographicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (icon) {
      case "BrainCircuit":
        return <BrainCircuit className="h-4 w-4" />
      case "FileText":
        return <FileText className="h-4 w-4" />
      case "Code":
        return <Code className="h-4 w-4" />
      default:
        return <BrainCircuit className="h-4 w-4" />
    }
  }

  return (
    <Link
      href={link}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative border border-primary/20 bg-background/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Holographic effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out`}
        ></div>

        <div className="relative p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary/80">
                {getIcon()}
              </div>
              <span className="text-xs tracking-wider text-foreground/60">{title}</span>
            </div>
            <ArrowUpRight
              className={`h-4 w-4 transition-opacity duration-300 ${isHovered ? "opacity-100 text-primary" : "opacity-0"}`}
            />
          </div>

          <p className="text-xs text-foreground/70 leading-relaxed">{description}</p>

          <div className="mt-3 flex items-center space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-primary/40"></div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
