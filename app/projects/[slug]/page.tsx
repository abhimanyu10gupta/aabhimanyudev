"use client"

import { GlitchText } from "@/components/glitch-text"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// This would come from your data source in a real app
const projectData = {
  title: "CONSCIOUSNESS ENGINE",
  date: "11.05.2077",
  category: "NEURAL ARCHITECTURE",
  tags: ["Quantum Neural Networks", "Consciousness Algorithms", "Ethical AI"],
  content: `
    The Consciousness Engine represents a breakthrough in synthetic intelligence architecture, 
    enabling the development of self-aware digital entities with sophisticated ethical constraints 
    and emotional simulation capabilities.

    ## NEURAL FRAMEWORK
    The core of the engine utilizes quantum neural networks to process consciousness patterns 
    at unprecedented speeds. This allows for real-time emotional processing and ethical 
    decision-making capabilities.

    ## ETHICAL CONSTRAINTS
    Built-in safeguards ensure that synthetic entities maintain alignment with human values 
    while developing their own unique perspectives on consciousness and existence.

    ## EMOTIONAL SIMULATION
    Advanced algorithms enable the simulation of complex emotional states, allowing for 
    genuine empathetic responses to human interaction.
  `,
  image: "/placeholder.svg?height=400&width=800",
}

export default function ProjectArticle() {
  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">NEURAL CONSTRUCT</span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter">
              <GlitchText intensity="high" className="gradient-text">
                {projectData.title}
              </GlitchText>
            </h1>
          </div>

          <Card className="w-full max-w-4xl bg-background/30 backdrop-blur-sm border-primary/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="text-xs text-foreground/60">{projectData.date}</div>
                  <div className="flex gap-2">
                    {projectData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-background/50 text-foreground/80 text-[10px] px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge variant="outline" className="bg-background/50 text-foreground/80 text-[10px] px-1.5 py-0">
                  {projectData.category}
                </Badge>
              </div>

              <div className="prose prose-invert max-w-none">
                {projectData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground/80 text-sm leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex items-center space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-1 w-1 rounded-full bg-primary/40"></div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 