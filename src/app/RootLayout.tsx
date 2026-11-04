import './App.css'
import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import CookieBanner from "../widgets/CookieBanner/CookieBanner"
import { addYandexMetrikaToHead, captureTracking, sendYandexPageHit } from '../shared/tracking'

function RootLayout() {
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
      <ScrollRestoration />
      <Outlet />
      <CookieBanner />
    </>
  )
}

export default RootLayout
