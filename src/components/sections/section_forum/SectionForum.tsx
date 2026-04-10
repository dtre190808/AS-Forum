import styles from "./SectionForum.module.css"

const ForumIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
)

const PlaneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  </svg>
)

const HomeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const FoodIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const benefits = [
  {
    icon: <ForumIcon />,
    title: "Форум",
    text: "Участие полностью бесплатное",
  },
  {
    icon: <PlaneIcon />,
    title: "Перелёт",
    text: "Мы оплачиваем дорогу до места проведения и обратно",
  },
  {
    icon: <HomeIcon />,
    title: "Жильё",
    text: "Комфортное проживание на весь период форума",
  },
  {
    icon: <FoodIcon />,
    title: "Питание",
    text: "Трёхразовое питание на протяжении всего форума",
  },
  {
    icon: <BriefcaseIcon />,
    title: "Трудоустройство",
    text: "Возможность получить работу по итогам форума",
  },
]

function SectionForum() {
  return (
    <section id="forum" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Всё расходы мы берём на себя</h2>
        </div>

        <div className={styles.grid}>
          {benefits.map((b) => (
            <article key={b.title} className={styles.card}>
              <span className={styles.icon}>{b.icon}</span>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.cardText}>{b.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionForum
