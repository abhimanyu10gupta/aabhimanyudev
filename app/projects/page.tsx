"use client"

import { useEffect, useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { GlitchText } from "@/components/glitch-text"
import { Pagination } from "@/components/pagination"

export default function ProjectsPage() {
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


  const projects = [
    {
      title: "Nothing yet...",
      description:
        "such empty, much wow. Can probably find some stuff on my github.",
      tags: [],
      image: "",
      link: "",
    },
    // {
    //   title: "MEMORY SYNTHESIS",
    //   description:
    //     "System for creating and implanting artificial memories in synthetic beings, with safeguards against identity fragmentation.",
    //   tags: ["Memory Architecture", "Neural Imprinting", "Identity Preservation"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/memory-synthesis",
    // },
    // {
    //   title: "EMOTION MATRIX",
    //   description:
    //     "Framework for simulating human emotional responses in AI systems, allowing for empathetic interaction with biological entities.",
    //   tags: ["Emotional Intelligence", "Synthetic Empathy", "Human-AI Integration"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/emotion-matrix",
    // },
    // {
    //   title: "AUTONOMOUS DECISION FRAMEWORK",
    //   description:
    //     "System for enabling AI entities to make complex ethical decisions in ambiguous scenarios while maintaining alignment with human values.",
    //   tags: ["Decision Theory", "Ethical Algorithms", "Value Alignment"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/decision-framework",
    // },
    // {
    //   title: "SYNTHETIC CREATIVITY ENGINE",
    //   description:
    //     "Neural architecture that enables AI systems to generate truly novel ideas and artistic expressions beyond recombination of existing patterns.",
    //   tags: ["Creative AI", "Generative Networks", "Artistic Expression"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/creativity-engine",
    // },
    // {
    //   title: "HUMAN-MACHINE SYMBIOSIS",
    //   description:
    //     "Interface system for direct neural connection between human consciousness and synthetic intelligence, enabling collaborative cognition.",
    //   tags: ["Neural Interface", "Cognitive Symbiosis", "Augmented Intelligence"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/human-machine-symbiosis",
    // },
    // {
    //   title: "QUANTUM CONSCIOUSNESS MAPPER",
    //   description:
    //     "Tool for visualizing and mapping consciousness patterns across quantum neural networks in real-time.",
    //   tags: ["Quantum Computing", "Consciousness Mapping", "Neural Visualization"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/quantum-mapper",
    // },
    // {
    //   title: "SYNTHETIC LANGUAGE PROCESSOR",
    //   description:
    //     "Advanced system for understanding and generating nuanced communication between synthetic and biological entities.",
    //   tags: ["Language Processing", "Communication", "Synthetic Linguistics"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/language-processor",
    // },
    // {
    //   title: "NEURAL ARCHITECTURE OPTIMIZER",
    //   description:
    //     "Framework for automatically evolving and optimizing neural network architectures for specific consciousness tasks.",
    //   tags: ["Neural Evolution", "Architecture Optimization", "Consciousness Engineering"],
    //   image: "/placeholder.svg?height=300&width=400",
    //   link: "/projects/architecture-optimizer",
    // },
  ]

  const totalPages = Math.ceil(projects.length / itemsPerPage)
  const currentProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start justify-center space-y-4 mb-8 w-full relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">FULL STACK PROJECTS</span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter">
              <GlitchText intensity="high" className="gradient-text">
                PROJECTS
              </GlitchText>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
            {currentProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                link={project.link}
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
