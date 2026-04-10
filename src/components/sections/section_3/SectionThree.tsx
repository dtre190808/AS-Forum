import styles from "./SectionThree.module.css"
import photo1 from "../../../assets/section_3_photo_1.png"
import photo2 from "../../../assets/section_3_photo_2.png"
import photo3 from "../../../assets/section_3_photo_3.png"
import photo4 from "../../../assets/section_3_photo_4.png"
import photo5 from "../../../assets/section_3_photo_5.png"
import photo6 from "../../../assets/section_3_photo_6.png"
import photo7 from "../../../assets/section_3_photo_7.png"
import photo8 from "../../../assets/section_3_photo_8.png"

const rows = [
  {
    id: 1,
    reverse: false,
    items: [
      { title: "Экскурсии по ОЭЗ «АЛАБУГА»", image: photo1 },
      { title: "Мастер-классы", image: photo2 },
    ],
  },
  {
    id: 2,
    reverse: true,
    items: [
      { title: "Интерактивные лекции", image: photo3 },
      { title: "Спортивные мероприятия", image: photo4 },
    ],
  },
  {
    id: 3,
    reverse: false,
    items: [
      { title: "Экскурсия по роботизированному производству", image: photo5 },
      { title: "Мастер-классы", image: photo6 },
    ],
  },
  {
    id: 4,
    reverse: true,
    items: [
      { title: "Проектная сессия", image: photo7 },
      { title: "Турниры по бизнес симуляции", image: photo8 },
    ],
  },
]

function SectionThree() {
  return (
    <section id="experiences" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Что тебя ждёт?</h2>
      </div>

      <div className={styles.rows}>
        {rows.map((row) => (
          <div key={row.id} className={styles.rowViewport}>
            <div className={`${styles.track} ${row.reverse ? styles.trackReverse : ""}`}>
              {[...row.items, ...row.items, ...row.items].map((item, index) => (
                <article key={`${row.id}-${index}`} className={styles.card}>
                  <img className={styles.avatar} src={item.image} alt={item.title} />
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionThree