'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

const slides = [
  { slug: 'hombres', label: 'Hombres', desktop: '/banner-hombres-desktop.png', mobile: '/banner-hombres-mobile.png' },
  { slug: 'mujer', label: 'Mujer', desktop: '/banner-mujer-desktop.png', mobile: '/banner-mujer-mobile.png' },
  { slug: 'ninos', label: 'Niños', desktop: '/banner-ninos-desktop.png', mobile: '/banner-ninos-mobile.png' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(null)
  const autoplayRef = useRef(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const goTo = (index) => {
    if (animating || index === current) return
    setPrev(current)
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => {
      setPrev(null)
      setAnimating(false)
    }, 700)
  }

  const next = () => goTo((current + 1) % slides.length)
  const back = () => goTo((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    autoplayRef.current = setInterval(next, 5500)
    return () => clearInterval(autoplayRef.current)
  }, [current, animating])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : back()
    touchStartX.current = null
  }

  return (
    <section
      className={styles.hero}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide anterior — sale */}
      {prev !== null && (
        <div className={`${styles.slide} ${styles.slideOut}`}>
          <Image
            src={isMobile ? slides[prev].mobile : slides[prev].desktop}
            alt={slides[prev].label}
            fill
            className={styles.image}
          />
          <div className={styles.overlay} />
        </div>
      )}

      {/* Slide actual — entra */}
      <div className={`${styles.slide} ${animating ? styles.slideIn : styles.slideVisible}`}>
        <Image
          src={isMobile ? slides[current].mobile : slides[current].desktop}
          alt={slides[current].label}
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay} />
      </div>

      {/* Botón centrado */}
      <div className={styles.content}>
        <Link key={current} href={`/coleccion/${slides[current].slug}`} className={styles.cta}>
          Ver colección
        </Link>
      </div>

      {/* Flechas — solo desktop */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={back} aria-label="Anterior">‹</button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Siguiente">›</button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button key={i} className={`${styles.dot} ${i === current ? styles.dotActive : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  )
}