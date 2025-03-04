"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Volume2, VolumeX } from "lucide-react"

type Symbol = "cherry" | "lemon" | "orange" | "plum" | "seven" | "bell" | "bar" | "diamond"

interface SymbolInfo {
  name: Symbol
  image: string
  value: number
}

export default function SlotMachine() {
  const [balance, setBalance] = useState(1000)
  const [bet, setBet] = useState(10)
  const [reels, setReels] = useState<SymbolInfo[][]>([
    [symbols[0], symbols[1], symbols[2]],
    [symbols[3], symbols[4], symbols[5]],
    [symbols[6], symbols[7], symbols[0]],
  ])
  const [spinning, setSpinning] = useState(false)
  const [win, setWin] = useState(0)
  const [message, setMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(false)
  const spinSound = useRef<HTMLAudioElement | null>(null)
  const winSound = useRef<HTMLAudioElement | null>(null)

  const symbols: SymbolInfo[] = [
    { name: "cherry", image: "/placeholder.svg?height=80&width=80&text=🍒", value: 2 },
    { name: "lemon", image: "/placeholder.svg?height=80&width=80&text=🍋", value: 3 },
    { name: "orange", image: "/placeholder.svg?height=80&width=80&text=🍊", value: 4 },
    { name: "plum", image: "/placeholder.svg?height=80&width=80&text=🍇", value: 5 },
    { name: "bell", image: "/placeholder.svg?height=80&width=80&text=🔔", value: 10 },
    { name: "bar", image: "/placeholder.svg?height=80&width=80&text=BAR", value: 15 },
    { name: "seven", image: "/placeholder.svg?height=80&width=80&text=7️⃣", value: 20 },
    { name: "diamond", image: "/placeholder.svg?height=80&width=80&text=💎", value: 50 },
  ]

  useEffect(() => {
    // Create audio elements
    spinSound.current = new Audio("/assets/spin.mp3")
    winSound.current = new Audio("/assets/win.mp3")

    // Cleanup
    return () => {
      if (spinSound.current) {
        spinSound.current.pause()
        spinSound.current = null
      }
      if (winSound.current) {
        winSound.current.pause()
        winSound.current = null
      }
    }
  }, [])

  const increaseBet = () => {
    if (spinning) return
    setBet((prev) => Math.min(prev + 10, balance))
  }

  const decreaseBet = () => {
    if (spinning) return
    setBet((prev) => Math.max(prev - 10, 10))
  }

  const spin = () => {
    if (spinning || balance < bet) return

    setSpinning(true)
    setWin(0)
    setMessage("Spinning...")
    setBalance((prev) => prev - bet)

    if (soundEnabled && spinSound.current) {
      spinSound.current.currentTime = 0
      spinSound.current.play()
    }

    // Simulate spinning animation by changing reels rapidly
    let spinCount = 0
    const maxSpins = 20
    const spinInterval = setInterval(() => {
      setReels((prevReels) => {
        return prevReels.map((reel) => {
          // Shift symbols down and add a new random one at the top
          const newReel = [...reel]
          newReel.pop()
          newReel.unshift(symbols[Math.floor(Math.random() * symbols.length)])
          return newReel
        })
      })

      spinCount++
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval)
        finalizeSpin()
      }
    }, 100)
  }

  const finalizeSpin = () => {
    // Generate final random result
    const finalReels = [
      [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
      [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
      [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()],
    ]

    setReels(finalReels)

    // Check for wins
    const winAmount = calculateWin(finalReels)

    setTimeout(() => {
      setSpinning(false)

      if (winAmount > 0) {
        setWin(winAmount)
        setBalance((prev) => prev + winAmount)
        setMessage(`You won $${winAmount}!`)

        if (soundEnabled && winSound.current) {
          winSound.current.currentTime = 0
          winSound.current.play()
        }
      } else {
        setMessage("Try again!")
      }
    }, 500)
  }

  const getRandomSymbol = (): SymbolInfo => {
    // Weight the random selection to make higher value symbols less common
    const rand = Math.random()

    if (rand < 0.01) return symbols[7] // diamond (1%)
    if (rand < 0.05) return symbols[6] // seven (4%)
    if (rand < 0.1) return symbols[5] // bar (5%)
    if (rand < 0.2) return symbols[4] // bell (10%)
    if (rand < 0.35) return symbols[3] // plum (15%)
    if (rand < 0.55) return symbols[2] // orange (20%)
    if (rand < 0.75) return symbols[1] // lemon (20%)
    return symbols[0] // cherry (25%)
  }

  const calculateWin = (finalReels: SymbolInfo[][]): number => {
    let totalWin = 0

    // Check horizontal lines (3 of them)
    for (let row = 0; row < 3; row++) {
      const line = [finalReels[0][row], finalReels[1][row], finalReels[2][row]]
      totalWin += checkLine(line)
    }

    // Check diagonal lines (2 of them)
    const diagonal1 = [finalReels[0][0], finalReels[1][1], finalReels[2][2]]
    const diagonal2 = [finalReels[0][2], finalReels[1][1], finalReels[2][0]]

    totalWin += checkLine(diagonal1)
    totalWin += checkLine(diagonal2)

    return totalWin
  }

  const checkLine = (line: SymbolInfo[]): number => {
    // Check if all symbols in the line are the same
    if (line[0].name === line[1].name && line[1].name === line[2].name) {
      // Return win amount based on symbol value and bet
      return line[0].value * bet
    }

    // Check for pairs (only for higher value symbols)
    if (line[0].name === line[1].name && line[0].value >= 10) {
      return Math.floor(line[0].value * bet * 0.2)
    }

    if (line[1].name === line[2].name && line[1].value >= 10) {
      return Math.floor(line[1].value * bet * 0.2)
    }

    if (line[0].name === line[2].name && line[0].value >= 10) {
      return Math.floor(line[0].value * bet * 0.2)
    }

    return 0
  }

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Slot Machine</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-3 py-1 flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Balance: ${balance}
          </Badge>
          <Button variant="ghost" size="sm" onClick={toggleSound} className="flex items-center gap-2">
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            {soundEnabled ? "Sound On" : "Sound Off"}
          </Button>
        </div>
      </div>

      {/* Game message */}
      {message && (
        <div className="text-center mb-4">
          <Badge
            variant={win > 0 ? "default" : "secondary"}
            className={`text-lg px-4 py-2 ${win > 0 ? "bg-primary" : ""}`}
          >
            {message}
          </Badge>
        </div>
      )}

      {/* Slot machine */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 mb-8 shadow-lg border-4 border-yellow-500">
        {/* Win lines visualization */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 right-0 border-t-2 border-dashed border-yellow-400 opacity-50"></div>
          <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-yellow-400 opacity-50"></div>
          <div className="absolute top-3/4 left-0 right-0 border-t-2 border-dashed border-yellow-400 opacity-50"></div>
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="w-full h-0 border-t-2 border-dashed border-yellow-400 opacity-50 transform rotate-45"></div>
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="w-full h-0 border-t-2 border-dashed border-yellow-400 opacity-50 transform -rotate-45"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-black p-4 rounded-lg">
          {reels.map((reel, reelIndex) => (
            <div key={reelIndex} className="flex flex-col items-center bg-white rounded-md overflow-hidden">
              {reel.map((symbol, symbolIndex) => (
                <motion.div
                  key={`${reelIndex}-${symbolIndex}`}
                  className="p-2"
                  animate={{
                    y: spinning ? [0, -20, 0] : 0,
                    scale: spinning ? [1, 0.95, 1] : 1,
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: spinning ? Number.POSITIVE_INFINITY : 0,
                    delay: reelIndex * 0.1,
                  }}
                >
                  <img
                    src={symbol.image || "/placeholder.svg"}
                    alt={symbol.name}
                    className="w-20 h-20 object-contain"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Game controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button onClick={decreaseBet} disabled={bet <= 10 || spinning} variant="outline">
            -
          </Button>
          <span className="text-xl font-bold min-w-[60px] text-center">${bet}</span>
          <Button onClick={increaseBet} disabled={bet >= balance || spinning} variant="outline">
            +
          </Button>
        </div>

        <Button
          onClick={spin}
          disabled={spinning || balance < bet}
          className="bg-primary hover:bg-primary/90 min-w-[120px]"
        >
          {spinning ? "Spinning..." : "Spin"}
        </Button>

        <Button onClick={() => setBet(Math.min(balance, 100))} disabled={spinning || balance < 100} variant="outline">
          Bet 100
        </Button>

        <Button
          onClick={() => setBet(Math.min(balance, Math.max(10, balance / 2)))}
          disabled={spinning}
          variant="outline"
        >
          Bet Half
        </Button>
      </div>

      {/* Paytable */}
      <Card className="mt-4">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Paytable:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {symbols.map((symbol) => (
              <div key={symbol.name} className="flex flex-col items-center">
                <img
                  src={symbol.image || "/placeholder.svg"}
                  alt={symbol.name}
                  className="w-12 h-12 object-contain mb-1"
                />
                <span className="text-sm font-medium">{symbol.name}</span>
                <span className="text-xs text-muted-foreground">x{symbol.value}</span>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mt-4 mb-2">How to Play:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Set your bet amount using the + and - buttons</li>
            <li>Click "Spin" to spin the reels</li>
            <li>Match 3 symbols on any line to win</li>
            <li>Payouts are based on the symbol value multiplied by your bet</li>
            <li>Matching pairs of high-value symbols pays 20% of the full win</li>
            <li>Win on multiple lines for bigger payouts!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

