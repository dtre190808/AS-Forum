import { useEffect, useState } from "react"
import logo  from "../../assets/Logo_start.svg"
import styles from "./Header.module.css"

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <img src={logo} alt="logo" />
      <ul className={styles.linksRow}>
        <li className={styles.link}>Главная</li>
        <li className={styles.link}>Лучшие моменты</li>
        <li className={styles.link}>Спикеры</li>
        <li className={styles.link}>Хедлайнеры</li>
        <li className={styles.link}>Технологии</li>
        <li className={styles.link}><a href="#" className={styles.link}>Подробнее</a></li>
      </ul>
      <a href="#" className={`${styles.link}`}>Зарегистрироваться</a>
    </header>
  )
}

export default Header