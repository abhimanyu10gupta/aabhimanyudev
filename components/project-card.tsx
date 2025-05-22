"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { GlitchText } from "@/components/glitch-text"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

export function ProjectCard({ title, description, tags, image, link }: ProjectCardProps) {
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

      <div className="flex md:grid md:grid-cols-2 h-full">
        <div className="md:relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background z-10 opacity-30 group-hover:opacity-10 transition-opacity duration-500"></div>
          {/* <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 filter saturate-50 group-hover:saturate-100"
          /> */}
        </div>

        <div className="p-4 relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-start">
              <Link href={link} className="hover:text-primary transition-colors">
                <h3 className="text-sm font-light tracking-wider mb-2">
                  <GlitchText intensity="low">{title}</GlitchText>
                </h3>
              </Link>
              <Link href={link} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </Link>
            </div>

            <p className="text-muted-foreground text-xs line-clamp-3 mb-3">{description}</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-background/50 text-foreground/80 text-[10px] px-1.5 py-0"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="bg-background/50 text-foreground/80 text-[10px] px-1.5 py-0">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-primary/40"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
