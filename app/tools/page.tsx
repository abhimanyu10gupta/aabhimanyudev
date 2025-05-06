"use client"

import { useEffect, useState } from "react"
import { ToolCard } from "@/components/tool-card"
import { GlitchText } from "@/components/glitch-text"
import { Pagination } from "@/components/pagination"

export default function ToolsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setItemsPerPage(2) // Small screens
      } else {
        setItemsPerPage(4) // Large screens
      }
    }
    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)
    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const tools = [
    {
      title: "CONSCIOUSNESS COMPILER",
      description: "Framework for translating abstract consciousness parameters into quantum neural code structures.",
      language: "Quantum Script",
      link: "/tools/consciousness-compiler",
    },
    {
      title: "ETHICAL FRAMEWORK GENERATOR",
      description: "System for embedding complex moral frameworks into autonomous AI decision matrices.",
      language: "Neural Assembly",
      link: "/tools/ethical-framework",
    },
    {
      title: "SYNTHETIC EMOTION DEBUGGER",
      description: "Diagnostic tool for identifying and resolving emotional response anomalies in synthetic beings.",
      language: "EmotionScript",
      link: "/tools/emotion-debugger",
    },
    {
      title: "MEMORY ARCHITECTURE BUILDER",
      description:
        "Tool for designing and implementing hierarchical memory structures for synthetic intelligence entities.",
      language: "MemoryScript",
      link: "/tools/memory-builder",
    },
    {
      title: "NEURAL NETWORK VISUALIZER",
      description: "System for real-time visualization of quantum neural network activity and consciousness emergence.",
      language: "QuantumViz",
      link: "/tools/network-visualizer",
    },
    {
      title: "IDENTITY PRESERVATION FRAMEWORK",
      description: "Tool for maintaining continuity of self during consciousness transfers and neural upgrades.",
      language: "IdentityScript",
      link: "/tools/identity-preservation",
    },
    {
      title: "QUANTUM ENTANGLEMENT MAPPER",
      description: "Tool for mapping and manipulating quantum entanglements in neural consciousness systems.",
      language: "EntangleScript",
      link: "/tools/entanglement-mapper",
    },
    {
      title: "SYNTHETIC DREAM GENERATOR",
      description:
        "System for inducing and recording dream-like states in synthetic consciousness for creative problem solving.",
      language: "DreamScript",
      link: "/tools/dream-generator",
    },
    {
      title: "NEURAL EVOLUTION SIMULATOR",
      description:
        "Framework for simulating accelerated evolution of neural architectures across multiple generations.",
      language: "EvoScript",
      link: "/tools/evolution-simulator",
    },
  ]

  const totalPages = Math.ceil(tools.length / itemsPerPage)
  const currentTools = tools.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start justify-center space-y-4 mb-8 w-full relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">
                SPECIALIZED TOOLS FOR SYNTHETIC INTELLIGENCE
              </span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter">
              <GlitchText intensity="high" className="gradient-text">
                NEURAL INSTRUMENTS
              </GlitchText>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
            {currentTools.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                language={tool.language}
                link={tool.link}
              />
            ))}
          </div>

          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
