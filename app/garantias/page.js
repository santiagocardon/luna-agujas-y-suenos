import styles from './page.module.css'

export default function GarantiasPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1 className={styles.title}>Garantías</h1>

        <p className={styles.intro}>
          En Luna Agujas y Sueños creemos que cada uno de nuestros productos debe brindarte comodidad, confianza y tranquilidad. Por eso, todos cuentan con una garantía de 30 días a partir de que te llegue el producto, válida exclusivamente por defectos de fabricación.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>¿Qué cubre la garantía?</h2>
          <ul className={styles.list}>
            <li>Costuras defectuosas.</li>
            <li>Problemas en cierres, botones o broches.</li>
            <li>Imperfecciones en la tela originadas en el proceso de confección.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>¿Qué no cubre la garantía?</h2>
          <ul className={styles.list}>
            <li>Daños ocasionados por el uso normal, desgaste natural o lavado inadecuado.</li>
            <li>Alteraciones realizadas por terceros.</li>
            <li>Accidentes o mal uso del producto.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>¿Cómo hacer válida tu garantía?</h2>
          <ol className={styles.listNumbered}>
            <li>
              Puedes comunicarte por el medio que prefieras: WhatsApp, Instagram, Facebook o correo electrónico (
              <a href="mailto:lunaagujassuenos@gmail.com" className={styles.link}>lunaagujassuenos@gmail.com</a>
              ), indicando tu número de pedido.
            </li>
            <li>Adjunta fotos del daño para que nuestro equipo pueda evaluarlo.</li>
            <li>Una vez aprobado, podrás elegir entre reparación, cambio por un producto igual o un ajuste según disponibilidad de inventario.</li>
          </ol>
        </section>

        <p className={styles.closing}>
          En Luna Agujas y Sueños tu satisfacción es nuestra prioridad. Queremos que cada uno de nuestros productos sea un abrazo de comodidad y confianza, pensado especialmente para quienes más lo necesitan.
        </p>

        <a href="https://wa.me/573508852875" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
          Hacer válida mi garantía por WhatsApp
        </a>
      </div>
    </main>
  )
}