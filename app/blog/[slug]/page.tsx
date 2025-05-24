"use client"

import { GlitchText } from "@/components/glitch-text"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


const NotionRenderer = dynamic(() => import("react-notion-x").then((m) => m.NotionRenderer), { ssr: false })


export default function BlogArticle() {
  const { slug } = useParams()
  const [recordMap, setRecordMap] = useState<any>(null)
  const [blogData, setBlogData] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/get-post/${slug}`)
      .then(res => res.json())
      .then(data => {
        setRecordMap(data.recordMap)
        setBlogData(data.blogData)
      })
  }, [slug])

  if (!recordMap) return <div>Loading...</div>

  return (
    <div className="flex items-center justify-center">
      <div className="container py-4 pb-32 px-4 md:px-6 relative z-10 ">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-1 w-12 bg-primary"></div>
              <span className="text-xs tracking-widest text-foreground/60">LOGS</span>
            </div>

          </div>

          <Card className="w-full max-w-4xl bg-background/30 backdrop-blur-sm border-primary/20">
            <h1 className="text-3xl text-center pt-4font-light tracking-tighter">
                <GlitchText intensity="high" className="gradient-text">
                  {blogData.title}
                </GlitchText>
              </h1>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="text-xs text-foreground/60">{blogData.date}</div>
                  <div className="flex gap-2">
                    {blogData.tags.map((tag: string) => (
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
{/* 
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
              </div> */}
              <div className="notion-renderer">
                <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={true}  />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 