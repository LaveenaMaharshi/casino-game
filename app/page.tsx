import Hero from "@/components/hero"
import GameShowcase from "@/components/game-showcase"
import FeaturedGames from "@/components/featured-games"
import LiveCasino from "@/components/live-casino"
import Promotions from "@/components/promotions"
import Leaderboard from "@/components/leaderboard"
import CTA from "@/components/cta"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <GameShowcase />
      <FeaturedGames />
      <LiveCasino />
      <Promotions />
      <Leaderboard />
      <CTA />
    </div>
  )
}

