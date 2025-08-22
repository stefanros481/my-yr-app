import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { SavedTripsPage } from './pages/SavedTripsPage'
import { WeatherMapPage } from './pages/WeatherMapPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved" element={<SavedTripsPage />} />
          <Route path="/weather" element={<WeatherMapPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
