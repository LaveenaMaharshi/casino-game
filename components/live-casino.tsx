"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveGameCard } from "@/components/live-game-card"

export default function LiveCasino() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const liveGames = [
    {
      id: 1,
      title: "VIP Blackjack",
      dealer: "Emma",
      players: 4,
      minBet: 25,
      maxBet: 5000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Speed Roulette",
      dealer: "James",
      players: 12,
      minBet: 10,
      maxBet: 2000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Lightning Baccarat",
      dealer: "Sophia",
      players: 8,
      minBet: 50,
      maxBet: 10000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "Casino Hold'em",
      dealer: "Michael",
      players: 6,
      minBet: 20,
      maxBet: 3000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      title: "Dream Catcher",
      dealer: "Olivia",
      players: 24,
      minBet: 5,
      maxBet: 1000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 6,
      title: "Immersive Roulette",
      dealer: "William",
      players: 18,
      minBet: 15,
      maxBet: 4000,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const visibleItems = 3
  const maxIndex = liveGames.length - visibleItems

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = currentIndex * (containerRef.current.scrollWidth / liveGames.length)
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  return (
    <section className="py-12 bg-muted/30 rounded-xl p-8 my-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Live Casino</h2>
        <Link href="/live-casino" className="text-primary hover:underline flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="relative">
        <div ref={containerRef} className="flex overflow-x-hidden gap-6 pb-4 scroll-smooth">
          {liveGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <LiveGameCard game={game} />
            </motion.div>
          ))}
        </div>

        <Button
          variant="secondary"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-background/80 backdrop-blur-sm z-10"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous</span>
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-background/80 backdrop-blur-sm z-10"
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div className="mt-8 text-center">
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/live-casino">Join Live Tables</Link>
        </Button>
      </div>
    </section>
  )
}

