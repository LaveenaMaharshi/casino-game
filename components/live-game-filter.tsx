"use client"

import { useState } from "react"
import { Check, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LiveGameFilter() {
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [filters, setFilters] = useState({
    vip: false,
    lowStakes: false,
    highStakes: false,
  })

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <Tabs defaultValue="all" onValueChange={setCategory} className="w-full md:w-auto">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row">
          <TabsTrigger value="all">All Games</TabsTrigger>
          <TabsTrigger value="blackjack">Blackjack</TabsTrigger>
          <TabsTrigger value="roulette">Roulette</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search games..." className="pl-10" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-between">
              Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Game Filters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={filters.vip} onCheckedChange={() => handleFilterChange("vip")}>
              VIP Tables
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.lowStakes}
              onCheckedChange={() => handleFilterChange("lowStakes")}
            >
              Low Stakes
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.highStakes}
              onCheckedChange={() => handleFilterChange("highStakes")}
            >
              High Stakes
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-between">
              Sort: {sortBy === "popular" ? "Popular" : sortBy === "newest" ? "Newest" : "A-Z"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={sortBy === "popular"} onCheckedChange={() => setSortBy("popular")}>
              <Check className={`mr-2 h-4 w-4 ${sortBy === "popular" ? "opacity-100" : "opacity-0"}`} />
              Popular
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={sortBy === "newest"} onCheckedChange={() => setSortBy("newest")}>
              <Check className={`mr-2 h-4 w-4 ${sortBy === "newest" ? "opacity-100" : "opacity-0"}`} />
              Newest
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={sortBy === "az"} onCheckedChange={() => setSortBy("az")}>
              <Check className={`mr-2 h-4 w-4 ${sortBy === "az" ? "opacity-100" : "opacity-0"}`} />
              Alphabetical (A-Z)
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

