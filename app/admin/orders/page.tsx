"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminRoute } from "@/components/auth/ProtectedRoute"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Truck, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllOrders, getOrderStatsOverview, formatOrderStatus, formatPrice, type Order } from "@/lib/api/orders"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<{ totalOrders: number; pendingOrders: number; deliveredOrders: number; cancelledOrders: number; totalRevenue: number } | null>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [ordersRes, statsRes] = await Promise.all([
          getAllOrders({ page: 1, limit: 20 }),
          getOrderStatsOverview(),
        ])
        setOrders(ordersRes.orders)
        setStats(statsRes.overview)
      } catch (err: any) {
        setError(err?.message || "Failed to load orders")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <AdminRoute>
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
          {error && (
            <Card className="border-2 border-destructive">
              <CardContent className="p-4 text-destructive">
                {error}
              </CardContent>
            </Card>
          )}
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stats ? stats.totalOrders : (loading ? '...' : 0)}</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats ? stats.pendingOrders : (loading ? '...' : 0)}</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Delivered</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats ? stats.deliveredOrders : (loading ? '...' : 0)}</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats ? stats.cancelledOrders : (loading ? '...' : 0)}</p>
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
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Items</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Payment</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Amount</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td className="py-6 px-6" colSpan={8}>Loading orders...</td>
                      </tr>
                    ) : orders.length === 0 ? (
                      <tr>
                        <td className="py-6 px-6" colSpan={8}>No orders found.</td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6 font-medium text-foreground">{order.id}</td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-foreground">{order.user?.name || order.shippingAddress.fullName}</p>
                              <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-muted-foreground">{order.orderItems.length} item(s)</td>
                          <td className="py-4 px-6">
                            <Badge variant="default">{order.paymentMethod}</Badge>
                          </td>
                          <td className="py-4 px-6 font-semibold text-foreground">{formatPrice(order.totalPrice)}</td>
                          <td className="py-4 px-6 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="py-4 px-6">
                            {(() => {
                              const s = formatOrderStatus(order.status)
                              return (
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.color}`}>
                                  {s.label}
                                </span>
                              )
                            })()}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {order.status === "processing" && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600" title="Mark shipped">
                                  <Truck className="h-4 w-4" />
                                </Button>
                              )}
                              {order.status === "shipped" && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-600" title="Mark delivered">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </AdminRoute>
  )
}
