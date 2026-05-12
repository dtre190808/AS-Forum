import { useState } from "react"
import { successStories } from "./data/data"
import styles from "./SectionEight.module.css"

function SectionEight() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="success-stories" className={styles.sectionEight}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Реальные истории</span>
        <h2 className={styles.title}>Истории успеха</h2>
      </header>

      <div className={styles.scroller}>
        {successStories.map((story) => {
          const isExpanded = expandedId === story.id

          return (
            <article
              key={story.id}
              className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
            >
              <img
                className={styles.image}
                src={story.image}
                alt={story.imageAlt}
                loading="lazy"
                decoding="async"
                data-photo="person"
              />
              <div className={styles.body}>
                <h3 className={styles.name}>{story.name}</h3>
                <p className={styles.text}>{story.text}</p>
                <button
                  type="button"
                  className={styles.toggle}
                  onClick={() => setExpandedId(isExpanded ? null : story.id)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Свернуть" : "Читать полностью"}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default SectionEight
