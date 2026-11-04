import { useState } from "react"
import { Link } from "react-router"
import styles from "./CookieBanner.module.css"

const STORAGE_KEY = "cookie-consent-accepted"

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      const accepted = localStorage.getItem(STORAGE_KEY)
      return !accepted
    } catch {
      return true
    }
  })

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* ignore */
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className={styles.banner} role="dialog" aria-label="Согласие на использование cookie">
      <p className={styles.text}>
        Мы используем cookie для анализа активности пользователей на сайте. Продолжая
        пользоваться сайтом, Вы даёте{" "}
        <Link className={styles.link} to="/cookie">
          согласие на обработку персональных данных, получаемых посредством cookie-файлов
        </Link>
        , и соглашаетесь с{" "}
        <Link className={styles.link} to="/privacy-policy">
          Политикой обработки персональных данных
        </Link>
        . Вы можете отключить cookie в настройках вашего браузера.
      </p>
      <button type="button" className={styles.button} onClick={handleAccept}>
        Согласен
      </button>
    </div>
  )
}

export default CookieBanner
