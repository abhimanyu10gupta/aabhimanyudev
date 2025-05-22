import { GlitchText } from "@/components/glitch-text"
import { AICommandBar } from "@/components/ai-command-bar"
import { HolographicCard } from "@/components/holographic-card"

export default function Home() {
  return (
    <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Content - Centered Layout */}
          <div className="md:col-span-10 md:col-start-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-1 w-12 bg-primary"></div>
                <span className="text-xs tracking-widest text-foreground/60">AABHIMANYU GUPTA</span>
              </div>
              <h1 className="text-4xl font-light tracking-tighter sm:text-5xl md:text-6xl">
                <GlitchText intensity="high" className="gradient-text">
                  @fyreneo
                </GlitchText>
              </h1>
              <div className="flex items-center space-x-2 mt-2">
                <div className="h-1 w-3 bg-primary/60"></div>
                <span className="text-xs tracking-widest text-foreground/60">SOFTWARE ENGINEER</span>
              </div>
              <p className="max-w-[700px] text-foreground/80 md:text-xl font-light tracking-wide leading-relaxed">
                SOFTWARE ENGINEER <span className="text-primary">|</span> APPLICATION DEVELOPER <span className="text-primary">|</span> SYSTEMS ARCHITECT
              </p>
            </div>

            {/* AI Command Bar */}
            <AICommandBar />

            {/* Holographic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <HolographicCard
                title="CONSTRUCTS"
                description="Explore my projects"
                icon="BrainCircuit"
                link="/projects"
              />
              <HolographicCard
                title="THOUGHTS"
                description="Access my research logs and insights"
                icon="FileText"
                link="/blog"
              />
              <HolographicCard
                title="TOOLS"
                description="Specialized tools for random stuff"
                icon="Code"
                link="/tools"
              />
              {/* <HolographicCard
                title="CONTACT INTERFACE"
                description="Establish a neural connection"
                icon="BrainCircuit"
                link="/contact"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
