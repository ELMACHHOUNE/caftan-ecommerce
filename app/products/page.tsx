"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"

// Mock data
const products = [
  {
    id: 1,
    name: "Royal Wedding Caftan",
    price: 299,
    rentPrice: 89,
    category: "wedding",
    type: "both",
    image: "/elegant-moroccan-caftan-purple.jpg",
    badge: "Wedding",
  },
  {
    id: 2,
    name: "Traditional Luxury",
    price: 249,
    rentPrice: 69,
    category: "traditional",
    type: "both",
    image: "/traditional-moroccan-caftan-embroidery.jpg",
    badge: "Traditional",
  },
  {
    id: 3,
    name: "Modern Elegance",
    price: 199,
    rentPrice: 59,
    category: "luxury",
    type: "both",
    image: "/modern-moroccan-caftan-purple.jpg",
    badge: "Modern",
  },
  {
    id: 4,
    name: "Classic Heritage",
    price: 279,
    rentPrice: 79,
    category: "traditional",
    type: "both",
    image: "/classic-moroccan-caftan-gold.jpg",
    badge: "Classic",
  },
  {
    id: 5,
    name: "Bridal Splendor",
    price: 399,
    rentPrice: 129,
    category: "wedding",
    type: "both",
    image: "/moroccan-wedding-caftan-bridal.jpg",
    badge: "Bridal",
  },
  {
    id: 6,
    name: "Premium Gold",
    price: 349,
    rentPrice: 99,
    category: "luxury",
    type: "both",
    image: "/premium-moroccan-caftan-gold-embroidery.jpg",
    badge: "Premium",
  },
  {
    id: 7,
    name: "Elegant Evening",
    price: 229,
    rentPrice: 65,
    category: "luxury",
    type: "both",
    image: "/elegant-moroccan-caftan-rental-event.jpg",
    badge: "Evening",
  },
  {
    id: 8,
    name: "Heritage Collection",
    price: 259,
    rentPrice: 75,
    category: "traditional",
    type: "both",
    image: "/traditional-moroccan-caftan-classic.jpg",
    badge: "Heritage",
  },
]

export default function ProductsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products.filter((product) => {
    const typeMatch = typeFilter === "all" || product.type === typeFilter || product.type === "both"
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const priceMatch =
      priceRange === "all" ||
      (priceRange === "low" && product.price < 250) ||
      (priceRange === "mid" && product.price >= 250 && product.price < 350) ||
      (priceRange === "high" && product.price >= 350)

    return typeMatch && categoryMatch && priceMatch
  })

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-balance">Our Collection</h1>
            <p className="text-xl leading-relaxed opacity-90">Discover exquisite Moroccan caftans for every occasion</p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary">Filters</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
                    {/* Type Filter */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Type</Label>
                      <RadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all" className="cursor-pointer">
                            All
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rent" id="rent" />
                          <Label htmlFor="rent" className="cursor-pointer">
                            Rent
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="buy" id="buy" />
                          <Label htmlFor="buy" className="cursor-pointer">
                            Buy
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Category Filter */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Category</Label>
                      <div className="space-y-2">
                        {["wedding", "traditional", "luxury"].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => handleCategoryToggle(category)}
                            />
                            <Label htmlFor={category} className="cursor-pointer capitalize">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-3">
                      <Label className="text-lg font-semibold">Price Range</Label>
                      <RadioGroup value={priceRange} onValueChange={setPriceRange}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="price-all" />
                          <Label htmlFor="price-all" className="cursor-pointer">
                            All Prices
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="low" id="price-low" />
                          <Label htmlFor="price-low" className="cursor-pointer">
                            Under $250
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mid" id="price-mid" />
                          <Label htmlFor="price-mid" className="cursor-pointer">
                            $250 - $350
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="high" id="price-high" />
                          <Label htmlFor="price-high" className="cursor-pointer">
                            $350+
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setTypeFilter("all")
                        setSelectedCategories([])
                        setPriceRange("all")
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-accent">
                        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                              {product.badge}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4 space-y-2">
                          <h3 className="font-semibold text-lg text-primary">{product.name}</h3>
                          <div className="flex items-center justify-between text-sm">
                            <div>
                              <p className="text-muted-foreground">Buy</p>
                              <p className="font-bold text-foreground">${product.price}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-muted-foreground">Rent</p>
                              <p className="font-bold text-accent">${product.rentPrice}/day</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground">No products match your filters</p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setTypeFilter("all")
                        setSelectedCategories([])
                        setPriceRange("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
