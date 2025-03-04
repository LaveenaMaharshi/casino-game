"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, RefreshCw } from "lucide-react"

type BetType = "red" | "black" | "even" | "odd" | "1-18" | "19-36" | "1st12" | "2nd12" | "3rd12" | "single" | null

interface Bet {
  type: BetType
  amount: number
  number?: number
}

interface RouletteNumber {
  number: number
  color: "red" | "black" | "green"
}

export default function RouletteGame() {
  const [balance, setBalance] = useState(1000)
  const [currentBet, setCurrentBet] = useState<Bet>({ type: null, amount: 10 })
  const [placedBets, setPlacedBets] = useState<Bet[]>([])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<RouletteNumber | null>(null)
  const [message, setMessage] = useState("")
  const [wheelRotation, setWheelRotation] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const rouletteNumbers: RouletteNumber[] = [
    { number: 0, color: "green" },
    { number: 32, color: "red" },
    { number: 15, color: "black" },
    { number: 19, color: "red" },
    { number: 4, color: "black" },
    { number: 21, color: "red" },
    { number: 2, color: "black" },
    { number: 25, color: "red" },
    { number: 17, color: "black" },
    { number: 34, color: "red" },
    { number: 6, color: "black" },
    { number: 27, color: "red" },
    { number: 13, color: "black" },
    { number: 36, color: "red" },
    { number: 11, color: "black" },
    { number: 30, color: "red" },
    { number: 8, color: "black" },
    { number: 23, color: "red" },
    { number: 10, color: "black" },
    { number: 5, color: "red" },
    { number: 24, color: "black" },
    { number: 16, color: "red" },
    { number: 33, color: "black" },
    { number: 1, color: "red" },
    { number: 20, color: "black" },
    { number: 14, color: "red" },
    { number: 31, color: "black" },
    { number: 9, color: "red" },
    { number: 22, color: "black" },
    { number: 18, color: "red" },
    { number: 29, color: "black" },
    { number: 7, color: "red" },
    { number: 28, color: "black" },
    { number: 12, color: "red" },
    { number: 35, color: "black" },
    { number: 3, color: "red" },
    { number: 26, color: "black" },
  ]

  const increaseBet = () => {
    if (spinning) return
    setCurrentBet((prev) => ({
      ...prev,
      amount: Math.min(prev.amount + 10, balance),
    }))
  }

  const decreaseBet = () => {
    if (spinning) return
    setCurrentBet((prev) => ({
      ...prev,
      amount: Math.max(prev.amount - 10, 10),
    }))
  }

  const placeBet = (type: BetType, number?: number) => {
    if (spinning || balance < currentBet.amount) return

    if (type === "single" && number === undefined) {
      setMessage("Please select a number first")
      return
    }

    const newBet: Bet = {
      type,
      amount: currentBet.amount,
      ...(number !== undefined && { number }),
    }

    setPlacedBets((prev) => [...prev, newBet])
    setBalance((prev) => prev - currentBet.amount)
    setMessage(`Bet placed on ${type}${number !== undefined ? ` ${number}` : ""}`)
  }

  const clearBets = () => {
    if (spinning) return

    const totalBetAmount = placedBets.reduce((sum, bet) => sum + bet.amount, 0)
    setBalance((prev) => prev + totalBetAmount)
    setPlacedBets([])
    setMessage("All bets cleared")
  }

  const spinWheel = () => {
    if (spinning || placedBets.length === 0) return

    setSpinning(true)
    setMessage("Spinning...")

    // Random number of full rotations (3-5) plus the winning position
    const randomNumber = Math.floor(Math.random() * 37) // 0-36
    const winningNumber = rouletteNumbers.find((n) => n.number === randomNumber)!

    // Calculate rotation to land on the winning number
    const numberIndex = rouletteNumbers.findIndex((n) => n.number === randomNumber)
    const anglePerNumber = 360 / rouletteNumbers.length
    const targetAngle = 360 * 5 + numberIndex * anglePerNumber // 5 full rotations + position

    setWheelRotation(targetAngle)

    setTimeout(() => {
      setResult(winningNumber)
      calculateWinnings(winningNumber)
      setSpinning(false)
    }, 5000) // Match this with the CSS transition duration
  }

  const calculateWinnings = (result: RouletteNumber) => {
    let winnings = 0
    const winMessage = `Ball landed on ${result.number} ${result.color}`

    placedBets.forEach((bet) => {
      let won = false

      switch (bet.type) {
        case "red":
          won = result.color === "red"
          break
        case "black":
          won = result.color === "black"
          break
        case "even":
          won = result.number !== 0 && result.number % 2 === 0
          break
        case "odd":
          won = result.number !== 0 && result.number % 2 === 1
          break
        case "1-18":
          won = result.number >= 1 && result.number <= 18
          break
        case "19-36":
          won = result.number >= 19 && result.number <= 36
          break
        case "1st12":
          won = result.number >= 1 && result.number <= 12
          break
        case "2nd12":
          won = result.number >= 13 && result.number <= 24
          break
        case "3rd12":
          won = result.number >= 25 && result.number <= 36
          break
        case "single":
          won = result.number === bet.number
          break
      }

      if (won) {
        let multiplier = 1

        switch (bet.type) {
          case "red":
          case "black":
          case "even":
          case "odd":
          case "1-18":
          case "19-36":
            multiplier = 2
            break
          case "1st12":
          case "2nd12":
          case "3rd12":
            multiplier = 3
            break
          case "single":
            multiplier = 36
            break
        }

        winnings += bet.amount * multiplier
      }
    })

    if (winnings > 0) {
      setBalance((prev) => prev + winnings)
      setMessage(`${winMessage}. You won $${winnings}!`)
    } else {
      setMessage(`${winMessage}. Better luck next time!`)
    }

    setPlacedBets([])
  }

  const resetGame = () => {
    if (spinning) return
    setPlacedBets([])
    setResult(null)
    setMessage("")
    setSelectedNumber(null)
  }

  const handleNumberSelect = (number: number) => {
    if (spinning) return
    setSelectedNumber(number)
    setCurrentBet((prev) => ({
      ...prev,
      type: "single",
      number,
    }))
    setMessage(`Selected number ${number}`)
  }

  const getTotalBetAmount = () => {
    return placedBets.reduce((sum, bet) => sum + bet.amount, 0)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Roulette</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-3 py-1 flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Balance: ${balance}
          </Badge>
          {placedBets.length > 0 && (
            <Badge variant="outline" className="text-lg px-3 py-1">
              Total Bet: ${getTotalBetAmount()}
            </Badge>
          )}
        </div>
      </div>

      {/* Game message */}
      {message && (
        <div className="text-center mb-4">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {message}
          </Badge>
        </div>
      )}

      {/* Roulette wheel */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 flex justify-center">
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
            <div
              ref={wheelRef}
              className="absolute inset-0 rounded-full border-4 border-gray-800 overflow-hidden transition-transform duration-5000 ease-out"
              style={{ transform: `rotate(${wheelRotation}deg)` }}
            >
              {rouletteNumbers.map((num, index) => {
                const angle = (index * 360) / rouletteNumbers.length
                return (
                  <div
                    key={num.number}
                    className={`absolute w-full h-full origin-center`}
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className={`absolute top-0 left-1/2 w-[30px] h-1/2 -ml-[15px] flex items-start justify-center pt-1 text-white font-bold text-xs`}
                      style={{
                        backgroundColor: num.color,
                        clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                      }}
                    >
                      {num.number}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -mt-[50px] -ml-[50px] rounded-full bg-gray-800 z-10 flex items-center justify-center text-white">
              <div className="text-2xl font-bold">{result ? result.number : "Spin"}</div>
            </div>
            <div className="absolute top-0 left-1/2 -ml-2 w-4 h-8 bg-white z-20 rounded-b-full"></div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
              onClick={() => placeBet("red")}
              disabled={spinning || balance < currentBet.amount}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Red (1:1)
            </Button>
            <Button
              onClick={() => placeBet("black")}
              disabled={spinning || balance < currentBet.amount}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Black (1:1)
            </Button>
            <Button
              onClick={() => placeBet("green")}
              disabled={spinning || balance < currentBet.amount}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              0 (35:1)
            </Button>

            <Button
              onClick={() => placeBet("even")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              Even (1:1)
            </Button>
            <Button
              onClick={() => placeBet("odd")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              Odd (1:1)
            </Button>
            <Button
              onClick={() => placeBet("single", selectedNumber !== null ? selectedNumber : undefined)}
              disabled={spinning || balance < currentBet.amount || selectedNumber === null}
              variant={selectedNumber !== null ? "default" : "outline"}
              className={selectedNumber !== null ? "bg-primary hover:bg-primary/90" : ""}
            >
              {selectedNumber !== null ? `${selectedNumber} (35:1)` : "Pick #"}
            </Button>

            <Button
              onClick={() => placeBet("1-18")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              1-18 (1:1)
            </Button>
            <Button
              onClick={() => placeBet("19-36")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              19-36 (1:1)
            </Button>
            <Button
              onClick={() => placeBet("1st12")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              1st 12 (2:1)
            </Button>

            <Button
              onClick={() => placeBet("2nd12")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              2nd 12 (2:1)
            </Button>
            <Button
              onClick={() => placeBet("3rd12")}
              disabled={spinning || balance < currentBet.amount}
              variant="outline"
            >
              3rd 12 (2:1)
            </Button>
          </div>

          {/* Number selection grid */}
          <div className="grid grid-cols-6 gap-1 mb-4">
            <Button
              onClick={() => handleNumberSelect(0)}
              disabled={spinning}
              className={`bg-green-600 hover:bg-green-700 text-white ${selectedNumber === 0 ? "ring-2 ring-white" : ""}`}
              size="sm"
            >
              0
            </Button>
            {Array.from({ length: 36 }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberSelect(num)}
                disabled={spinning}
                className={`${
                  num % 2 === 0 ? "bg-black hover:bg-gray-800" : "bg-red-600 hover:bg-red-700"
                } text-white ${selectedNumber === num ? "ring-2 ring-white" : ""}`}
                size="sm"
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Bet controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button onClick={decreaseBet} disabled={currentBet.amount <= 10 || spinning} variant="outline">
            -
          </Button>
          <span className="text-xl font-bold min-w-[60px] text-center">${currentBet.amount}</span>
          <Button onClick={increaseBet} disabled={currentBet.amount >= balance || spinning} variant="outline">
            +
          </Button>
        </div>

        <Button
          onClick={spinWheel}
          disabled={spinning || placedBets.length === 0}
          className="bg-primary hover:bg-primary/90"
        >
          Spin
        </Button>

        <Button onClick={clearBets} disabled={spinning || placedBets.length === 0} variant="destructive">
          Clear Bets
        </Button>

        <Button onClick={resetGame} disabled={spinning} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Game rules */}
      <Card className="mt-4">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Select your bet amount using the + and - buttons</li>
            <li>Place bets on numbers, colors, or groups</li>
            <li>Click "Spin" to spin the wheel</li>
            <li>Different bets have different payouts:</li>
            <ul className="list-circle pl-5 space-y-1 text-sm">
              <li>Red/Black, Even/Odd, 1-18/19-36: 1:1 payout</li>
              <li>Dozens (1st 12, 2nd 12, 3rd 12): 2:1 payout</li>
              <li>Single Number: 35:1 payout</li>
            </ul>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

