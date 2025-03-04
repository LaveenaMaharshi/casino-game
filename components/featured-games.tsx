"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { GameCard } from "@/components/game-card"

export default function FeaturedGames() {
  const [activeCategory, setActiveCategory] = useState("popular")

  const categories = [
    { id: "popular", name: "Popular" },
    { id: "new", name: "New" },
    { id: "slots", name: "Slots" },
    { id: "table", name: "Table Games" },
    { id: "jackpot", name: "Jackpots" },
  ]

  const games = {
    popular: [
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
    ],
    new: [
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
    ],
    slots: [
      {
        id: 4,
        title: "Fortune Tiger",
        image: "/placeholder.svg?height=300&width=400",
        category: "Slots",
        isNew: false,
        isHot: true,
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
        id: 9,
        title: "Lucky Dragon",
        image: "/placeholder.svg?height=300&width=400",
        category: "Slots",
        isNew: true,
        isHot: true,
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
        id: 13,
        title: "Fruit Fiesta",
        image: "/placeholder.svg?height=300&width=400",
        category: "Slots",
        isNew: false,
        isHot: false,
      },
    ],
    table: [
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
        id: 5,
        title: "Golden Baccarat",
        image: "/placeholder.svg?height=300&width=400",
        category: "Baccarat",
        isNew: false,
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
        id: 10,
        title: "VIP Blackjack",
        image: "/placeholder.svg?height=300&width=400",
        category: "Blackjack",
        isNew: true,
        isHot: false,
      },
    ],
    jackpot: [
      {
        id: 6,
        title: "Diamond Jackpot",
        image: "/placeholder.svg?height=300&width=400",
        category: "Slots",
        isNew: false,
        isHot: true,
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
    ],
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Games</h2>
        <Link href="/games" className="text-primary hover:underline flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {games[activeCategory as keyof typeof games].map((game, index) => (
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
    </section>
  )
}

