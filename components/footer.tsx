import Link from "next/link"
import { Github, Linkedin, Mail, Code } from "lucide-react"
import { GlitchText } from "@/components/glitch-text"

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border/30 bg-background/30 backdrop-blur-sm z-10">
      <div className=" flex flex-col items-center justify-between gap-4 py-4 px-4 md:h-16 md:flex-row md:py-0 relative z-10">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 bg-primary/40"></div>
            <p className="text-center text-xs leading-loose text-foreground/60 md:text-left tracking-wider">
              <GlitchText intensity="high">© 2025 AABHIMANYU.DEV</GlitchText>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="relative h-8 w-8 flex items-center justify-center border border-border/50 bg-background/30 group-hover:border-primary/30 transition-colors">
              <Github className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
              <div className="absolute top-0 right-0 h-1 w-1 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
            <div className="relative h-8 w-8 flex items-center justify-center border border-border/50 bg-background/30 group-hover:border-primary/30 transition-colors">
              <Linkedin className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
              <div className="absolute top-0 right-0 h-1 w-1 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>
          <Link href="mailto:contact@example.com" className="group">
            <div className="relative h-8 w-8 flex items-center justify-center border border-border/50 bg-background/30 group-hover:border-primary/30 transition-colors">
              <Mail className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
              <div className="absolute top-0 right-0 h-1 w-1 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>
          <Link href="https://codepen.io" target="_blank" rel="noopener noreferrer" className="group">
            <div className="relative h-8 w-8 flex items-center justify-center border border-border/50 bg-background/30 group-hover:border-primary/30 transition-colors">
              <Code className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
              <div className="absolute top-0 right-0 h-1 w-1 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
