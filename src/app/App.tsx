import './App.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import NotFound from "../pages/NotFound"
import CookiePage from "../pages/legal/CookiePage"
import PrivacyPolicyPage from "../pages/legal/PrivacyPolicyPage"
import ApprovalPage from "../pages/legal/ApprovalPage"
import CookieBanner from "../widgets/CookieBanner/CookieBanner"

const TRACKING_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

const TRACKING_STORAGE_KEY = 'as_tracking_v1'

function persistTracking() {
  try {
    const params = new URLSearchParams(window.location.search)
    const fresh: Record<string, string> = {}
    for (const key of TRACKING_KEYS) {
      const value = params.get(key)
      if (value) fresh[key] = value
    }

    const stored = (() => {
      try {
        return JSON.parse(sessionStorage.getItem(TRACKING_STORAGE_KEY) || '{}') as Record<string, string>
      } catch {
        return {}
      }
    })()

    const hasFreshUtm = Object.keys(fresh).length > 0
    const merged: Record<string, string> = hasFreshUtm
      ? {
          ...fresh,
          referrer: document.referrer || stored.referrer || '',
          landing_url: window.location.href,
          first_visit_at: stored.first_visit_at || new Date().toISOString(),
        }
      : {
          ...stored,
          referrer: stored.referrer || document.referrer || '',
          landing_url: stored.landing_url || window.location.href,
          first_visit_at: stored.first_visit_at || new Date().toISOString(),
        }

    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged))
  } catch {
    /* ignore */
  }
}

function App() {
  useEffect(() => {
    persistTracking()
  }, [])

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
