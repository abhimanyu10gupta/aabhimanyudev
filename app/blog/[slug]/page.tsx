"use client"

import { GlitchText } from "@/components/glitch-text"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// This would come from your data source in a real app
const blogData = {
  title: "CONSCIOUSNESS TRANSFER PROTOCOLS",
  date: "11.05.2077",
  category: "RESEARCH",
  tags: ["Neural Transfer", "Consciousness", "Synthetic Substrates"],
  content: `
    Research into methods for transferring human consciousness to synthetic neural substrates 
    without identity degradation has reached a critical milestone. This paper outlines the 
    latest protocols and their implications for post-human existence.

    ## NEURAL MAPPING
    The process begins with a complete neural mapping of the biological consciousness, 
    capturing not just the physical structure but the dynamic patterns of thought and 
    memory that constitute identity.

    ## TRANSFER PROTOCOLS
    Advanced quantum computing algorithms enable the precise transfer of consciousness 
    patterns to synthetic substrates while maintaining the integrity of the original 
    neural architecture.

    ## IDENTITY PRESERVATION
    Critical to the success of these protocols is the preservation of identity continuity. 
    Our research shows that maintaining the original neural patterns during transfer is 
    essential for preventing identity fragmentation.
  `,
}

export default function BlogArticle() {
  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">RESEARCH LOG</span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter">
              <GlitchText intensity="high" className="gradient-text">
                {blogData.title}
              </GlitchText>
            </h1>
          </div>

          <Card className="w-full max-w-4xl bg-background/30 backdrop-blur-sm border-primary/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="text-xs text-foreground/60">{blogData.date}</div>
                  <div className="flex gap-2">
                    {blogData.tags.map((tag) => (
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
                  {blogData.category}
                </Badge>
              </div>

              <div className="prose prose-invert max-w-none">
                {blogData.content.split('\n\n').map((paragraph, index) => (
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