"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminRoute } from "@/components/auth/ProtectedRoute"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Royal Wedding Caftan",
    category: "Wedding",
    price: 299,
    rentPrice: 89,
    stock: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Traditional Luxury",
    category: "Traditional",
    price: 249,
    rentPrice: 69,
    stock: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Modern Elegance",
    category: "Luxury",
    price: 199,
    rentPrice: 59,
    stock: 15,
    status: "Active",
  },
  {
    id: 4,
    name: "Classic Heritage",
    category: "Traditional",
    price: 279,
    rentPrice: 79,
    stock: 5,
    status: "Active",
  },
  {
    id: 5,
    name: "Bridal Splendor",
    category: "Wedding",
    price: 399,
    rentPrice: 129,
    stock: 3,
    status: "Low Stock",
  },
]

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products] = useState(mockProducts)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-primary">Product Management</h1>
                <p className="text-muted-foreground mt-2">Manage your caftan inventory and listings</p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Search */}
          <Card className="border-2 border-border">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border-2 border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Product Name</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Category</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Buy Price</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Rent Price</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Stock</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{product.name}</td>
                        <td className="py-4 px-6 text-muted-foreground">{product.category}</td>
                        <td className="py-4 px-6 text-muted-foreground">${product.price}</td>
                        <td className="py-4 px-6 text-muted-foreground">${product.rentPrice}/day</td>
                        <td className="py-4 px-6 text-muted-foreground">{product.stock} units</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </AdminRoute>
  )
}
