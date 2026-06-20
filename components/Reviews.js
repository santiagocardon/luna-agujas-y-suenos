import styles from './Reviews.module.css'

function Stars({ rating, size = 16 }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" fill={n <= rating ? '#E0A526' : '#E5E7EB'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  )
}

function parseReview(node) {
  const fields = {}
  node.fields.forEach((f) => { fields[f.key] = f.value })
  return {
    nombre: fields.nombre || 'Cliente',
    calificacion: Number(fields.calificacion || fields['calificación'] || 0),
    comentario: fields.comentario || '',
    fecha: fields.fecha || '',
  }
}

export default function Reviews({ reviewsData }) {
  const edges = reviewsData?.references?.edges || []
  const reviews = edges.map(({ node }) => parseReview(node))

  if (reviews.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.heading}>Opiniones de nuestros clientes</h2>
        <p className={styles.empty}>Este producto aún no tiene reseñas.</p>
      </section>
    )
  }

  const total = reviews.length
  const average = reviews.reduce((acc, r) => acc + r.calificacion, 0) / total

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.calificacion === star).length
    const percent = total ? (count / total) * 100 : 0
    return { star, count, percent }
  })

  return (
    <section className={styles.section}>
      <div className={styles.summary}>
        <div className={styles.summaryLeft}>
          <p className={styles.average}>{average.toFixed(2)}</p>
          <Stars rating={Math.round(average)} size={18} />
          <p className={styles.totalLabel}>{total} {total === 1 ? 'opinión' : 'opiniones'}</p>
        </div>

        <div className={styles.bars}>
          {distribution.map(({ star, count, percent }) => (
            <div key={star} className={styles.barRow}>
              <span className={styles.barLabel}>{star} ★</span>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${percent}%` }} />
              </div>
              <span className={styles.barCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 className={styles.heading}>Opiniones de nuestros clientes</h3>

      <div className={styles.list}>
        {reviews.map((review, i) => (
          <div key={i} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <Stars rating={review.calificacion} />
              <span className={styles.reviewName}>{review.nombre}</span>
              {review.fecha && <span className={styles.reviewDate}>{review.fecha}</span>}
            </div>
            <p className={styles.reviewText}>{review.comentario}</p>
          </div>
        ))}
      </div>
    </section>
  )
}