'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal } = useCart()

  const lines = cart?.lines?.edges?.map(({ node }) => node) || []

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${cartOpen ? styles.overlayVisible : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${cartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tu carrito</h2>
          <button
            className={styles.close}
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {lines.map((line) => {
                const image =
                  line.merchandise.product.images.edges[0]?.node

                const customNote = line.attributes?.find(
                  (a) => a.key === 'Medida personalizada'
                )?.value

                return (
                  <div key={line.id} className={styles.item}>
                    <div className={styles.itemImage}>
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText || ''}
                          fill
                          className={styles.img}
                        />
                      )}
                    </div>

                    <div className={styles.itemInfo}>
                      <p className={styles.itemTitle}>
                        {line.merchandise.product.title}
                      </p>

                      <p className={styles.itemVariant}>
                        {line.merchandise.title}
                      </p>

                      {customNote && (
                        <p className={styles.itemNote}>
                          📏 {customNote}
                        </p>
                      )}

                      <p className={styles.itemPrice}>
                        $
                        {Number(
                          line.merchandise.price.amount
                        ).toLocaleString('es-CO')}{' '}
                        {line.merchandise.price.currencyCode}
                      </p>

                      <p className={styles.itemQty}>
                        Cantidad: {line.quantity}
                      </p>
                    </div>

                    <button
                      className={styles.remove}
                      onClick={() => removeFromCart(line.id)}
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>

            <div className={styles.footer}>
              {cartTotal && (
                <div className={styles.total}>
                  <span>Total</span>
                  <span>
                    $
                    {Number(cartTotal.amount).toLocaleString('es-CO')}{' '}
                    {cartTotal.currencyCode}
                  </span>
                </div>
              )}

              <a
                href={cart?.checkoutUrl}
                className={styles.checkoutBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                Finalizar compra
              </a>

              <button
                className={styles.continueBtn}
                onClick={() => setCartOpen(false)}
              >
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}