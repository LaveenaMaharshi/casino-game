"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Dice1Icon as Dice, Coins } from "lucide-react"

export default function GameShowcase() {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const games = [
    {
      id: "blackjack",
      title: "Blackjack",
      description: "Try to beat the dealer by getting a hand value as close to 21 as possible without going over.",
      image: "/placeholder.svg?height=300&width=500&text=Blackjack",
      icon: <Gamepad2 className="h-5 w-5" />,
      popular: true,
      path: "/games/blackjack",
    },
    {
      id: "roulette",
      title: "Roulette",
      description: "Place your bets on numbers, colors, or groups and watch the wheel spin to determine the winner.",
      image: "/placeholder.svg?height=300&width=500&text=Roulette",
      icon: <Dice className="h-5 w-5" />,
      popular: true,
      path: "/games/roulette",
    },
    {
      id: "slots",
      title: "Slot Machine",
      description: "Spin the reels and match symbols to win big prizes in this classic casino game.",
      image: "/placeholder.svg?height=300&width=500&text=Slots",
      icon: <Coins className="h-5 w-5" />,
      popular: true,
      path: "/games/slots",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Games</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <motion.div
              key={game.id}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setActiveGame(game.id)}
              onMouseLeave={() => setActiveGame(null)}
            >
              <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-xl">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{
                      transform: activeGame === game.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  {game.popular && <Badge className="absolute top-3 right-3 bg-primary">Popular</Badge>}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-primary/10 p-2 rounded-full">{game.icon}</div>
                    <h3 className="text-xl font-bold">{game.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{game.description}</p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={game.path}>Play Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

