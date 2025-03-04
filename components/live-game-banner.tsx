"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

export function LiveGameBanner() {
  const [activeDealers, setActiveDealers] = useState(42)
  const [activePlayers, setActivePlayers] = useState(156)

  // Simulate fluctuating player counts
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlayers((prev) => {
        const change = Math.floor(Math.random() * 11) - 5 // -5 to +5
        return Math.max(100, prev + change)
      })

      setActiveDealers((prev) => {
        const change = Math.floor(Math.random() * 3) - 1 // -1 to +1
        return Math.max(30, prev + change)
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-xl my-8">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(/placeholder.svg?height=600&width=1200&text=Live+Casino)` }}
      />
      <div className="hero-gradient absolute inset-0 z-20" />

      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-white border-white">
            LIVE NOW
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Live Casino Experience</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl">
            Play with real dealers in real-time. Experience the thrill of a real casino from the comfort of your home.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-primary" />
              <span>{activePlayers} Players Online</span>
            </div>
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 text-white">
              <span>{activeDealers} Live Dealers</span>
            </div>
          </div>

          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
            Join a Table Now
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

