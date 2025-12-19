import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Truck, CheckCircle } from "lucide-react"

// Mock data
const orders = [
  {
    id: "ORD-001",
    customer: "Fatima Hassan",
    email: "fatima@example.com",
    product: "Royal Wedding Caftan",
    type: "Rent",
    amount: "$89",
    date: "2024-12-15",
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Amira Zaki",
    email: "amira@example.com",
    product: "Traditional Luxury",
    type: "Buy",
    amount: "$249",
    date: "2024-12-14",
    status: "Pending",
  },
  {
    id: "ORD-003",
    customer: "Leila Mansour",
    email: "leila@example.com",
    product: "Modern Elegance",
    type: "Rent",
    amount: "$59",
    date: "2024-12-13",
    status: "Completed",
  },
  {
    id: "ORD-004",
    customer: "Sara Idrissi",
    email: "sara@example.com",
    product: "Classic Heritage",
    type: "Buy",
    amount: "$279",
    date: "2024-12-12",
    status: "Processing",
  },
  {
    id: "ORD-005",
    customer: "Nadia Benjelloun",
    email: "nadia@example.com",
    product: "Bridal Splendor",
    type: "Rent",
    amount: "$129",
    date: "2024-12-11",
    status: "Completed",
  },
  {
    id: "ORD-006",
    customer: "Khadija Alami",
    email: "khadija@example.com",
    product: "Premium Gold",
    type: "Buy",
    amount: "$349",
    date: "2024-12-10",
    status: "Shipped",
  },
]

export default function AdminOrdersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">Order Management</h1>
            <p className="text-muted-foreground mt-2">Track and manage all customer orders</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold text-foreground mt-2">352</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">24</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">18</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold text-green-600 mt-2">310</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card className="border-2 border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Order ID</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Customer</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Product</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Amount</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{order.id}</td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-muted-foreground">{order.product}</td>
                        <td className="py-4 px-6">
                          <Badge variant={order.type === "Rent" ? "secondary" : "default"}>{order.type}</Badge>
                        </td>
                        <td className="py-4 px-6 font-semibold text-foreground">{order.amount}</td>
                        <td className="py-4 px-6 text-muted-foreground">{order.date}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "Shipped"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {order.status === "Processing" && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
                                <Truck className="h-4 w-4" />
                              </Button>
                            )}
                            {order.status === "Shipped" && (
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
