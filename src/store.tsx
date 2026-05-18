import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type CartItem = {
  productId: string
  quantity: number
}

type Order = {
  id: string
  createdAt: string
  total: number
  contactEmail: string
}

type Booking = {
  id: string
  serviceId: string
  date: string
  time: string
  childName: string
  appointmentType: string
}

type StoreContextValue = {
  cart: CartItem[]
  wishlist: string[]
  orders: Order[]
  bookings: Booking[]
  addToCart: (productId: string, quantity?: number) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  placeOrder: (payload: { total: number; contactEmail: string }) => string
  addBooking: (payload: Omit<Booking, 'id'>) => string
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined)

function nextId(prefix: string): string {
  const randomPart = Math.floor(Math.random() * 900000 + 100000).toString()
  return `${prefix}-${randomPart}`
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      wishlist,
      orders,
      bookings,
      addToCart: (productId, quantity = 1) => {
        setCart((current) => {
          const existing = current.find((item) => item.productId === productId)
          if (!existing) {
            return [...current, { productId, quantity }]
          }
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        })
      },
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          setCart((current) => current.filter((item) => item.productId !== productId))
          return
        }
        setCart((current) =>
          current.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        )
      },
      removeFromCart: (productId) => {
        setCart((current) => current.filter((item) => item.productId !== productId))
      },
      clearCart: () => {
        setCart([])
      },
      toggleWishlist: (productId) => {
        setWishlist((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        )
      },
      placeOrder: ({ total, contactEmail }) => {
        const orderId = nextId('KK')
        setOrders((current) => [
          {
            id: orderId,
            createdAt: new Date().toISOString(),
            total,
            contactEmail,
          },
          ...current,
        ])
        return orderId
      },
      addBooking: (payload) => {
        const bookingId = nextId('BK')
        setBookings((current) => [{ ...payload, id: bookingId }, ...current])
        return bookingId
      },
    }),
    [bookings, cart, orders, wishlist],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}

