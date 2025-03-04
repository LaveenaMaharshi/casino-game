import { GameGrid } from "@/components/game-grid"
import { GameFilter } from "@/components/game-filter"

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Casino Games
      </h1>
      <GameFilter />
      <GameGrid />
    </div>
  )
}

