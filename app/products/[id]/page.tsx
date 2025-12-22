"use client"

import { use, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Ruler, Package, ShieldCheck, Clock } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import Link from "next/link"

// Mock data
const productDetails: Record<
  string,
  {
    id: number
    name: string
    price: number
    rentPrice: number
    category: string
    description: string
    images: string[]
    sizes: string[]
    availability: string
    fabric: string
    care: string
    features: string[]
  }
> = {
  "1": {
    id: 1,
    name: "Royal Wedding Caftan",
    price: 299,
    rentPrice: 89,
    category: "Wedding",
    description:
      "An exquisite bridal caftan featuring intricate gold embroidery and traditional Moroccan craftsmanship. Perfect for weddings and special ceremonies. Made from premium silk fabric with hand-stitched details that shimmer beautifully in light.",
    images: [
      "/elegant-moroccan-caftan-purple.jpg",
      "/moroccan-wedding-caftan-bridal.jpg",
      "/premium-moroccan-caftan-gold-embroidery.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock",
    fabric: "Premium Silk with Gold Thread Embroidery",
    care: "Dry clean only",
    features: [
      "Hand-embroidered with 24K gold thread",
      "Traditional Moroccan patterns",
      "Custom tailoring available",
      "Comes with matching accessories",
    ],
  },
  "2": {
    id: 2,
    name: "Traditional Luxury",
    price: 249,
    rentPrice: 69,
    category: "Traditional",
    description:
      "A stunning traditional caftan showcasing authentic Moroccan embroidery techniques passed down through generations. Features elaborate patterns and luxurious fabrics that embody the essence of Moroccan heritage.",
    images: [
      "/traditional-moroccan-caftan-embroidery.jpg",
      "/traditional-moroccan-caftan-classic.jpg",
      "/moroccan-artisan-embroidery-traditional.jpg",
    ],
    sizes: ["S", "M", "L", "XL"],
    availability: "In Stock",
    fabric: "Silk Blend with Traditional Embroidery",
    care: "Dry clean only",
    features: [
      "Authentic traditional patterns",
      "Handcrafted by Moroccan artisans",
      "Breathable luxury fabric",
      "Timeless design",
    ],
  },
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = productDetails[id] || productDetails["1"]
  const [selectedImage, setSelectedImage] = useState(0)
  const [purchaseType, setPurchaseType] = useState<"buy" | "rent">("buy")
  const [selectedSize, setSelectedSize] = useState("")
  const { addItem, toggleCart } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) return
    
    const price = purchaseType === "buy" ? product.buyPrice : product.rentPrice
    
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: price,
      image: product.images[0],
      size: selectedSize,
      type: purchaseType,
      rentDuration: purchaseType === "rent" ? 7 : undefined,
      rentPrice: purchaseType === "rent" ? product.rentPrice : undefined
    })
    
    // Open cart sidebar to show the added item
    toggleCart()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted border-2 border-border">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{product.category}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? "border-accent" : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{product.name}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Purchase Type */}
              <Card className="border-2 border-border">
                <CardContent className="p-6 space-y-4">
                  <Label className="text-lg font-semibold">Choose Option</Label>
                  <RadioGroup value={purchaseType} onValueChange={(value) => setPurchaseType(value as "buy" | "rent")}>
                    <div className="flex items-center justify-between p-4 border-2 border-border rounded-lg hover:border-accent transition-colors">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="buy" id="buy" />
                        <Label htmlFor="buy" className="cursor-pointer">
                          <div>
                            <p className="font-semibold">Buy</p>
                            <p className="text-sm text-muted-foreground">Own it forever</p>
                          </div>
                        </Label>
                      </div>
                      <p className="text-2xl font-bold text-primary">${product.price}</p>
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 border-border rounded-lg hover:border-accent transition-colors">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent" className="cursor-pointer">
                          <div>
                            <p className="font-semibold">Rent</p>
                            <p className="text-sm text-muted-foreground">Perfect for events</p>
                          </div>
                        </Label>
                      </div>
                      <p className="text-2xl font-bold text-accent">${product.rentPrice}/day</p>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Select Size</Label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`w-16 h-16 text-lg ${selectedSize === size ? "border-2 border-accent" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button size="lg" className="flex-1 h-14 text-lg" onClick={handleAddToCart} disabled={!selectedSize}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-6 bg-transparent">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Availability</p>
                    <p className="text-sm text-muted-foreground">{product.availability}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Fabric</p>
                    <p className="text-sm text-muted-foreground">{product.fabric}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Care Instructions</p>
                    <p className="text-sm text-muted-foreground">{product.care}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Delivery</p>
                    <p className="text-sm text-muted-foreground">3-5 business days</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[2, 3, 4, 5].map((relatedId) => (
                <Link key={relatedId} href={`/products/${relatedId}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-border hover:border-accent">
                    <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={`/traditional-moroccan-caftan-embroidery.jpg`}
                        alt="Related product"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-primary">Related Caftan {relatedId}</h3>
                      <p className="text-sm text-muted-foreground mt-1">From $199</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
