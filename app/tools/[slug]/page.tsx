"use client"

import { GlitchText } from "@/components/glitch-text"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// This would come from your data source in a real app
const toolData = {
  title: "NEURAL PATTERN ANALYZER",
  date: "11.05.2077",
  category: "ANALYSIS TOOL",
  tags: ["Neural Analysis", "Pattern Recognition", "Quantum Computing"],
  content: `
    A specialized tool for analyzing and visualizing neural patterns in synthetic intelligence 
    systems. This instrument enables researchers to map and understand the complex interactions 
    within artificial neural networks.

    ## PATTERN DETECTION
    Advanced algorithms detect and classify neural patterns in real-time, providing insights 
    into the decision-making processes of synthetic intelligence systems.

    ## VISUALIZATION
    Interactive 3D visualization of neural networks allows researchers to explore the 
    connections and patterns that emerge during cognitive processes.

    ## QUANTUM INTEGRATION
    Built-in quantum computing capabilities enable the analysis of complex neural patterns 
    that would be impossible to process using classical computing methods.
  `,
  code: `// Example usage of the Neural Pattern Analyzer
const analyzer = new NeuralPatternAnalyzer({
  quantumEnabled: true,
  visualizationMode: '3D',
  patternDetection: {
    sensitivity: 0.8,
    realTime: true
  }
});

analyzer.connect(network)
  .then(patterns => {
    console.log('Neural patterns detected:', patterns);
    return analyzer.visualize();
  });`
}

export default function ToolArticle() {
  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">NEURAL INSTRUMENT</span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter">
              <GlitchText intensity="high" className="gradient-text">
                {toolData.title}
              </GlitchText>
            </h1>
          </div>

          <Card className="w-full max-w-4xl bg-background/30 backdrop-blur-sm border-primary/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="text-xs text-foreground/60">{toolData.date}</div>
                  <div className="flex gap-2">
                    {toolData.tags.map((tag) => (
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
                  {toolData.category}
                </Badge>
              </div>

              <div className="prose prose-invert max-w-none">
                {toolData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-foreground/80 text-sm leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-6 p-4 bg-background/50 rounded-lg border border-primary/20">
                <pre className="text-xs text-foreground/80 overflow-x-auto">
                  <code>{toolData.code}</code>
                </pre>
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