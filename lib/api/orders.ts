// Orders API functions
import { apiClient, type ApiResponse } from './client'

// Order related types
export interface OrderItem {
  product: string
  name: string
  image: string
  price: number
  quantity: number
  size?: string
  color?: string
  sku?: string
}

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface Order {
  id: string
  user: string
  orderItems: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: string
  paymentResult?: {
    id?: string
    status?: string
    update_time?: string
    email_address?: string
  }
  subtotal: number
  tax: number
  shippingPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt?: string
  isDelivered: boolean
  deliveredAt?: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
}

export interface OrdersResponse {
  orders: Order[]
  pagination: {
    currentPage: number
    totalPages: number
    totalOrders: number
    hasMore: boolean
  }
}

export interface CreateOrderData {
  orderItems: {
    product: string
    quantity: number
    size?: string
    color?: string
  }[]
  shippingAddress: ShippingAddress
  paymentMethod: string
}

// Get user orders
export const getUserOrders = async (params?: {
  page?: number
  limit?: number
  status?: string
}): Promise<OrdersResponse> => {
  try {
    const queryParams = new URLSearchParams()
    
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    
    const query = queryParams.toString()
    const endpoint = `/orders/my-orders${query ? `?${query}` : ''}`
    
    const response = await apiClient.get<OrdersResponse>(endpoint)
    
    if (response.status === 'success' && response.data) {
      return response.data
    } else {
      throw new Error(response.message || 'Failed to fetch orders')
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch orders')
  }
}

// Get single order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const response = await apiClient.get<{ order: Order }>(`/orders/${orderId}`)
    
    if (response.status === 'success' && response.data?.order) {
      return response.data.order
    } else {
      throw new Error(response.message || 'Failed to fetch order')
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch order')
  }
}

// Create new order
export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  try {
    const response = await apiClient.post<{ order: Order }>('/orders', orderData)
    
    if (response.status === 'success' && response.data?.order) {
      return response.data.order
    } else {
      throw new Error(response.message || 'Failed to create order')
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create order')
  }
}

// Cancel order
export const cancelOrder = async (orderId: string, reason?: string): Promise<Order> => {
  try {
    const response = await apiClient.put<{ order: Order }>(`/orders/${orderId}/cancel`, {
      reason
    })
    
    if (response.status === 'success' && response.data?.order) {
      return response.data.order
    } else {
      throw new Error(response.message || 'Failed to cancel order')
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to cancel order')
  }
}

// Helper function to format order status
export const formatOrderStatus = (status: string): { label: string; color: string } => {
  const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    processing: { label: 'Processing', color: 'bg-indigo-100 text-indigo-800' },
    shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
    refunded: { label: 'Refunded', color: 'bg-gray-100 text-gray-800' }
  }
  
  return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' }
}

// Helper function to format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}