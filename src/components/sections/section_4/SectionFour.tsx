import { useEffect, useRef, useState } from "react"
import introVideoSrc from "../../../assets/video_intro.mp4"
import styles from "./SectionFour.module.css"

const introPreviewDuration = 10
const introPosterSrc = "/sectionOneBg.png"

function SectionFour() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const introVideoRef = useRef<HTMLVideoElement | null>(null)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const sectionElement = sectionRef.current
    const introVideoElement = introVideoRef.current

    if (!sectionElement || !introVideoElement) {
      return
    }

    const playIntro = () => {
      const playPromise = introVideoElement.play()

      if (playPromise) {
        playPromise.catch(() => {})
      }
    }

    const handleLoadedData = () => {
      introVideoElement.currentTime = 0
      playIntro()
    }

    const handleTimeUpdate = () => {
      if (introVideoElement.currentTime >= introPreviewDuration) {
        introVideoElement.currentTime = 0
        playIntro()
      }
    }

    introVideoElement.loop = false
    introVideoElement.addEventListener("loadeddata", handleLoadedData)
    introVideoElement.addEventListener("timeupdate", handleTimeUpdate)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playIntro()

          return
        }

        introVideoElement.pause()
        introVideoElement.currentTime = 0
      },
      {
        threshold: 0.35,
      },
    )

    observer.observe(sectionElement)

    return () => {
      observer.disconnect()
      introVideoElement.removeEventListener("loadeddata", handleLoadedData)
      introVideoElement.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : ""

    const modalVideoElement = modalVideoRef.current

    if (isModalOpen && modalVideoElement) {
      const playPromise = modalVideoElement.play()

      if (playPromise) {
        playPromise.catch(() => {})
      }
    }

    if (!isModalOpen && modalVideoElement) {
      modalVideoElement.pause()
      modalVideoElement.currentTime = 0
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  return (
    <>
      <section id="about-forum" ref={sectionRef} className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.title}>Как это было?</h2>

          <div className={styles.videoShell}>
            <video
              ref={introVideoRef}
              className={styles.video}
              src={introVideoSrc}
              autoPlay
              muted
              playsInline
              preload="auto"
            />
            <button type="button" className={styles.videoPlayButton} onClick={() => setIsModalOpen(true)} aria-label="Открыть полное видео">
              <span className={styles.playIcon}></span>
            </button>
            <div className={styles.videoShade}></div>
            <p className={styles.caption}>Форум «Старт» зима 2026</p>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Полное видео форума">
          <button type="button" className={styles.backdrop} onClick={() => setIsModalOpen(false)} aria-label="Закрыть видео"></button>
          <div className={styles.modalCard}>
            <button type="button" className={styles.closeButton} onClick={() => setIsModalOpen(false)} aria-label="Закрыть">
              ×
            </button>
            <video
              ref={modalVideoRef}
              className={styles.modalVideo}
              src={introVideoSrc}
              poster={introPosterSrc}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SectionFour