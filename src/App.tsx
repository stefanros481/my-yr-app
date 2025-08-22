import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { SavedTripsPage } from './pages/SavedTripsPage'
import { WeatherMapPage } from './pages/WeatherMapPage'
import { LocationInputTestPage } from './pages/LocationInputTestPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved-trips" element={<SavedTripsPage />} />
          <Route path="/weather-map" element={<WeatherMapPage />} />
          <Route path="/test-location" element={<LocationInputTestPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
