'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function SugerenciasPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.mensaje.trim()) return
    // Por ahora solo confirmación visual — se conectará a backend más adelante
    setSent(true)
    setForm({ nombre: '', email: '', mensaje: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sugerencias</h1>
        <p className={styles.text}>
          En Luna Agujas y Sueños valoramos tu opinión. Este espacio está pensado para que compartas con nosotros tus ideas, recomendaciones sobre nuestros productos y sobre nuestro servicio.
        </p>
        <p className={styles.text}>
          Cada comentario nos ayuda a mejorar y seguir creando piezas que brinden comodidad, confianza y un toque especial para quienes más lo necesitan.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre (opcional)"
              value={form.nombre}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo (opcional)"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <textarea
            name="mensaje"
            placeholder="Escribe aquí tu comentario o sugerencia..."
            value={form.mensaje}
            onChange={handleChange}
            className={styles.textarea}
            rows={6}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            Enviar sugerencia
          </button>
          {sent && (
            <p className={styles.success}>
              Gracias por tu mensaje 🌙 — lo leeremos con cariño.
            </p>
          )}
        </form>
      </div>
    </main>
  )
}