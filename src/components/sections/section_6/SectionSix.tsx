import { useEffect, useState } from "react"
import { cardRotationDuration, directions } from "./data/data"
import styles from "./SectionSix.module.css"

function SectionSix() {
  const [expandedStepId, setExpandedStepId] = useState<number | null>(1)
  const [activeDirectionIndex, setActiveDirectionIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startedAt = Date.now()

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt

      if (elapsed >= cardRotationDuration) {
        window.clearInterval(intervalId)
        setProgress(0)
        setActiveDirectionIndex((currentIndex) => (currentIndex + 1) % directions.length)

        return
      }

      const nextProgress = Math.min((elapsed / cardRotationDuration) * 100, 100)

      setProgress(nextProgress)
    }, 50)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [activeDirectionIndex])

  const activeDirection = directions[activeDirectionIndex]
  const activeSteps = activeDirection.steps

  const handleStepToggle = (stepId: number) => {
    setExpandedStepId((currentStepId) => (currentStepId === stepId ? null : stepId))
  }

  const handleDirectionSelect = (index: number) => {
    setActiveDirectionIndex(index)
    setExpandedStepId(directions[index].steps[0]?.id ?? null)
    setProgress(0)
  }

  return (
    <section id="directions" className={styles.sectionSix}>
      <div className={styles.inner}>
        <div className={styles.heroPanel}>
          <div className={styles.heroImageWrap}>
            <img className={styles.heroImage} src={activeDirection.heroImage} alt={activeDirection.title} />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>
              АЛАБУГА СОЗДАЕТ КАДРЫ,
              <br />
              КОТОРЫЕ СОЗДАЮТ ЭКОНОМИКУ
              <br />
              БУДУЩЕГО
            </h2>

            <div className={styles.badge}>{activeDirection.title}</div>

    

            <p className={styles.salary}>
              ДЕНЕЖНОЕ СОДЕРЖАНИЕ: <span>{activeDirection.salary}</span>
            </p>

            <div className={styles.steps}>
              {activeSteps.map((step) => {
                const isExpanded = expandedStepId === step.id

                return (
                <div key={step.id} className={`${styles.stepWrap} ${isExpanded ? styles.stepWrapExpanded : ""}`}>
                  <article className={`${styles.stepCard} ${isExpanded ? styles.stepCardExpanded : ""}`}>
                    <span className={styles.stepNumber}>{step.id}</span>
                    <button
                      type="button"
                      className={styles.stepToggle}
                      onClick={() => handleStepToggle(step.id)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? "Скрыть описание" : "Показать описание"}
                    >
                      {isExpanded ? "−" : "+"}
                    </button>
                    <p className={styles.stepTitle}>{step.title}</p>
                    <div className={`${styles.stepTextWrap} ${isExpanded ? styles.stepTextWrapExpanded : ""}`}>
                      <p className={styles.stepText}>{step.text}</p>
                    </div>
                  </article>
                </div>
              )})}
            </div>
          </div>

          <div className={styles.backgroundLabel}>{activeDirection.title}</div>
        </div>

        <div className={styles.directionGrid}>
          {directions.map((direction, index) => (
            <button
              type="button"
              key={direction.title}
              className={`${styles.directionCard} ${activeDirectionIndex === index ? styles.directionCardActive : ""}`}
              onClick={() => handleDirectionSelect(index)}
            >
              <span className={styles.directionProgressTrack}>
                <span
                  className={styles.directionProgressFill}
                  style={{ width: activeDirectionIndex === index ? `${progress}%` : "0%" }}
                ></span>
              </span>
              <img className={styles.directionImage} src={direction.image} alt={direction.title} />
              <div className={styles.directionOverlay}></div>
              <h3 className={styles.directionTitle}>{direction.title}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionSix