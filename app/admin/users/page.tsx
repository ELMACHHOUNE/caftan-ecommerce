"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Trash2, Mail } from "lucide-react"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Fatima Hassan",
    email: "fatima@example.com",
    orders: 12,
    totalSpent: "$1,248",
    joined: "2024-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Amira Zaki",
    email: "amira@example.com",
    orders: 8,
    totalSpent: "$892",
    joined: "2024-02-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Leila Mansour",
    email: "leila@example.com",
    orders: 15,
    totalSpent: "$2,156",
    joined: "2024-01-05",
    status: "Active",
  },
  {
    id: 4,
    name: "Sara Idrissi",
    email: "sara@example.com",
    orders: 5,
    totalSpent: "$567",
    joined: "2024-03-10",
    status: "Active",
  },
  {
    id: 5,
    name: "Nadia Benjelloun",
    email: "nadia@example.com",
    orders: 20,
    totalSpent: "$3,420",
    joined: "2023-12-01",
    status: "VIP",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users] = useState(mockUsers)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-primary">User Management</h1>
            <p className="text-muted-foreground mt-2">View and manage customer accounts</p>
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
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-2 border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Name</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Email</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Orders</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Total Spent</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Joined</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-6 font-medium text-foreground">{user.name}</td>
                        <td className="py-4 px-6 text-muted-foreground">{user.email}</td>
                        <td className="py-4 px-6 text-muted-foreground">{user.orders}</td>
                        <td className="py-4 px-6 font-semibold text-foreground">{user.totalSpent}</td>
                        <td className="py-4 px-6 text-muted-foreground">{user.joined}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === "VIP" ? "bg-accent/20 text-accent" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Mail className="h-4 w-4" />
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

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No users found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
