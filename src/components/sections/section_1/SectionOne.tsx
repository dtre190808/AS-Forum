import { Link } from "react-router-dom"
import styles from "./SectionOne.module.css"

function SectionOne() {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Встречаемся на <span className={styles.highlight}>Форуме Алабуга Старт</span></h1>
        <Link to="/register" className={styles.button}>Зарегистрироваться</Link>
      </div>
      <div className={styles.subtitle}><h2>Профориентационный форум</h2></div>
      
    </section>
  )
}

export default SectionOne