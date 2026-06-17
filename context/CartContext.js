'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { shopifyFetch } from '@/lib/shopify'
import { CREATE_CART, ADD_TO_CART, GET_CART, REMOVE_FROM_CART } from '@/lib/queries'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Cargar carrito guardado al iniciar
  useEffect(() => {
    const cartId = localStorage.getItem('cartId')
    if (cartId) fetchCart(cartId)
  }, [])

  const fetchCart = async (cartId) => {
    const data = await shopifyFetch(GET_CART, { cartId })
    if (data?.data?.cart) setCart(data.data.cart)
  }

  const addToCart = async (variantId, quantity = 1, customNote = '') => {
    setLoading(true)
    const cartId = localStorage.getItem('cartId')
    const lines = [{ merchandiseId: variantId, quantity, attributes: customNote ? [{ key: 'Medida personalizada', value: customNote }] : [] }]

    let updatedCart

    if (cartId) {
      const data = await shopifyFetch(ADD_TO_CART, { cartId, lines })
      updatedCart = data?.data?.cartLinesAdd?.cart
    } else {
      const data = await shopifyFetch(CREATE_CART, { lines })
      updatedCart = data?.data?.cartCreate?.cart
      if (updatedCart?.id) localStorage.setItem('cartId', updatedCart.id)
    }

    if (updatedCart) setCart(updatedCart)
    setLoading(false)
    setCartOpen(true)
  }

  const removeFromCart = async (lineId) => {
    const cartId = localStorage.getItem('cartId')
    if (!cartId) return
    const data = await shopifyFetch(REMOVE_FROM_CART, { cartId, lineIds: [lineId] })
    const updatedCart = data?.data?.cartLinesRemove?.cart
    if (updatedCart) setCart(updatedCart)
  }

  const cartCount = cart?.lines?.edges?.reduce((acc, { node }) => acc + node.quantity, 0) || 0
  const cartTotal = cart?.cost?.totalAmount

  return (
    <CartContext.Provider value={{ cart, cartOpen, setCartOpen, addToCart, removeFromCart, loading, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}