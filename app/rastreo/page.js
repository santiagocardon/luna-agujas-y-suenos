'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function RastreoPage() {
  const [guia, setGuia] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!guia.trim()) return
    // Redirige a la página de rastreo oficial de Coordinadora con la guía ya cargada
    window.open(
      `https://www.coordinadora.com/rastreo-de-envios/rastreo-individual/?guia=${guia.trim()}`,
      '_blank'
    )
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Rastrea tu pedido</h1>

        <p className={styles.text}>
          En Luna Agujas y Sueños queremos que siempre tengas tranquilidad al comprar con nosotros. Por eso, ponemos a tu disposición nuestra herramienta de rastreo de pedidos, donde podrás consultar en tiempo real el estado de tu compra.
        </p>

        <div className={styles.box}>
          <h2 className={styles.boxTitle}>¿Qué podrás ver?</h2>
          <ul className={styles.list}>
            <li>Confirmación de tu pedido.</li>
            <li>Estado de preparación y despacho.</li>
            <li>Ubicación y avance del envío hasta llegar a tu puerta.</li>
          </ul>
        </div>

        <p className={styles.text}>
          Solo necesitas ingresar el número de la guía de tu envío en el recuadro de rastreo y tendrás toda la información al instante.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Número de guía de Coordinadora"
            value={guia}
            onChange={(e) => setGuia(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            Rastrear pedido
          </button>
        </form>

        <p className={styles.closing}>
          Tu confianza es nuestra prioridad, y queremos que cada paso de tu compra sea tan cómodo y seguro como nuestros productos. 🌙
        </p>
      </div>
    </main>
  )
}