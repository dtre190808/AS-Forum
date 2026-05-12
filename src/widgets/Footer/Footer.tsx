import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <span className={`${styles.spark} ${styles.sparkTop}`}></span>
        <span className={`${styles.spark} ${styles.sparkLeft}`}></span>
        <span className={`${styles.loop} ${styles.loopFirst}`}></span>
        <span className={`${styles.loop} ${styles.loopSecond}`}></span>

        <div className={styles.content}>
          <h2 className={styles.title}>
            Алабуга -
            <br />
            пространство
            <br />
            для твоего роста
          </h2>

          <Link className={styles.button} to="/register">
            Зарегистрироваться
          </Link>

          <div className={styles.bottomInfo}>
            <div>
              <p className={styles.question}>Остались вопросы?</p>

              <div className={styles.contacts}>
                <a className={styles.contactLink} href="https://t.me/dilyara_aliyeva" target="_blank" rel="noopener noreferrer">
                  Телеграм
                </a>
                <a className={styles.contactLink} href="https://max.ru/u/f9LHodD0cOKi4JavCuikCXN71pAZYvzHCJddrAJ2KSyDOlBTtGOpxy_Kc3Y">
                  МАХ
                </a>
                <a className={styles.contactLink} href="mailto:DAlieva@alabuga.ru">
                  Email
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.visual}>
          <img
            className={`${styles.photo} ${styles.photoLeft}`}
            src="/hero/devochki.png"
            alt="Участница программы"
            loading="lazy"
            decoding="async"
            data-photo="person-fade"
          />
        </div>

        <div className={styles.legalBlock}>
          <p className={styles.companyName}>АО «ОЭЗ ППТ «Алабуга»</p>
          <p className={styles.companyDetail}>
            Юридический адрес: 423601, Республика Татарстан, Елабужский район, ул. Ш-2 (ОЭЗ Алабуга тер.), д. 4/1
          </p>
          <p className={styles.companyDetail}>
            E-mail:{" "}
            <a className={styles.legalLink} href="mailto:invest@alabuga.ru">
              invest@alabuga.ru
            </a>
          </p>
          <p className={styles.companyDetail}>
            Телефон:{" "}
            <a className={styles.legalLink} href="tel:+78555759006">
              +7 (85557) 5-90-06
            </a>
          </p>
          <div className={styles.legalLinks}>
            <Link className={styles.legalLink} to="/cookie">Куки</Link>
            <Link className={styles.legalLink} to="/privacy-policy">Политика конфиденциальности</Link>
          </div>
        </div>

        <div className={styles.meta}>
          <span>©ALABUGA START. 2026</span>
          <span>ОГРН 1061674037259</span>
          <span>ИНН 1646019914</span>
          <span>2026 АО «ОЭЗ ППТ «Алабуга» 16+</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer