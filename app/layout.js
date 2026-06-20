import { Source_Serif_4 } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/CartDrawer'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '600'],
})

export const metadata = {
  title: 'Luna Agujas y Sueños',
  description: 'Ropa adaptada con amor para quienes más lo necesitan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" style={{ colorScheme: 'light' }}>
      <head>
        <link href="https://fonts.cdnfonts.com/css/safira-march" rel="stylesheet" />
      </head>
      <body className={sourceSerif.variable}>
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}