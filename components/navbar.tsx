"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, BrainCircuit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import Home from "@/app/page"
import Projects from "@/app/projects/page"
import Blog from "@/app/blog/page"
import Tools from "@/app/tools/page"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "PROJECTS", path: "/projects" },
    { name: "LOGS", path: "/blog" },
    { name: "TOOLS", path: "/tools" },
  ]

  const pages = [
    { path: "/", component: <Home />, label: "Home" },
    { path: "/projects", component: <Projects />, label: "Projects" },
    { path: "/blog", component: <Blog />, label: "Blog" },
    { path: "/tools", component: <Tools />, label: "Tools" }
  ]

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    router.push(path)
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className=" flex h-16 items-center w-full justify-end md:justify-center">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={(e) => handleNavigation(e, item.path)}
              className={`text-xs tracking-wider transition-all duration-300 hover:text-primary relative ${
                pathname === item.path
                  ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-primary"
                  : "text-foreground/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground/80 hover:text-primary hover:bg-background"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && isMobile && (
        <div className="container md:hidden py-4 bg-background/95 backdrop-blur border-b border-border">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavigation(e, item.path)}
                className={`text-sm tracking-wider transition-colors hover:text-primary ${
                  pathname === item.path ? "text-primary border-l-2 pl-2 border-primary" : "text-foreground/80 pl-2"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
