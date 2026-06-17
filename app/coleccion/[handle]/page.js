import { shopifyFetch } from '@/lib/shopify'
import { GET_COLLECTION_BY_HANDLE } from '@/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

// Mapa de secciones principales y sus subcategorías
const secciones = {
  hombres: {
    label: 'Hombres',
    sub: [
      { label: 'Postrados', slug: 'hombres-postrados' },
      { label: 'Alzheimer', slug: 'hombres-alzheimer' },
      { label: 'Drenajes', slug: 'hombres-drenajes' },
      { label: 'Rehabilitación', slug: 'hombres-rehabilitacion' },
      { label: 'Hospitalización', slug: 'hombres-hospitalizacion' },
    ],
  },
  mujer: {
    label: 'Mujer',
    sub: [
      { label: 'Postrados', slug: 'mujer-postrados' },
      { label: 'Alzheimer', slug: 'mujer-alzheimer' },
      { label: 'Drenajes', slug: 'mujer-drenajes' },
      { label: 'Rehabilitación', slug: 'mujer-rehabilitacion' },
      { label: 'Hospitalización', slug: 'mujer-hospitalizacion' },
    ],
  },
  ninos: {
    label: 'Niños',
    sub: [
      { label: 'Postrados', slug: 'ninos-postrados' },
      { label: 'Drenajes', slug: 'ninos-drenajes' },
      { label: 'Rehabilitación', slug: 'ninos-rehabilitacion' },
      { label: 'Hospitalización', slug: 'ninos-hospitalizacion' },
    ],
  },
}

export default async function ColeccionPage({ params }) {
  const { handle } = await params
  const seccion = secciones[handle]

  // Página intermedia — sección principal con subcategorías
  if (seccion) {
    return (
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{seccion.label}</h1>
          <p className={styles.subtitle}>Selecciona una categoría</p>
        </div>
        <div className={styles.subGrid}>
          {seccion.sub.map((item) => (
            <Link key={item.slug} href={`/coleccion/${item.slug}`} className={styles.subCard}>
              <span className={styles.subLabel}>{item.label}</span>
              <span className={styles.subArrow}>→</span>
            </Link>
          ))}
        </div>
      </main>
    )
  }

  // Página de colección específica — productos de Shopify
  const data = await shopifyFetch(GET_COLLECTION_BY_HANDLE, { handle })
  const collection = data?.data?.collection

  if (!collection) {
    return (
      <main className={styles.main}>
        <h1>Colección no encontrada</h1>
      </main>
    )
  }

  const products = collection.products.edges.map(({ node }) => node)

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>{collection.title}</h1>
        {collection.description && (
          <p className={styles.description}>{collection.description}</p>
        )}
      </div>

      {products.length === 0 ? (
        <p className={styles.empty}>No hay productos en esta colección aún.</p>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => {
            const image = product.images.edges[0]?.node
            const price = product.priceRange.minVariantPrice

            return (
              <Link key={product.id} href={`/producto/${product.handle}`} className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  {image ? (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.productImagePlaceholder} />
                  )}
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productTitle}>{product.title}</p>
                  <p className={styles.productPrice}>
                    ${Number(price.amount).toLocaleString('es-CO')} {price.currencyCode}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}