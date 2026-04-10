import { useState } from "react"
import { successStories, storiesScrollDuration } from "./data/data"
import styles from "./SectionEight.module.css"

const repeatedStories = [...successStories, ...successStories]

function SectionEight() {
	const [isTrackPaused, setIsTrackPaused] = useState(false)

	return (
		<section id="success-stories" className={styles.sectionEight}>
			<div className={styles.header}>
				<h2 className={styles.title}>Истории успеха</h2>
			</div>

			<div className={styles.viewport}>
				<div
					className={`${styles.track} ${isTrackPaused ? styles.trackPaused : ""}`}
					style={{ ["--stories-duration" as string]: `${storiesScrollDuration}s` }}
					onPointerDown={() => setIsTrackPaused(true)}
					onPointerUp={() => setIsTrackPaused(false)}
					onPointerCancel={() => setIsTrackPaused(false)}
					onPointerLeave={() => setIsTrackPaused(false)}
				>
					{repeatedStories.map((story, index) => (
						<article className={styles.card} key={`${story.id}-${index}`}>
							<div className={styles.imageWrap}>
								<img className={styles.image} src={story.image} alt={story.imageAlt} />
							</div>

							<div className={styles.content}>
								<h3 className={styles.name}>{story.name}</h3>
								<p className={styles.text}>{story.text}</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}

export default SectionEight