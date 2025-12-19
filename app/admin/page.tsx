import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, ArrowUpRight } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+20.1% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Products",
      value: "245",
      change: "+12 new this month",
      icon: Package,
      color: "text-accent",
    },
    {
      title: "Total Users",
      value: "1,429",
      change: "+180 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: "352",
      change: "+19% from last month",
      icon: ShoppingCart,
      color: "text-orange-600",
    },
  ]

  const recentOrders = [
    { id: "ORD-001", customer: "Fatima Hassan", product: "Royal Wedding Caftan", amount: "$89", status: "Completed" },
    { id: "ORD-002", customer: "Amira Zaki", product: "Traditional Luxury", amount: "$249", status: "Pending" },
    { id: "ORD-003", customer: "Leila Mansour", product: "Modern Elegance", amount: "$59", status: "Completed" },
    { id: "ORD-004", customer: "Sara Idrissi", product: "Classic Heritage", amount: "$279", status: "Processing" },
    { id: "ORD-005", customer: "Nadia Benjelloun", product: "Bridal Splendor", amount: "$129", status: "Completed" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your store today.</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="border-2 border-border hover:border-accent transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Recent Orders */}
          <Card className="border-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-primary">Recent Orders</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Latest customer orders and their status</p>
              </div>
              <a href="/admin/orders" className="text-accent hover:underline flex items-center gap-1 text-sm">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                        <td className="py-4 px-4 text-muted-foreground">{order.customer}</td>
                        <td className="py-4 px-4 text-muted-foreground">{order.product}</td>
                        <td className="py-4 px-4 font-semibold text-foreground">{order.amount}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-border hover:border-accent transition-colors cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <Package className="h-12 w-12 mx-auto text-accent" />
                <h3 className="font-semibold text-lg text-primary">Add Product</h3>
                <p className="text-sm text-muted-foreground">Add a new caftan to your collection</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-accent transition-colors cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <Users className="h-12 w-12 mx-auto text-accent" />
                <h3 className="font-semibold text-lg text-primary">Manage Users</h3>
                <p className="text-sm text-muted-foreground">View and manage customer accounts</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-accent transition-colors cursor-pointer">
              <CardContent className="p-6 text-center space-y-3">
                <ShoppingCart className="h-12 w-12 mx-auto text-accent" />
                <h3 className="font-semibold text-lg text-primary">View Orders</h3>
                <p className="text-sm text-muted-foreground">Process and track all orders</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
