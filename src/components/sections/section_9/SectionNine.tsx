import { useState } from "react"
import { faqItems } from "./data/data"
import styles from "./SectionNine.module.css"

function SectionNine() {
	const [openItemId, setOpenItemId] = useState<number | null>(null)

	const handleToggle = (itemId: number) => {
		setOpenItemId((currentId) => (currentId === itemId ? null : itemId))
	}

	return (
		<section id="faq" className={styles.sectionNine}>
			<div className={styles.inner}>
				<h2 className={styles.title}>FAQ</h2>

				<div className={styles.list}>
					{faqItems.map((item) => {
						const isOpen = openItemId === item.id

						return (
							<article
								key={item.id}
								className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
							>
								<button
									type="button"
									className={styles.trigger}
									onClick={() => handleToggle(item.id)}
									aria-expanded={isOpen}
								>
									<span className={styles.question}>{item.question}</span>
									<span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>+</span>
								</button>

								<div className={`${styles.answerWrap} ${isOpen ? styles.answerWrapOpen : ""}`}>
									<p className={styles.answer}>{item.answer}</p>
								</div>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default SectionNine