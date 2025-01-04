"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024) // Considerando telas menores que 1024px como "pequenas"
    }

    handleScroll() // Verifica o scroll inicial
    handleResize() // Verifica o tamanho da tela inicial

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const navItems = [
    { label: "Início", href: "/" },
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Apoiadores", href: "/apoiadores" },
    { label: "Eventos", href: "/eventos" },
    { label: "Cursos", href: "/cursos" },
    { label: "Projetos", href: "/projetos" },
  ]

  const shouldShowBackground = isScrolled || isSmallScreen

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        shouldShowBackground
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#09e75e] via-[#5ce1e6] to-[#fd4ce0] text-transparent bg-clip-text"
          >
            OS ESTAGIÁRIOS
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  Menu <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-2 py-1 text-foreground/70 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

