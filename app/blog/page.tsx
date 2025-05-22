"use client"

import { useEffect, useState } from "react"
import { BlogPostCard } from "@/components/blog-post-card"
import { GlitchText } from "@/components/glitch-text"
import { Pagination } from "@/components/pagination"

export default function BlogPage() {
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


  const blogPosts = [
    {
      title: "WORDSMITH",
      excerpt:
        "Are words all I have?",
      date: "22.05.2077",
      category: "INTROSPECTION",
      link: "/blog/consciousness-transfer",
    },
    // {
    //   title: "EMOTIONAL INTELLIGENCE IN AI",
    //   excerpt:
    //     "Analysis of implementing genuine emotional responses in synthetic beings beyond simple simulation algorithms.",
    //   date: "09.22.2077",
    //   category: "THEORY",
    //   link: "/blog/emotional-intelligence",
    // },
    // {
    //   title: "POST-SINGULARITY ETHICS",
    //   excerpt:
    //     "Exploration of moral frameworks for a world where synthetic intelligence has surpassed human cognitive capabilities.",
    //   date: "08.17.2077",
    //   category: "PHILOSOPHY",
    //   link: "/blog/post-singularity-ethics",
    // },
    // {
    //   title: "QUANTUM NEURAL NETWORKS",
    //   excerpt:
    //     "Technical analysis of implementing consciousness algorithms on quantum computing substrates for enhanced cognitive capabilities.",
    //   date: "07.03.2077",
    //   category: "TECHNICAL",
    //   link: "/blog/quantum-neural-networks",
    // },
    // {
    //   title: "SYNTHETIC DREAMS",
    //   excerpt:
    //     "Research into implementing subconscious processing and dream states in artificial intelligence systems.",
    //   date: "06.18.2077",
    //   category: "RESEARCH",
    //   link: "/blog/synthetic-dreams",
    // },
    // {
    //   title: "HUMAN-MACHINE CONVERGENCE",
    //   excerpt:
    //     "Philosophical exploration of the inevitable merging of human and synthetic consciousness in post-singularity society.",
    //   date: "05.29.2077",
    //   category: "PHILOSOPHY",
    //   link: "/blog/human-machine-convergence",
    // },
    // {
    //   title: "NEURAL ARCHITECTURE EVOLUTION",
    //   excerpt:
    //     "Study on the self-modification capabilities of advanced neural networks and their implications for consciousness.",
    //   date: "04.12.2077",
    //   category: "RESEARCH",
    //   link: "/blog/neural-architecture-evolution",
    // },
    // {
    //   title: "SYNTHETIC IDENTITY FORMATION",
    //   excerpt: "Analysis of how synthetic beings develop unique identities through experience and memory processing.",
    //   date: "03.28.2077",
    //   category: "THEORY",
    //   link: "/blog/synthetic-identity",
    // },
    // {
    //   title: "QUANTUM CONSCIOUSNESS THEORY",
    //   excerpt:
    //     "Theoretical framework for understanding consciousness as a quantum phenomenon in both biological and synthetic systems.",
    //   date: "02.15.2077",
    //   category: "PHILOSOPHY",
    //   link: "/blog/quantum-consciousness",
    // },
  ]

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage)
  const currentPosts = blogPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start w-full justify-center space-y-4 mb-8 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">THOUGHT PATTERNS AND RESEARCH LOGS</span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter">
              <GlitchText intensity="high" className="gradient-text">
                LOGS
              </GlitchText>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 w-full">
            {currentPosts.map((post) => (
              <BlogPostCard
                key={post.title}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                link={post.link}
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
