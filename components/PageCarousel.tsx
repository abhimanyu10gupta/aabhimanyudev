"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"

interface PageCarouselProps {
  // This component needs all page components passed in
  pages: {
    path: string;
    component: React.ReactNode;
  }[];
}

export function PageCarousel({ pages }: PageCarouselProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Find the current index based on the pathname
  const currentPageIndex = pages.findIndex(page => page.path === pathname) || 0
  
  // Initialize Embla carousel with options
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,            // Enable looping
    duration: 10,             // Animation speed (higher = slower)
    align: "center",       // Center alignment
    dragFree: false,       // Snap to slides
    containScroll: "trimSnaps", // Prevent overscrolling
    startIndex: currentPageIndex,
  })

  // Handle slide changes - update URL to match current slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    
    // Only update the URL if we're on a different page
    if (pages[index].path !== pathname) {
      router.push(pages[index].path)
    }
  }, [emblaApi, pathname, router, pages])

  // Set up the onSelect callback
  useEffect(() => {
    if (!emblaApi) return
    
    // When the carousel is ready, register the onSelect callback
    emblaApi.on("select", onSelect)
    
    // Cleanup
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onSelect])

  // When URL changes from outside (clicking tabs), update carousel position
  useEffect(() => {
    if (!emblaApi) return
    
    const targetIndex = pages.findIndex(page => page.path === pathname)
    if (targetIndex !== -1) {
      emblaApi.scrollTo(targetIndex)
    }
  }, [pathname, emblaApi, pages])

  return (
    <div className="overflow-hidden w-full h-full" ref={emblaRef}>
      <div className="flex h-full">
        {/* Render all pages as slides */}
        {pages.map((page, index) => (
          <div key={page.path} className="flex-[0_0_100%] min-w-0 h-full relative">
            {page.component}
          </div>
        ))}
      </div>
    </div>
  )
}