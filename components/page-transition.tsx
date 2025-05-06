"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence, PanInfo } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
}

const pageOrder = ["/", "/projects", "/blog", "/tools"]

export function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Find current index in page order
  const currentIndex = pageOrder.indexOf(pathname)
  const nextIndex = currentIndex >= pageOrder.length - 1 ? 0 : currentIndex + 1
  const prevIndex = currentIndex <= 0 ? pageOrder.length - 1 : currentIndex - 1
  const nextPage = pageOrder[nextIndex]
  const prevPage = pageOrder[prevIndex]

  // Handle navigation from tab clicks
  useEffect(() => {
    if (pathname !== prevPathname) {
      // Determine direction for the animation
      const pathIndex = pageOrder.indexOf(pathname)
      const prevPathIndex = pageOrder.indexOf(prevPathname)
      if (pathIndex === -1 || prevPathIndex === -1) {
        setDirection(null)
      } else if (pathIndex === 0 && prevPathIndex === pageOrder.length - 1) {
        setDirection("left")
      } else if (pathIndex === pageOrder.length - 1 && prevPathIndex === 0) {
        setDirection("right")
      } else {
        setDirection(pathIndex > prevPathIndex ? "left" : "right")
      }
      setPrevPathname(pathname)
    }
  }, [pathname, prevPathname])

  // Handle swipe end
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (currentIndex === -1) return
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      setDirection("right")
      router.push(prevPage)
    } else if (info.offset.x < -swipeThreshold) {
      setDirection("left")
      router.push(nextPage)
    }
  }

  // Only animate the new page sliding in
  const pageVariants = {
    initial: (direction: "left" | "right" | null) => ({
      x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 30 },
        opacity: { duration: 0.7 }
      }
    },
    exit: {} // No exit animation
  }

  return (
    <div className="w-full h-full overflow-hidden touch-pan-y relative">
      <motion.div
        className="w-full h-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ x: 0 }}
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={pathname}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}