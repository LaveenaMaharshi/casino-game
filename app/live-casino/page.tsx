import { LiveGameGrid } from "@/components/live-game-grid"
import { LiveGameFilter } from "@/components/live-game-filter"
import { LiveGameBanner } from "@/components/live-game-banner"

export default function LiveCasinoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LiveGameBanner />
      <h1 className="text-4xl font-bold my-8 text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Live Casino
      </h1>
      <LiveGameFilter />
      <LiveGameGrid />
    </div>
  )
}

