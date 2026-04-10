import styles from "./SectionSeven.module.css"

type BenefitItem = {
  id: number
  text: string
  icon: "cap" | "key" | "wallet" | "plane" | "transfer"
  iconSrc?: string
}

const benefits: BenefitItem[] = [
  {
    id: 1,
    icon: "cap",
    text: "Профессиональная подготовка",
  },
  {
    id: 2,
    icon: "key",
    iconSrc: "/icons/key.png",
    text: "Льготное проживание в корпоративном жилье",
  },
  {
    id: 3,
    icon: "wallet",
    text: "Денежное содержание от 108 725 рублей",
  },
  {
    id: 4,
    icon: "plane",
    iconSrc: "/icons/aeroplane.png",
    text: "Бесплатный перелет в Республику Татарстан",
  },
  {
    id: 5,
    icon: "transfer",
    iconSrc: "/icons/transfer.png",
    text: "Трансфер до работы и обратно",
  },
]

function BenefitIcon({ icon, iconSrc }: { icon: BenefitItem["icon"]; iconSrc?: string }) {
  if (iconSrc) {
    return <img src={iconSrc} alt="" aria-hidden="true" />
  }

  if (icon === "cap") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M6 24 32 14l26 10-26 10L6 24Z" />
        <path d="M17 29v10c0 2 7 8 15 8s15-6 15-8V29" />
        <path d="M54 26v15" />
        <path d="M54 41c-2 1-3 3-3 5a3 3 0 0 0 6 0c0-2-1-4-3-5Z" />
      </svg>
    )
  }

  if (icon === "key") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="21" cy="30" r="11" />
        <circle cx="21" cy="30" r="3.5" />
        <path d="M29 24 48 6" />
        <path d="M41 13l5 5" />
        <path d="M46 8l10 10" />
        <path d="M50 18l6 6" />
      </svg>
    )
  }

  if (icon === "wallet") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M11 19c0-3 2-5 5-5h24l6 6h4c3 0 5 2 5 5v20c0 3-2 5-5 5H14c-3 0-5-2-5-5V24c0-3 2-5 5-5Z" />
        <path d="M9 24h46" />
        <path d="M40 34h15v10H40c-3 0-5-2-5-5s2-5 5-5Z" />
        <circle cx="45" cy="39" r="1.8" />
      </svg>
    )
  }

  if (icon === "plane") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M56 10 33 28" />
        <path d="M56 10 44 36" />
        <path d="M33 28 8 23l-4 4 20 9" />
        <path d="M24 36 17 56l4 4 12-18" />
        <path d="M24 36 44 36" />
        <path d="M56 10c2 2 2 6 0 8L33 36" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M14 18H7l8-8" />
      <path d="M14 18c0 8 7 15 15 15h6" />
      <path d="M50 18h7l-8-8" />
      <path d="M50 18c0 8-7 15-15 15h-6" />
      <path d="M14 46H7l8 8" />
      <path d="M14 46c0-8 7-15 15-15h6" />
      <path d="M50 46h7l-8 8" />
      <path d="M50 46c0-8-7-15-15-15h-6" />
    </svg>
  )
}

function SectionSeven() {
  return (
    <section id="advantages" className={styles.sectionSeven}>
      <div className={styles.box}>
        <span className={`${styles.spark} ${styles.sparkLeft}`}></span>
        <span className={`${styles.spark} ${styles.sparkRight}`}></span>

        <div className={styles.head}>
          <h2 className={styles.title}>
            Преимущества
            <br />
            программы
          </h2>
        </div>

        <div className={styles.layout}>
          <ul className={styles.list}>
            {benefits.map((benefit) => (
              <li key={benefit.id} className={styles.item}>
                <span className={styles.iconWrap}>
                  <BenefitIcon icon={benefit.icon} iconSrc={benefit.iconSrc} />
                </span>
                <p className={styles.itemText}>{benefit.text}</p>
              </li>
            ))}
          </ul>

          <div className={styles.imageWrap}>
            <img className={styles.image} src="/hero/sectionSevenHero.png" alt="Участница программы" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionSeven