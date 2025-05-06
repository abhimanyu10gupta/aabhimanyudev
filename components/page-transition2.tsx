// ... existing imports ...
"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence, PanInfo } from "framer-motion"

interface PageTransitionProps {
  children: React.ReactNode
}

const pageOrder = ["/", "/projects", "/blog", "/tools"]

export function PageTransition2({ children }: PageTransitionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)
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
      setIsAnimating(true)
      setPrevPathname(pathname)
    }
  }, [pathname, prevPathname])

  // Reset animation state when done
  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  // Handle swipe end
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isAnimating || currentIndex === -1) return
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      router.push(prevPage)
    } else if (info.offset.x < -swipeThreshold) {
      router.push(nextPage)
    }
  }

  // Fade-only variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className="w-full h-full overflow-hidden touch-pan-y relative">
      <motion.div
        className="w-full h-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ x: 0 }} // No horizontal animation, just fade
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full"
            onAnimationComplete={handleAnimationComplete}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}