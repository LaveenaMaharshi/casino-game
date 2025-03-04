"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Trophy, Medal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("daily")

  const leaderboardData = {
    daily: [
      {
        rank: 1,
        username: "PokerKing",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 12500,
        game: "Blackjack",
      },
      {
        rank: 2,
        username: "LuckySpinner",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 8750,
        game: "Roulette",
      },
      { rank: 3, username: "SlotMaster", avatar: "/placeholder.svg?height=40&width=40", winnings: 6200, game: "Slots" },
      { rank: 4, username: "CardShark", avatar: "/placeholder.svg?height=40&width=40", winnings: 4800, game: "Poker" },
      {
        rank: 5,
        username: "GoldenHand",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 3500,
        game: "Baccarat",
      },
    ],
    weekly: [
      {
        rank: 1,
        username: "JackpotHunter",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 45000,
        game: "Slots",
      },
      {
        rank: 2,
        username: "RoyalFlush",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 32000,
        game: "Poker",
      },
      {
        rank: 3,
        username: "BlackjackPro",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 28500,
        game: "Blackjack",
      },
      {
        rank: 4,
        username: "RouletteQueen",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 21000,
        game: "Roulette",
      },
      {
        rank: 5,
        username: "LuckyDragon",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 18700,
        game: "Baccarat",
      },
    ],
    monthly: [
      {
        rank: 1,
        username: "CasinoKing",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 120000,
        game: "Blackjack",
      },
      {
        rank: 2,
        username: "SlotLegend",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 95000,
        game: "Slots",
      },
      {
        rank: 3,
        username: "PokerChamp",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 82000,
        game: "Poker",
      },
      {
        rank: 4,
        username: "RouletteKing",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 76500,
        game: "Roulette",
      },
      {
        rank: 5,
        username: "BaccaratMaster",
        avatar: "/placeholder.svg?height=40&width=40",
        winnings: 68000,
        game: "Baccarat",
      },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return <span className="text-muted-foreground font-medium">{rank}</span>
    }
  }

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Leaderboard</h2>
        <Link href="/leaderboard" className="text-primary hover:underline flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Winners</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            {Object.entries(leaderboardData).map(([period, data]) => (
              <TabsContent key={period} value={period} className="space-y-4">
                {data.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8">{getRankIcon(player.rank)}</div>
                        <Avatar className="h-10 w-10 border-2 border-muted">
                          <AvatarImage src={player.avatar} alt={player.username} />
                          <AvatarFallback>{player.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{player.username}</p>
                          <p className="text-xs text-muted-foreground">{player.game}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${player.winnings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Winnings</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

