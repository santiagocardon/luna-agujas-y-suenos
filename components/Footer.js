'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const categorias = [
  { label: 'Hombres', slug: 'hombres' },
  { label: 'Mujer', slug: 'mujer' },
  { label: 'Niños', slug: 'ninos' },
  { label: 'Duos', slug: 'duos' },
  { label: 'Mascotas', slug: 'mascotas' },
]

const recursos = [
  { label: 'Garantías', href: '/garantias' },
  { label: 'Sugerencias', href: '/sugerencias' },
  { label: 'Rastreo de tu pedido', href: '/rastreo' },
]

export default function Footer() {
  const [newsletter, setNewsletter] = useState('')
  const [newsletterSent, setNewsletterSent] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!newsletter.trim()) return
    setNewsletterSent(true)
    setNewsletter('')
    setTimeout(() => setNewsletterSent(false), 4000)
  }

  return (
    <footer className={styles.footer}>

      {/* ── Banner Newsletter ── */}
      <div className={styles.newsletterBanner}>
        <h2 className={styles.newsletterTitle}>Suscríbete a nuestro newsletter</h2>
        <p className={styles.newsletterSubtitle}>
          Recibe novedades y ofertas exclusivas directamente en tu correo.
        </p>
        <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={newsletter}
            onChange={(e) => setNewsletter(e.target.value)}
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterBtn}>Suscribirme</button>
        </form>
        {newsletterSent && <p className={styles.success}>¡Te has suscrito! 🌙</p>}
      </div>

      {/* ── Fila de contacto ── */}
      <div className={styles.infoRow}>
        <div className={styles.infoBlock}>
          <p className={styles.infoLabel}>Contáctanos</p>
          <a href="https://wa.me/573508852875" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
            +57 350 8852875
          </a>
        </div>

        <div className={styles.divider} />

        <div className={styles.infoBlock}>
          <p className={styles.infoLabel}>Horario de atención</p>
          <p className={styles.infoValue}>Lunes a domingo: 8:00 am – 6:00 pm</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.infoBlock}>
          <p className={styles.infoLabel}>Días festivos</p>
          <p className={styles.infoValue}>Vía WhatsApp: 9:00 am – 6:00 pm</p>
        </div>
      </div>

      {/* ── Columnas ── */}
      <div className={styles.columnsRow}>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Nuestros productos</h4>
          <ul className={styles.linkList}>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/coleccion/${c.slug}`} className={styles.footerLink}>
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Información</h4>
          <ul className={styles.linkList}>
            {recursos.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className={styles.footerLink}>
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Síguenos</h4>
          <div className={styles.socials}>
            <a href="https://www.instagram.com/lunaagujasysuenos?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" aria-label="Instagram">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/18yZ58Bypj/?mibextid=wwXIfr" aria-label="Facebook">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@lunaagujasysuenos?_r=1&_t=ZS-97ICyrpwN41" aria-label="TikTok">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Nuestro compromiso</h4>
          <p className={styles.contactText}>
            Fabricantes 100% colombianos, comprometidos con la calidad y el detalle en cada prenda. Ventas exclusivamente online.
          </p>
        </div>

      </div>

      {/* ── Bottom ── */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Luna Agujas y Sueños. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}