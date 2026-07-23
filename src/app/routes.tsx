import { createBrowserRouter, type RouteObject } from 'react-router'
import RootLayout from './RootLayout'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import NotFound from '../pages/NotFound'
import RouteError from '../pages/RouteError'
import CookiePage from '../pages/legal/CookiePage'
import PrivacyPolicyPage from '../pages/legal/PrivacyPolicyPage'
import ApprovalPage from '../pages/legal/ApprovalPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    // Ловит ошибки рендера/навигации любого дочернего маршрута,
    // включая 404 от несуществующих путей.
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'cookie', element: <CookiePage /> },
      { path: 'privacy-policy', element: <PrivacyPolicyPage /> },
      { path: 'approval', element: <ApprovalPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  // Совпадает с vite `base`, поэтому деплой в подпапку не ломает маршруты.
  basename: import.meta.env.BASE_URL,
})
