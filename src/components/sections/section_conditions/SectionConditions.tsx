import styles from "./SectionConditions.module.css"

const conditions = [
  { id: 1, text: "Девушки от 16 до 22 лет" },
  { id: 2, text: "Образование: не менее 9 классов" },
  { id: 3, text: "Стремление к достижению результатов" },
  { id: 4, text: "Стрессоустойчивость" },
  { id: 5, text: "Отсутствие острых хронических заболеваний" },
]

function SectionConditions() {
  return (
    <section id="conditions" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Условия участия</h2>

        <div className={styles.grid}>
          {conditions.map((c) => (
            <article key={c.id} className={styles.card}>
              <span className={styles.number}>0{c.id}</span>
              <p className={styles.text}>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionConditions
