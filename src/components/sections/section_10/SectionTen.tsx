import { useEffect, useState } from "react"
import styles from "./SectionTen.module.css"

const words = ["Старт", "Путь", "Выбор", "Рост", "Успех"]
const longestWord = words.reduce((currentLongest, word) => {
  return word.length > currentLongest.length ? word : currentLongest
}, words[0])

function SectionTen() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayedWord, setDisplayedWord] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const isWordComplete = displayedWord === currentWord
    const isWordRemoved = displayedWord.length === 0

    const timeoutId = window.setTimeout(
      () => {
        if (!isDeleting) {
          if (isWordComplete) {
            setIsDeleting(true)
            return
          }

          setDisplayedWord(currentWord.slice(0, displayedWord.length + 1))
          return
        }

        if (!isWordRemoved) {
          setDisplayedWord(currentWord.slice(0, displayedWord.length - 1))
          return
        }

        setIsDeleting(false)
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length)
      },
      isDeleting ? (isWordRemoved ? 220 : 70) : isWordComplete ? 1400 : 120,
    )

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [displayedWord, isDeleting, wordIndex])

  return (
    <section id="details" className={styles.sectionTen}>
      <h2 className={styles.title}>
        <span className={styles.highlight}>Твой</span>
        <br />
        <span className={styles.wordWrap}>
          <span className={styles.wordSizer} aria-hidden="true">
            {longestWord}
            <span className={styles.cursor}></span>
          </span>
          <span className={styles.wordTrack}>
            <span className={styles.word}>{displayedWord}</span>
            <span className={styles.cursor} aria-hidden="true"></span>
          </span>
        </span>
      </h2>
    </section>
  )
}

export default SectionTen