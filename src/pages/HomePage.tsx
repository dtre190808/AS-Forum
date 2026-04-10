import styles from "./HomePage.module.css"
import Header from "../widgets/Header/Header"
import Footer from "../widgets/Footer/Footer"
import SectionOne from "../components/sections/section_1/SectionOne"
import SectionTwo from "../components/sections/section_2/SectionTwo"
import SectionConditions from "../components/sections/section_conditions/SectionConditions"
import SectionForum from "../components/sections/section_forum/SectionForum"
import SectionThree from "../components/sections/section_3/SectionThree"
import SectionFour from "../components/sections/section_4/SectionFour"
import SectionFive from "../components/sections/section_5/SectionFive"
import SectionSix from "../components/sections/section_6/SectionSix"
import SectionSeven from "../components/sections/section_7/SectionSeven"
import SectionEight from "../components/sections/section_8/SectionEight"
import SectionNine from "../components/sections/section_9/SectionNine"
import SectionTen from "../components/sections/section_10/SectionTen"

function HomePage() {
  return (
    <div className={styles.content}>
      <Header/>
      <SectionOne/>
      <SectionTwo/>
      <SectionThree/>
      <SectionConditions/>
      <SectionForum/>
      <SectionFour/>
      <SectionFive/>
      <SectionSix/>
      <SectionSeven/>
      <SectionEight/>
      <SectionNine/>
      <SectionTen/>
      <Footer/>
    </div>
  )
}

export default HomePage