"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GameCard } from "@/components/game-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function GameGrid() {
  const [searchQuery, setSearchQuery] = useState("")

  const games = [
    {
      id: 1,
      title: "Royal Flush Poker",
      image: "/placeholder.svg?height=300&width=400",
      category: "Poker",
      isNew: false,
      isHot: true,
    },
    {
      id: 2,
      title: "Lucky Spin Roulette",
      image: "/placeholder.svg?height=300&width=400",
      category: "Roulette",
      isNew: false,
      isHot: true,
    },
    {
      id: 3,
      title: "Blackjack Pro",
      image: "/placeholder.svg?height=300&width=400",
      category: "Blackjack",
      isNew: false,
      isHot: false,
    },
    {
      id: 4,
      title: "Fortune Tiger",
      image: "/placeholder.svg?height=300&width=400",
      category: "Slots",
      isNew: false,
      isHot: true,
    },
    {
      id: 5,
      title: "Golden Baccarat",
      image: "/placeholder.svg?height=300&width=400",
      category: "Baccarat",
      isNew: false,
      isHot: false,
    },
    {
      id: 6,
      title: "Diamond Jackpot",
      image: "/placeholder.svg?height=300&width=400",
      category: "Slots",
      isNew: false,
      isHot: true,
    },
    {
      id: 7,
      title: "Cosmic Spins",
      image: "/placeholder.svg?height=300&width=400",
      category: "Slots",
      isNew: true,
      isHot: false,
    },
    {
      id: 8,
      title: "Mega Poker",
      image: "/placeholder.svg?height=300&width=400",
      category: "Poker",
      isNew: true,
      isHot: false,
    },
    {
      id: 9,
      title: "Lucky Dragon",
      image: "/placeholder.svg?height=300&width=400",
      category: "Slots",
      isNew: true,
      isHot: true,
    },
    {
      id: 10,
      title: "VIP Blackjack",
      image: "/placeholder.svg?height=300&width=400",
      category: "Blackjack",
      isNew: true,
      isHot: false,
    },
    {
      id: 11,
      title: "Gold Rush",
      image: "/placeholder.svg?height=300&width=400",
      category: "Slots",
      isNew: true,
      isHot: false,
    },
    {
      id: 12,
      title: "Speed Baccarat",
      image: "/placeholder.svg?height=300&width=400",
      category: "Baccarat",
      isNew: true,
      isHot: true,
    },
    {
      id: 13,
      title: "Fruit Fiesta",
      image: "/placeholder.svg?height=300&width=400",
      category: "Slots",
      isNew: false,
      isHot: false,
    },
    {
      id: 14,
      title: "Mega Millions",
      image: "/placeholder.svg?height=300&width=400",
      category: "Jackpot",
      isNew: false,
      isHot: true,
    },
    {
      id: 15,
      title: "Progressive Paradise",
      image: "/placeholder.svg?height=300&width=400",
      category: "Jackpot",
      isNew: false,
      isHot: false,
    },
    {
      id: 16,
      title: "Jackpot Joker",
      image: "/placeholder.svg?height=300&width=400",
      category: "Jackpot",
      isNew: true,
      isHot: false,
    },
    {
      id: 17,
      title: "Treasure Chest",
      image: "/placeholder.svg?height=300&width=400",
      category: "Jackpot",
      isNew: false,
      isHot: true,
    },
    {
      id: 18,
      title: "Lucky Millions",
      image: "/placeholder.svg?height=300&width=400",
      category: "Jackpot",
      isNew: false,
      isHot: false,
    },
  ]

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search games..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No games found</h3>
          <p className="text-muted-foreground mb-4">Try a different search term</p>
          <Button onClick={() => setSearchQuery("")} variant="outline">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}

