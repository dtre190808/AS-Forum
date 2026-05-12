import { useState } from "react"
import { directions } from "./data/data"
import styles from "./SectionSix.module.css"

function SectionSix() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedStep, setExpandedStep] = useState<number | null>(1)

  const direction = directions[activeIndex]

  const handleSelectDirection = (index: number) => {
    setActiveIndex(index)
    setExpandedStep(directions[index].steps[0]?.id ?? null)
  }

  const handleToggleStep = (id: number) => {
    setExpandedStep((current) => (current === id ? null : id))
  }

  return (
    <section id="directions" className={styles.sectionSix}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Направления</span>
          <h2 className={styles.title}>
            Алабуга создаёт кадры,<br />
            которые создают экономику будущего
          </h2>
        </header>

        <div className={styles.tabs} role="tablist">
          {directions.map((d, i) => (
            <button
              key={d.title}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ""}`}
              onClick={() => handleSelectDirection(i)}
            >
              {d.title}
            </button>
          ))}
        </div>

        <article className={styles.hero}>
          <div className={styles.heroMedia}>
            <img
              key={direction.heroImage}
              className={styles.heroImage}
              src={direction.heroImage}
              alt={direction.title}
              loading="lazy"
              decoding="async"
              data-photo="person"
            />
          </div>

          <div className={styles.heroBody}>
            <h3 className={styles.directionTitle}>{direction.title}</h3>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Срок</span>
                <span className={styles.metaValue}>{direction.duration}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Зарплата</span>
                <span className={`${styles.metaValue} ${styles.metaValueAccent}`}>
                  {direction.salary}
                </span>
              </div>
            </div>

            <div className={styles.steps}>
              {direction.steps.map((step) => {
                const isActive = expandedStep === step.id
                return (
                  <div
                    key={step.id}
                    className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.stepHead}
                      onClick={() => handleToggleStep(step.id)}
                      aria-expanded={isActive}
                    >
                      <span className={styles.stepNumber}>{step.id}</span>
                      <span className={styles.stepTitle}>{step.title}</span>
                      <span className={styles.stepSalary}>{step.salary}</span>
                      <svg
                        className={styles.stepIcon}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className={styles.stepBody}>
                      <div className={styles.stepBodyInner}>
                        <p className={styles.stepText}>{step.text}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default SectionSix
