"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Promotions() {
  const [activePromo, setActivePromo] = useState<number | null>(null)

  const promotions = [
    {
      id: 1,
      title: "Welcome Bonus",
      description: "Get a 100% match up to $1,000 on your first deposit plus 100 free spins!",
      image: "/placeholder.svg?height=200&width=400",
      expiry: "No expiry",
      type: "New Players",
    },
    {
      id: 2,
      title: "Weekly Cashback",
      description: "Get 15% cashback on all your losses every week, automatically credited to your account.",
      image: "/placeholder.svg?height=200&width=400",
      expiry: "Ongoing",
      type: "VIP",
    },
    {
      id: 3,
      title: "Weekend Reload",
      description: "Deposit on weekends and get a 50% bonus up to $500. Use code: WEEKEND50",
      image: "/placeholder.svg?height=200&width=400",
      expiry: "Every weekend",
      type: "All Players",
    },
  ]

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Promotions & Bonuses</h2>
        <Link href="/promotions" className="text-primary hover:underline flex items-center">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseEnter={() => setActivePromo(promo.id)}
            onMouseLeave={() => setActivePromo(null)}
          >
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
              <div className="relative">
                <img
                  src={promo.image || "/placeholder.svg"}
                  alt={promo.title}
                  className="w-full h-48 object-cover transition-transform duration-500"
                  style={{
                    transform: activePromo === promo.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <Badge className="absolute top-3 right-3 bg-primary">{promo.type}</Badge>
              </div>
              <CardHeader>
                <CardTitle>{promo.title}</CardTitle>
                <CardDescription>Expires: {promo.expiry}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{promo.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href={`/promotions/${promo.id}`}>Claim Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

