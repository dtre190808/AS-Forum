import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import NotFound from "../pages/NotFound"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
