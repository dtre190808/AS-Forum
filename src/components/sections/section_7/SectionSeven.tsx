import styles from "./SectionSeven.module.css"

type BenefitItem = {
  id: number
  text: string
  icon: "cap" | "key" | "wallet" | "plane" | "transfer"
}

const benefits: BenefitItem[] = [
  { id: 1, icon: "cap", text: "Профессиональная подготовка" },
  { id: 2, icon: "key", text: "Льготное проживание в корпоративном жилье" },
  { id: 3, icon: "wallet", text: "Денежное содержание от 108 725 ₽" },
  { id: 4, icon: "plane", text: "Бесплатный перелёт в Республику Татарстан" },
  { id: 5, icon: "transfer", text: "Трансфер до работы и обратно" },
]

function BenefitIcon({ icon }: { icon: BenefitItem["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }

  switch (icon) {
    case "cap":
      return (
        <svg {...common}>
          <path d="M2 9 12 5l10 4-10 4L2 9Z" />
          <path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" />
          <path d="M22 9v6" />
        </svg>
      )
    case "key":
      return (
        <svg {...common}>
          <circle cx="8" cy="14" r="4" />
          <path d="M11 11l9-9" />
          <path d="M16 6l3 3" />
          <path d="M18 4l3 3" />
        </svg>
      )
    case "wallet":
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="19" height="13" rx="2.5" />
          <path d="M2.5 10h19" />
          <path d="M16 14h5" />
          <circle cx="17" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case "plane":
      return (
        <svg {...common}>
          <path d="M21 11 3 18l3-5-3-5 18 3-7 6 1 4-3-3Z" />
        </svg>
      )
    case "transfer":
      return (
        <svg {...common}>
          <path d="M3 8h13" />
          <path d="M13 4l4 4-4 4" />
          <path d="M21 16H8" />
          <path d="M11 20l-4-4 4-4" />
        </svg>
      )
  }
}

function SectionSeven() {
  return (
    <section id="advantages" className={styles.sectionSeven}>
      <div className={styles.box}>
        <span className={`${styles.spark} ${styles.sparkLeft}`}></span>
        <span className={`${styles.spark} ${styles.sparkRight}`}></span>

        <div className={styles.head}>
          <h2 className={styles.title}>
            Преимущества<br />программы
          </h2>
        </div>

        <div className={styles.layout}>
          <ul className={styles.list}>
            {benefits.map((benefit) => (
              <li key={benefit.id} className={styles.item}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <BenefitIcon icon={benefit.icon} />
                </span>
                <p className={styles.itemText}>{benefit.text}</p>
              </li>
            ))}
          </ul>

          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src="/hero/sectionSevenHero.png"
              alt="Участница программы"
              loading="lazy"
              decoding="async"
              data-photo="person-fade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionSeven
