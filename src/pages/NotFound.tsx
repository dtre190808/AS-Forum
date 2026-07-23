import { Link } from "react-router"
import styles from "./NotFound.module.css"

function NotFound() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.text}>Такой страницы не существует или она была удалена</p>
      <Link className={styles.link} to="/">На главную</Link>
    </div>
  )
}

export default NotFound
