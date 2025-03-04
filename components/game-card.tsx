import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Game {
  id: number
  title: string
  image: string
  category: string
  isNew: boolean
  isHot: boolean
}

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`}>
      <div className="game-card group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow transition-all">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={game.image || "/placeholder.svg"}
            alt={game.title}
            className="object-cover w-full h-full transition-transform group-hover:scale-110"
          />
          <div className="card-shine" />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {game.isNew && <Badge className="bg-blue-500 hover:bg-blue-500/90">New</Badge>}
            {game.isHot && <Badge className="bg-red-500 hover:bg-red-500/90">Hot</Badge>}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium line-clamp-1">{game.title}</h3>
          <p className="text-xs text-muted-foreground">{game.category}</p>
        </div>
      </div>
    </Link>
  )
}

