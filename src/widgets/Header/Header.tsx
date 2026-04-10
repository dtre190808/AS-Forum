import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo  from "../../assets/Logo_start.svg"
import styles from "./Header.module.css"

const navItems = [
  { label: "Главная", targetId: "home" },
  { label: "Что тебя ждет?", targetId: "experiences" },
  { label: "Как это было?", targetId: "about-forum" },
  { label: "Направления", targetId: "directions" },
  { label: "Преимущества", targetId: "advantages" },
  { label: "Истории успеха", targetId: "success-stories" },
  { label: "FAQ", targetId: "faq" },
  { label: "Подробнее", targetId: "details" },
] as const

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const scrollToSection = (targetId: string) => {
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const targetElement = document.getElementById(targetId)

    if (!targetElement) {
      return
    }

    const headerElement = document.querySelector("header")
    const headerOffset = headerElement instanceof HTMLElement ? headerElement.offsetHeight + 24 : 120
    const nextTop = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({ top: Math.max(nextTop, 0), behavior: "smooth" })
  }

  const handleNavClick = (targetId: string) => {
    setIsMenuOpen(false)
    scrollToSection(targetId)
  }

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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
        <button type="button" className={styles.logoButton} onClick={() => handleNavClick("home")}>
          <img src={logo} alt="logo" />
        </button>
        <ul className={styles.linksRow}>
          {navItems.map((item) => (
            <li key={item.targetId}>
              <button type="button" className={styles.linkButton} onClick={() => handleNavClick(item.targetId)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className={`${styles.linkButton} ${styles.desktopOnly}`} onClick={() => navigate("/register")}>
          Зарегистрироваться
        </button>
        <button
          type="button"
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {isMenuOpen && (
        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <button
              key={item.targetId}
              type="button"
              className={styles.mobileLink}
              onClick={() => handleNavClick(item.targetId)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={styles.mobileRegister}
            onClick={() => { setIsMenuOpen(false); navigate("/register") }}
          >
            Зарегистрироваться
          </button>
        </nav>
      )}
    </>
  )
}

export default Header