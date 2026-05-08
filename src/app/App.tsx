import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import NotFound from "../pages/NotFound"
import CookiePage from "../pages/legal/CookiePage"
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage"
import ApprovalPage from "../pages/legal/ApprovalPage"
import CookieBanner from "../widgets/CookieBanner/CookieBanner"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cookie" element={<CookiePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/approval" element={<ApprovalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </>
  )
}

export default App
