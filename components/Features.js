'use client'

import styles from './Features.module.css'
import { useReveal } from '@/hooks/useReveal'
const features = [
  {
    label: 'Envío gratis',
    desc: 'en compras superiores a $250.000',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3"/>
        <rect x="9" y="11" width="14" height="10" rx="2"/>
        <circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      </svg>
    ),
  },
  {
    label: 'Garantía Luna',
    desc: '30 días por defectos de fabricación',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    label: 'Entregas rápidas',
    desc: 'de 1 a 5 días en todo el país',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    label: 'Diseñado con amor',
    desc: 'prendas pensadas para cada necesidad',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: 'Asesoría personalizada',
    desc: 'acompañamiento humano en cada compra',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
]

function FeatureCard({ feature, index }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''} delay-${index + 1}`}
    >
      <div className={styles.icon}>{feature.icon}</div>
      <p className={styles.label}>{feature.label}</p>
      <p className={styles.desc}>{feature.desc}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {features.map((f, i) => (
          <FeatureCard key={f.label} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}