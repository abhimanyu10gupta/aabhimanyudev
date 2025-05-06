"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (page: number) => {
    // Prevent changing to invalid pages
    if (page < 1 || page > totalPages) return

    // Update the page state
    onPageChange(page)
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-primary/30 bg-background/30 text-foreground/60 hover:text-primary hover:bg-primary/10"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>
      <div className="text-xs tracking-wider text-foreground/60">
        {currentPage} <span className="text-primary/60">/</span> {totalPages}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-primary/30 bg-background/30 text-foreground/60 hover:text-primary hover:bg-primary/10"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}
