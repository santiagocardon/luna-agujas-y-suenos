'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './CollectionsGrid.module.css'
import { useReveal } from '@/hooks/useReveal'

const sections = [
  { label: 'Hombres', slug: 'hombres', image: '/grid-hombres.jpg' },
  { label: 'Mujer', slug: 'mujer', image: '/grid-mujer.jpg' },
  { label: 'Niños', slug: 'ninos', image: '/grid-ninos.jpg' },
  { label: 'Duos', slug: 'duos', image: '/grid-duos.jpg' },
  { label: 'Mascotas', slug: 'mascotas', image: '/grid-hombres.jpg' },
]

export default function CollectionsGrid() {
  const [taglineRef, taglineVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()

  return (
    <>
      <div
        ref={taglineRef}
        className={`${styles.tagline} reveal ${taglineVisible ? 'visible' : ''}`}
      >
        <p>Prendas diseñadas con amor</p>
        <h2>para quienes más lo necesitan</h2>
      </div>

      <section className={styles.section}>
        <div ref={gridRef} className={styles.grid}>
          {sections.map((item, index) => (
            <Link
              key={item.slug}
              href={`/coleccion/${item.slug}`}
              className={`${styles.card} ${index === 4 ? styles.cardFull : ''} reveal-scale ${gridVisible ? 'visible' : ''} delay-${index + 1}`}
            >
              <div className={styles.imageWrapper}>
                <Image src={item.image} alt={item.label} fill className={styles.image} />
                <div className={styles.overlay} />
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{item.label}</h2>
                <span className={styles.cardCta}>Ver colección →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}