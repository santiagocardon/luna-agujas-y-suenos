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
      <div className={styles.top}>

        {/* Nuestros productos */}
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

        {/* Contáctanos */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contáctanos</h4>
          <a href="https://wa.me/573508852875" target="_blank" rel="noopener noreferrer" className={styles.phone}>
            +57 350 8852875
          </a>
          <p className={styles.contactText}>
            Somos fabricantes comprometidos con la calidad y el detalle en cada prenda. Nuestra confección es 100% colombiana, realizada con dedicación y materiales de primera.
          </p>
          <p className={styles.contactText}>
            Realizamos nuestras ventas exclusivamente de manera online, ofreciendo comodidad, confianza y acceso directo a nuestros productos desde cualquier lugar.
          </p>
        </div>

        {/* Horarios */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Horarios de atención</h4>
          <ul className={styles.horarioList}>
            <li>
              <span className={styles.horarioLabel}>Lunes a domingo</span>
              <span className={styles.horarioVal}>8:00 am – 10:00 pm</span>
            </li>
            <li>
              <span className={styles.horarioLabel}>Días festivos vía WhatsApp</span>
              <span className={styles.horarioVal}>9:00 am – 7:00 pm</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Suscríbete</h4>
          <p className={styles.contactText}>
            Recibe novedades y ofertas exclusivas directamente en tu correo.
          </p>
          <form className={styles.form} onSubmit={handleNewsletter}>
            <div className={styles.inputRow}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                className={styles.input}
              />
              <button type="submit" className={styles.inputBtn}>›</button>
            </div>
            {newsletterSent && <p className={styles.success}>¡Te has suscrito! 🌙</p>}
          </form>
        </div>

      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.socials}>
          <a href="#" aria-label="Instagram">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Luna Agujas y Sueños. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}