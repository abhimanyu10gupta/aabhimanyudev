"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Code } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { GlitchText } from "@/components/glitch-text"

interface ToolCardProps {
  title: string
  description: string
  language: string
  link: string
}

export function ToolCard({ title, description, language, link }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative border border-primary/20 bg-background/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 overflow-hidden group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Holographic effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out`}
      ></div>

      <div className="p-5 relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start mb-3">
            <Link href={link} className="hover:text-primary transition-colors group-hover:underline">
              <h3 className="text-sm font-light tracking-wider flex items-center gap-1">
                <Code className="h-3 w-3 text-primary" />
                <GlitchText intensity="low">{title}</GlitchText>
              </h3>
            </Link>
            <Link href={link} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </Link>
          </div>
          <p className="text-muted-foreground text-xs line-clamp-3 mb-4">{description}</p>
        </div>

        <div>
          <Badge variant="outline" className="bg-background/50 text-foreground/80 text-[10px] px-1.5 py-0">
            {language}
          </Badge>

          <div className="mt-3 flex items-center space-x-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-primary/40"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
