import styles from "./HomePage.module.css"
import Header from "../widgets/Header/Header"
import SectionOne from "../components/sections/section_1/SectionOne"
import SectionTwo from "../components/sections/section_2/SectionTwo"

function HomePage() {
  return (
    <div className={styles.content}>
      <Header/>
      <SectionOne/>
      <SectionTwo/>
    </div>
  )
}

export default HomePage