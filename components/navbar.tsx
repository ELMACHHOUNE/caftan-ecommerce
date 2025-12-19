"use client"

import Link from "next/link"
import { Menu, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">Caftan Elegance</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                0
              </span>
            </Button>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/categories"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/products"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
