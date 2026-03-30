import styles from "./SectionTwo.module.css"

const bannerItems = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  text: "Регистрация на Форум 1-3 мая",
}))

function SectionTwo() {
  return (
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {bannerItems.map((item) => (
            <span key={item.id} className={styles.item}>
              <span>{item.text}</span>
              <span className={styles.arrow}>→</span>
            </span>
          ))}
        </div>
        <div className={styles.track} aria-hidden="true">
          {bannerItems.map((item) => (
            <span key={`copy-${item.id}`} className={styles.item}>
              <span>{item.text}</span>
              <span className={styles.arrow}>→</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionTwo