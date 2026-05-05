import styles from "./SectionTwo.module.css"

const bannerItems: string[] = [
  "Елабуга 16 мая",
  "Чита 22 мая",
  "Абакан 24 мая",
  "Елабуга 16 мая",
  "Чита 22 мая",
  "Абакан 24 мая",
]

function SectionTwo() {
  return (
    <section className={styles.section}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {bannerItems.map((text, index) => (
            <span key={index} className={styles.item}>
              <span>{text}</span>
              <span className={styles.arrow}>→</span>
            </span>
          ))}
          {bannerItems.map((text, index) => (
            <span key={`copy-${index}`} className={styles.item} aria-hidden="true">
              <span>{text}</span>
              <span className={styles.arrow}>→</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionTwo