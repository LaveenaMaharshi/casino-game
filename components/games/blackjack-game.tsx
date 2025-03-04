"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, RefreshCw } from "lucide-react"

type Suit = "hearts" | "diamonds" | "clubs" | "spades"
type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A"

interface PlayingCard {
  suit: Suit
  rank: Rank
  value: number
  hidden?: boolean
}

export default function BlackjackGame() {
  const [deck, setDeck] = useState<PlayingCard[]>([])
  const [playerHand, setPlayerHand] = useState<PlayingCard[]>([])
  const [dealerHand, setDealerHand] = useState<PlayingCard[]>([])
  const [gameState, setGameState] = useState<
    "betting" | "playing" | "playerBust" | "dealerBust" | "playerWin" | "dealerWin" | "push"
  >("betting")
  const [playerScore, setPlayerScore] = useState(0)
  const [dealerScore, setDealerScore] = useState(0)
  const [bet, setBet] = useState(10)
  const [balance, setBalance] = useState(1000)
  const [message, setMessage] = useState("")
  const [isDealing, setIsDealing] = useState(false)

  // Initialize deck
  useEffect(() => {
    initializeDeck()
  }, [])

  // Calculate scores when hands change
  useEffect(() => {
    setPlayerScore(calculateScore(playerHand))
    setDealerScore(calculateScore(dealerHand.filter((card) => !card.hidden)))
  }, [playerHand, dealerHand])

  // Check for blackjack or bust
  useEffect(() => {
    if (gameState === "playing") {
      if (playerScore === 21 && playerHand.length === 2) {
        handleDealerTurn()
      } else if (playerScore > 21) {
        setGameState("playerBust")
        setMessage("Bust! You lose.")
      }
    }
  }, [playerScore, gameState, playerHand.length])

  const initializeDeck = () => {
    const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"]
    const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]

    const newDeck: PlayingCard[] = []

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        newDeck.push({
          suit: suits[i],
          rank: ranks[j],
          value: values[j],
        })
      }
    }

    // Shuffle the deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]]
    }

    setDeck(newDeck)
  }

  const dealCards = () => {
    if (balance < bet) {
      setMessage("Not enough balance!")
      return
    }

    setIsDealing(true)
    setBalance((prev) => prev - bet)
    setGameState("playing")
    setMessage("")

    const newDeck = [...deck]
    const newPlayerHand: PlayingCard[] = []
    const newDealerHand: PlayingCard[] = []

    // Deal two cards to player
    newPlayerHand.push(newDeck.pop()!)

    setTimeout(() => {
      // Deal one card to dealer
      newDealerHand.push(newDeck.pop()!)

      setTimeout(() => {
        // Deal second card to player
        newPlayerHand.push(newDeck.pop()!)

        setTimeout(() => {
          // Deal second card to dealer (hidden)
          const hiddenCard = newDeck.pop()!
          hiddenCard.hidden = true
          newDealerHand.push(hiddenCard)

          setPlayerHand(newPlayerHand)
          setDealerHand(newDealerHand)
          setDeck(newDeck)
          setIsDealing(false)
        }, 300)
      }, 300)
    }, 300)
  }

  const hit = () => {
    if (gameState !== "playing" || isDealing) return

    const newDeck = [...deck]
    const newPlayerHand = [...playerHand]

    newPlayerHand.push(newDeck.pop()!)

    setPlayerHand(newPlayerHand)
    setDeck(newDeck)
  }

  const stand = () => {
    if (gameState !== "playing" || isDealing) return
    handleDealerTurn()
  }

  const handleDealerTurn = () => {
    setIsDealing(true)

    // Reveal dealer's hidden card
    const newDealerHand = dealerHand.map((card) => ({ ...card, hidden: false }))
    setDealerHand(newDealerHand)

    setTimeout(() => {
      const dealerPlay = () => {
        const currentScore = calculateScore(newDealerHand)

        if (currentScore < 17) {
          const newDeck = [...deck]
          newDealerHand.push(newDeck.pop()!)
          setDealerHand([...newDealerHand])
          setDeck(newDeck)

          setTimeout(() => {
            dealerPlay()
          }, 500)
        } else {
          determineWinner(playerScore, currentScore)
          setIsDealing(false)
        }
      }

      dealerPlay()
    }, 500)
  }

  const determineWinner = (playerScore: number, dealerScore: number) => {
    if (playerScore > 21) {
      setGameState("playerBust")
      setMessage("Bust! You lose.")
    } else if (dealerScore > 21) {
      setGameState("dealerBust")
      setMessage("Dealer busts! You win.")
      setBalance((prev) => prev + bet * 2)
    } else if (playerScore > dealerScore) {
      setGameState("playerWin")
      setMessage("You win!")
      setBalance((prev) => prev + bet * 2)
    } else if (dealerScore > playerScore) {
      setGameState("dealerWin")
      setMessage("Dealer wins.")
    } else {
      setGameState("push")
      setMessage("Push! Bet returned.")
      setBalance((prev) => prev + bet)
    }
  }

  const calculateScore = (hand: PlayingCard[]) => {
    let score = 0
    let aces = 0

    for (const card of hand) {
      if (!card.hidden) {
        score += card.value
        if (card.rank === "A") aces++
      }
    }

    // Adjust for aces
    while (score > 21 && aces > 0) {
      score -= 10
      aces--
    }

    return score
  }

  const resetGame = () => {
    setPlayerHand([])
    setDealerHand([])
    setGameState("betting")
    setMessage("")

    // Reinitialize deck if it's getting low
    if (deck.length < 10) {
      initializeDeck()
    }
  }

  const increaseBet = () => {
    if (gameState !== "betting") return
    setBet((prev) => Math.min(prev + 10, balance))
  }

  const decreaseBet = () => {
    if (gameState !== "betting") return
    setBet((prev) => Math.max(prev - 10, 10))
  }

  const getCardColor = (suit: Suit) => {
    return suit === "hearts" || suit === "diamonds" ? "text-red-500" : "text-black dark:text-white"
  }

  const getSuitSymbol = (suit: Suit) => {
    switch (suit) {
      case "hearts":
        return "♥"
      case "diamonds":
        return "♦"
      case "clubs":
        return "♣"
      case "spades":
        return "♠"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Blackjack</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-3 py-1 flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Balance: ${balance}
          </Badge>
          {gameState !== "betting" && (
            <Badge variant="outline" className="text-lg px-3 py-1">
              Bet: ${bet}
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

      {/* Dealer's cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Dealer: {dealerScore}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {dealerHand.map((card, index) => (
              <motion.div
                key={`dealer-${index}`}
                initial={{ opacity: 0, y: -50, rotateY: 180 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <PlayingCardComponent card={card} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Player's cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Hand: {playerScore}</h2>
        <div className="flex flex-wrap justify-center gap-2">
          <AnimatePresence>
            {playerHand.map((card, index) => (
              <motion.div
                key={`player-${index}`}
                initial={{ opacity: 0, y: 50, rotateY: 180 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <PlayingCardComponent card={card} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Game controls */}
      <div className="flex flex-wrap justify-center gap-4">
        {gameState === "betting" ? (
          <>
            <div className="flex items-center gap-2">
              <Button onClick={decreaseBet} disabled={bet <= 10} variant="outline">
                -
              </Button>
              <span className="text-xl font-bold min-w-[60px] text-center">${bet}</span>
              <Button onClick={increaseBet} disabled={bet >= balance} variant="outline">
                +
              </Button>
            </div>
            <Button onClick={dealCards} disabled={balance < bet} className="bg-primary hover:bg-primary/90">
              Deal Cards
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={hit}
              disabled={gameState !== "playing" || isDealing}
              className="bg-primary hover:bg-primary/90"
            >
              Hit
            </Button>
            <Button onClick={stand} disabled={gameState !== "playing" || isDealing} variant="secondary">
              Stand
            </Button>
            {gameState !== "playing" && (
              <Button onClick={resetGame} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                New Game
              </Button>
            )}
          </>
        )}
      </div>

      {/* Game rules */}
      <Card className="mt-8">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">How to Play:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Place your bet and click "Deal Cards"</li>
            <li>Try to get closer to 21 than the dealer without going over</li>
            <li>Cards 2-10 are worth their face value</li>
            <li>Face cards (J, Q, K) are worth 10</li>
            <li>Aces are worth 11 or 1, whichever is better for your hand</li>
            <li>Click "Hit" to draw another card</li>
            <li>Click "Stand" to end your turn and let the dealer play</li>
            <li>Dealer must hit until they have at least 17</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function PlayingCardComponent({ card }: { card: PlayingCard }) {
  const getCardColor = (suit: Suit) => {
    return suit === "hearts" || suit === "diamonds" ? "text-red-500" : "text-black dark:text-white"
  }

  const getSuitSymbol = (suit: Suit) => {
    switch (suit) {
      case "hearts":
        return "♥"
      case "diamonds":
        return "♦"
      case "clubs":
        return "♣"
      case "spades":
        return "♠"
    }
  }

  if (card.hidden) {
    return (
      <div className="w-[100px] h-[140px] sm:w-[120px] sm:h-[168px] rounded-lg bg-primary flex items-center justify-center text-white border-2 border-white">
        <div className="text-2xl font-bold">LuxCasino</div>
      </div>
    )
  }

  return (
    <div className="w-[100px] h-[140px] sm:w-[120px] sm:h-[168px] rounded-lg bg-white dark:bg-slate-200 border border-gray-300 shadow-md flex flex-col p-2 text-black">
      <div className="flex justify-between items-center">
        <div className={getCardColor(card.suit)}>
          <div className="text-xl font-bold">{card.rank}</div>
          <div className="text-xl">{getSuitSymbol(card.suit)}</div>
        </div>
      </div>
      <div className={`flex-grow flex items-center justify-center text-4xl ${getCardColor(card.suit)}`}>
        {getSuitSymbol(card.suit)}
      </div>
      <div className={`flex justify-end items-center ${getCardColor(card.suit)}`}>
        <div className="text-xl font-bold rotate-180">{card.rank}</div>
        <div className="text-xl rotate-180">{getSuitSymbol(card.suit)}</div>
      </div>
    </div>
  )
}

