'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import styles from './page.module.css'
import Reviews from '@/components/Reviews'

export default function ProductClient({ product }) {
  const { addToCart, loading } = useCart()
  const images = product.images.edges.map(({ node }) => node)
  const variants = product.variants.edges.map(({ node }) => node)
  const options = product.options

  const [mainImage, setMainImage] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initial = {}
    options.forEach((opt) => { initial[opt.name] = opt.values[0] })
    return initial
  })
  const [medida, setMedida] = useState('')
  const [added, setAdded] = useState(false)

  const selectedVariant = variants.find((v) =>
    v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
  )

  const price = selectedVariant?.price || variants[0]?.price

  const handleOption = (name, value) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    await addToCart(selectedVariant.id, 1, medida)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* Galería */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            {images[mainImage] && (
              <Image
                src={images[mainImage].url}
                alt={images[mainImage].altText || product.title}
                fill
                className={styles.image}
                priority
              />
            )}
          </div>
          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === mainImage ? styles.thumbActive : ''}`}
                  onClick={() => setMainImage(i)}
                >
                  <Image src={img.url} alt={img.altText || ''} fill className={styles.thumbImage} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>
            ${Number(price?.amount).toLocaleString('es-CO')} {price?.currencyCode}
          </p>

          {/* Variantes */}
          {options.map((opt) => (
            <div key={opt.name} className={styles.optionGroup}>
              <p className={styles.optionLabel}>{opt.name}</p>
              <div className={styles.optionValues}>
                {opt.values.map((val) => (
                  <button
                    key={val}
                    className={`${styles.optionBtn} ${selectedOptions[opt.name] === val ? styles.optionBtnActive : ''}`}
                    onClick={() => handleOption(opt.name, val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* A la medida */}
          <div className={styles.medidaBox}>
            <p className={styles.medidaTitle}>¿Necesitas una medida especial?</p>
            <p className={styles.medidaSubtitle}>Nos ajustamos a tu necesidad</p>
            <textarea
              className={styles.medidaInput}
              placeholder="Describe las medidas o ajustes que necesitas (talla, largo, ancho, etc.)"
              value={medida}
              onChange={(e) => setMedida(e.target.value)}
              rows={3}
            />
          </div>

          {/* Botón */}
          <button
            className={`${styles.addBtn} ${!selectedVariant?.availableForSale ? styles.addBtnDisabled : ''}`}
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale || loading}
          >
            {loading ? 'Añadiendo...' : added ? '¡Añadido al carrito!' : !selectedVariant?.availableForSale ? 'Sin stock' : 'Añadir al carrito'}
          </button>

          {/* Descripción */}
          {product.description && (
            <div className={styles.description}>
              <p className={styles.descTitle}>Descripción</p>
              <p className={styles.descText}>{product.description}</p>
            </div>
          )}
        </div>
      </div>
      <Reviews reviewsData={product.reviews} />
    </main>
  )
}