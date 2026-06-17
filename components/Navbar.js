'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'
import { useCart } from '@/context/CartContext'


const menu = [
  {
    label: 'Hombres',
    slug: 'hombres',
    sub: ['Postrados', 'Alzheimer', 'Drenajes', 'Rehabilitación', 'Hospitalización'],
  },
  {
    label: 'Mujer',
    slug: 'mujer',
    sub: ['Postrados', 'Alzheimer', 'Drenajes', 'Rehabilitación', 'Hospitalización'],
  },
  {
    label: 'Niños',
    slug: 'ninos',
    sub: ['Postrados', 'Drenajes', 'Rehabilitación', 'Hospitalización'],
  },
  { label: 'Duos', slug: 'duos', sub: [] },
  { label: 'Mascotas', slug: 'mascotas', sub: [] },
]

const menuBottom = [
  { label: 'Sugerencias', slug: 'sugerencias' },
  { label: 'Garantías', slug: 'garantias' },
  { label: 'Rastreo de tu pedido', slug: 'rastreo' },
]

const topMessages = [
  '🌙 Envío gratis en compras superiores a $200.000',
  'Prendas adaptadas con amor y dedicación',
  'Asesoría personalizada por WhatsApp',
]

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState(null)
  const { cartCount, setCartOpen } = useCart()

  return (
    <>
    <div className={styles.stickyWrapper}>
      {/* Barra superior animada */}
      <div className={styles.topBar}>
        <div className={styles.marqueeTrack}>
          {[...topMessages, ...topMessages].map((msg, i) => (
            <span key={i} className={styles.marqueeItem}>
              {msg}
              {i === topMessages.length - 1 || i === topMessages.length * 2 - 1 ? null : <span className={styles.separator}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Navbar principal */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Luna Agujas y Sueños" width={60} height={60} priority />
            <span className={styles.logoName}>Luna</span>
          </Link>

          {/* Menú desktop */}
          <ul className={styles.navLinks}>
            {menu.map((item) => (
              <li
                key={item.slug}
                className={styles.navItem}
                onMouseEnter={() => setActiveMenu(item.slug)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.sub.length === 0 ? `/coleccion/${item.slug}` : '#'}
                  className={styles.navLink}
                >
                  {item.label}
                </Link>

                {item.sub.length > 0 && activeMenu === item.slug && (
                  <div className={styles.dropdown}>
                    {item.sub.map((sub) => (
                      <Link
                        key={sub}
                        href={`/coleccion/${item.slug}-${sub.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-')}`}
                        className={styles.dropdownLink}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}

            <li className={styles.divider} />

            {menuBottom.map((item) => (
              <li key={item.slug} className={styles.navItem}>
                <Link href={`/${item.slug}`} className={`${styles.navLink} ${styles.navLinkSecondary}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Iconos derecha */}
          <div className={styles.navActions}>
            <Link href="/buscar" aria-label="Buscar">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label="Carrito" className={styles.cartBtn}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </button>
          </div>

          {/* Botón mobile */}
          <button className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>

        {/* Menú mobile — desliza desde abajo */}
<div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
  {menu.map((item) => (
    <div key={item.slug} className={styles.mobileSection}>
      {item.sub.length === 0 ? (
        <Link href={`/coleccion/${item.slug}`} onClick={() => setMobileOpen(false)} className={styles.mobileSectionTitle}>
          {item.label}
        </Link>
      ) : (
        <>
          <button
            className={styles.mobileAccordion}
            onClick={() => setOpenSection(openSection === item.slug ? null : item.slug)}
          >
            <span>{item.label}</span>
            <span className={`${styles.arrow} ${openSection === item.slug ? styles.arrowOpen : ''}`}>›</span>
          </button>
          <div className={`${styles.accordionContent} ${openSection === item.slug ? styles.accordionOpen : ''}`}>
            {item.sub.map((sub) => (
              <Link
                key={sub}
                href={`/coleccion/${item.slug}-${sub.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-')}`}
                onClick={() => setMobileOpen(false)}
                className={styles.mobileLink}
              >
                {sub}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  ))}

  <div className={styles.mobileDivider} />

  {menuBottom.map((item) => (
    <Link key={item.slug} href={`/${item.slug}`} onClick={() => setMobileOpen(false)} className={styles.mobileLinkSecondary}>
      {item.label}
    </Link>
  ))}
</div>
      </nav>
      </div>
    </>
  )
}