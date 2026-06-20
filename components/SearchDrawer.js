'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { shopifyFetch } from '@/lib/shopify'
import { SEARCH_PRODUCTS } from '@/lib/queries'
import styles from './SearchDrawer.module.css'

export default function SearchDrawer({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      setQuery('')
      setResults([])
    }
  }, [open])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      const data = await shopifyFetch(SEARCH_PRODUCTS, { query: `title:*${query}*` })
      const products = data?.data?.products?.edges?.map(({ node }) => node) || []
      setResults(products)
      setLoading(false)
    }, 350)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayVisible : ''}`}
        onClick={onClose}
      />

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.inputWrapper}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar productos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.input}
            />
          </div>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={styles.results}>
          {loading && <p className={styles.status}>Buscando...</p>}

          {!loading && query && results.length === 0 && (
            <p className={styles.status}>No encontramos productos para “{query}”</p>
          )}

          {!loading && !query && (
            <p className={styles.status}>Escribe para buscar entre nuestros productos</p>
          )}

          {results.map((product) => {
            const image = product.images.edges[0]?.node
            const price = product.priceRange.minVariantPrice
            return (
              <Link
                key={product.id}
                href={`/producto/${product.handle}`}
                onClick={onClose}
                className={styles.resultItem}
              >
                <div className={styles.resultImage}>
                  {image ? (
                    <Image src={image.url} alt={image.altText || product.title} fill className={styles.img} />
                  ) : (
                    <div className={styles.resultPlaceholder} />
                  )}
                </div>
                <div className={styles.resultInfo}>
                  <p className={styles.resultTitle}>{product.title}</p>
                  <p className={styles.resultPrice}>
                    ${Number(price.amount).toLocaleString('es-CO')} {price.currencyCode}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}