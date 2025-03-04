"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Experience the Thrill",
      subtitle: "Immersive 3D Casino Games",
      cta: "Play Now",
      image: "/placeholder.svg?height=600&width=1200",
    },
    {
      title: "Live Casino Action",
      subtitle: "Play with Real Dealers in Real Time",
      cta: "Join Live Tables",
      image: "/placeholder.svg?height=600&width=1200",
    },
    {
      title: "Exclusive Rewards",
      subtitle: "Daily Bonuses and VIP Perks",
      cta: "Claim Rewards",
      image: "/placeholder.svg?height=600&width=1200",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl my-8">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${slide.image})` }} />
          <div className="hero-gradient absolute inset-0 z-20" />
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-6">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {slide.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                {slide.cta}
              </Button>
            </motion.div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

