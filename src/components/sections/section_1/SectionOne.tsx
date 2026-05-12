import { Link } from "react-router-dom"
import styles from "./SectionOne.module.css"

function SectionOne() {
  return (
    <section id="home" className={styles.section}>
      <h1 className={styles.title}>
        Встречаемся на<br />
        <span className={styles.highlight}>Форуме Алабуга Старт</span>
      </h1>

      <p className={styles.subtitle}>
        Бесплатный перелёт, проживание и питание. Реальный шанс получить работу
        с зарплатой от 108 725 ₽ — для девушек 16–22 лет.
      </p>

      <div className={styles.actions}>
        <Link to="/register" className={styles.button}>
          Зарегистрироваться
        </Link>
        <a href="#about-forum" className={`${styles.button} ${styles.buttonGhost}`}>
          Как это было
        </a>
      </div>

    </section>
  )
}

export default SectionOne
