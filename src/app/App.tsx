import './App.css'
import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import NotFound from "../pages/NotFound"
import CookiePage from "../pages/legal/CookiePage"
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage"
import ApprovalPage from "../pages/legal/ApprovalPage"
import CookieBanner from "../widgets/CookieBanner/CookieBanner"
import { addYandexMetrikaToHead, captureTracking, sendYandexPageHit } from '../shared/tracking'

function App() {
  const location = useLocation()
  const isFirstPageViewRef = useRef(true)

  useEffect(() => {
    captureTracking()
    addYandexMetrikaToHead()

    if (isFirstPageViewRef.current) {
      isFirstPageViewRef.current = false
      return
    }

    sendYandexPageHit(window.location.href)
  }, [location.pathname, location.search])

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
