"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, User, Wallet, LogIn, LogOut, Home, Gamepad2, Video, Gift, Trophy } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LoginModal } from "@/components/login-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">LC</div>
            </div>
            <span className="hidden md:inline-block text-xl font-bold">LuxCasino</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/games" className="text-sm font-medium transition-colors hover:text-primary">
            Games
          </Link>
          <Link href="/live-casino" className="text-sm font-medium transition-colors hover:text-primary">
            Live Casino
          </Link>
          <Link href="/promotions" className="text-sm font-medium transition-colors hover:text-primary">
            Promotions
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-primary">
            Leaderboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/wallet">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Wallet className="h-4 w-4" />
                  <span className="sr-only">Wallet</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wallet">
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Wallet</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={() => setShowLoginModal(true)} className="bg-primary hover:bg-primary/90">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">LC</div>
              </div>
              <span className="text-xl font-bold">LuxCasino</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={closeMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="container grid gap-6 py-6">
            <Link href="/" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Home className="h-5 w-5" />
              Home
            </Link>
            <Link href="/games" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Gamepad2 className="h-5 w-5" />
              Games
            </Link>
            <Link href="/live-casino" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Video className="h-5 w-5" />
              Live Casino
            </Link>
            <Link href="/promotions" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Gift className="h-5 w-5" />
              Promotions
            </Link>
            <Link href="/leaderboard" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
              <Trophy className="h-5 w-5" />
              Leaderboard
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/profile" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link href="/wallet" className="flex items-center gap-2 text-lg font-medium" onClick={closeMenu}>
                  <Wallet className="h-5 w-5" />
                  Wallet
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="flex items-center justify-start gap-2 text-lg font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </>
            )}
          </nav>
        </div>
      )}

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}
    </header>
  )
}

