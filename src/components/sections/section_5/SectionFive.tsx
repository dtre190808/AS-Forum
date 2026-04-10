import styles from "./SectionFive.module.css"

function SectionFive() {
  return (
    <section className={styles.sectionFive}>
      <h2 className={styles.quote}>
        Алабуга Старт - Это Возможность
        <br />
        Для Молодых и талантливых девушек
        <br />
        со всего мира построить карьеру
        <br />
        и изменить свою жизнь к лучшему.
        <span className={styles.bracketEnd}>"</span>
      </h2>
    </section>
  )
}

export default SectionFive