"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface LiveGame {
  id: number
  title: string
  dealer: string
  players: number
  minBet: number
  maxBet: number
  image: string
}

interface LiveGameCardProps {
  game: LiveGame
}

export function LiveGameCard({ game }: LiveGameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-lg h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.image || "/placeholder.svg"}
          alt={game.title}
          className="object-cover w-full h-full transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary">
              Live
            </Badge>
            <div className="flex items-center text-white text-sm">
              <Users className="h-3 w-3 mr-1" />
              <span>{game.players} players</span>
            </div>
          </div>
          <h3 className="text-white text-lg font-bold">{game.title}</h3>
          <p className="text-white/80 text-sm">Dealer: {game.dealer}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>
              ${game.minBet} - ${game.maxBet}
            </span>
          </div>
        </div>

        <Button asChild className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/live-casino/${game.id}`}>Join Table</Link>
        </Button>
      </div>

      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href={`/live-casino/${game.id}`}>Play Now</Link>
          </Button>
        </motion.div>
      )}
    </div>
  )
}

