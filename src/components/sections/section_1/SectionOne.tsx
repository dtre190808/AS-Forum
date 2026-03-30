import styles from "./SectionOne.module.css"

function SectionOne() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Встречаемся на <span className={styles.highlight}>Форуме</span></h1>
        <button className={styles.button}>Зарегистрироваться</button>
      </div>
      <div className={styles.subtitle}><h2>Международная программа “Алабуга СТАРТ”</h2></div>
      
    </section>
  )
}

export default SectionOne