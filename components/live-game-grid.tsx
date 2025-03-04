"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LiveGameCard } from "@/components/live-game-card"

export function LiveGameGrid() {
  const [games, setGames] = useState([
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
    {
      id: 7,
      title: "Infinite Blackjack",
      dealer: "Charlotte",
      players: 15,
      minBet: 5,
      maxBet: 2500,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 8,
      title: "Power Blackjack",
      dealer: "Daniel",
      players: 7,
      minBet: 25,
      maxBet: 5000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 9,
      title: "Live Craps",
      dealer: "Amelia",
      players: 10,
      minBet: 10,
      maxBet: 3000,
      image: "/placeholder.svg?height=300&width=400",
    },
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {games.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <LiveGameCard game={game} />
        </motion.div>
      ))}
    </div>
  )
}

