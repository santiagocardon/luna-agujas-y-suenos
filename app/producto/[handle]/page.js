import { shopifyFetch } from '@/lib/shopify'
import { GET_PRODUCT_BY_HANDLE } from '@/lib/queries'
import ProductClient from './ProductClient'

export default async function ProductPage({ params }) {
  const { handle } = await params
  const data = await shopifyFetch(GET_PRODUCT_BY_HANDLE, { handle })
  const product = data?.data?.product

  if (!product) {
    return (
      <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>Producto no encontrado</h1>
      </main>
    )
  }

  return <ProductClient product={product} />
}