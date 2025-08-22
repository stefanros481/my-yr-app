import { MapPin, Navigation, Cloud, Calendar, Clock, Route } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LocationInput } from '@/components/trip/LocationInput'

interface LocationSuggestion {
  id: string
  name: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export function HomePage() {
  const navigate = useNavigate()
  const [startLocation, setStartLocation] = useState<LocationSuggestion | null>(null)
  const [endLocation, setEndLocation] = useState<LocationSuggestion | null>(null)
  
  // Set default departure time to current time + 1 hour
  const defaultDepartureTime = new Date()
  defaultDepartureTime.setHours(defaultDepartureTime.getHours() + 1)
  const [departureTime, setDepartureTime] = useState(
    defaultDepartureTime.toISOString().slice(0, 16)
  )

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Create a location object for current position
          const currentLocation: LocationSuggestion = {
            id: 'current',
            name: 'Current Location',
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: { lat: latitude, lng: longitude }
          }
          setStartLocation(currentLocation)
        },
        (error) => {
          console.error('Error getting current location:', error)
          alert('Unable to get your current location. Please check your browser permissions.')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  const handleCalculateRoute = () => {
    if (startLocation && endLocation) {
      console.log('Calculating route:', { startLocation, endLocation, departureTime })
      // TODO: Implement route calculation in Phase 2
    }
  }

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return ''
    const date = new Date(dateTimeString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const calculateDistance = () => {
    if (!startLocation?.coordinates || !endLocation?.coordinates) return null
    // Simple distance calculation (this would be more accurate with a proper routing API)
    const lat1 = startLocation.coordinates.lat
    const lon1 = startLocation.coordinates.lng
    const lat2 = endLocation.coordinates.lat
    const lon2 = endLocation.coordinates.lng
    
    const R = 3959 // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    
    return Math.round(distance)
  }

  return (
    <div style={{background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)', minHeight: 'calc(100vh - 8rem)', margin: '-1.5rem', padding: '1.5rem'}}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎯 Plan Your Journey</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your starting point and destination to plan your trip with real-time weather insights along the way.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Trip Input */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  Trip Details
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configure your journey settings below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Starting Location */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Starting Location</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUseCurrentLocation}
                      className="text-xs"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Use Current
                    </Button>
                  </div>
                  <LocationInput
                    placeholder="Enter starting point..."
                    onLocationSelect={setStartLocation}
                  />
                </div>

                {/* Destination */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Destination</label>
                  <LocationInput
                    placeholder="Enter destination..."
                    onLocationSelect={setEndLocation}
                  />
                </div>

                {/* Departure Date & Time */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700">Departure Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input 
                      type="datetime-local" 
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </div>
                </div>

                {/* Calculate Button */}
                <Button 
                  className="w-full mt-8 bg-blue-600 hover:bg-blue-700" 
                  size="lg"
                  onClick={handleCalculateRoute}
                  disabled={!startLocation || !endLocation}
                >
                  <Route className="mr-2 h-5 w-5" />
                  Calculate Route & Weather
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/weather-map')}
                  >
                    <Cloud className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">Weather Map</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => navigate('/saved-trips')}
                  >
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Saved Trips</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Results */}
          <div className="space-y-6">
            {startLocation || endLocation ? (
              <>
                {/* Route Summary */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Route className="h-6 w-6 text-green-600" />
                      Route Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {startLocation && (
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="mt-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-green-800">From</p>
                          <p className="text-sm text-green-700">{startLocation.name}</p>
                          <p className="text-xs text-green-600">{startLocation.address}</p>
                        </div>
                      </div>
                    )}

                    {startLocation && endLocation && (
                      <div className="flex items-center justify-center">
                        <div className="w-px h-8 bg-gray-300"></div>
                      </div>
                    )}

                    {endLocation && (
                      <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="mt-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-red-800">To</p>
                          <p className="text-sm text-red-700">{endLocation.name}</p>
                          <p className="text-xs text-red-600">{endLocation.address}</p>
                        </div>
                      </div>
                    )}

                    {startLocation && endLocation && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">Estimated Distance</p>
                            <p className="text-lg font-bold text-blue-800">{calculateDistance()} miles</p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="text-sm text-purple-600 font-medium">Estimated Time</p>
                            <p className="text-lg font-bold text-purple-800">{Math.round((calculateDistance() || 0) / 60)} hrs</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {departureTime && (startLocation || endLocation) && (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          Departing: {formatDateTime(departureTime)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Weather Preview */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Cloud className="h-6 w-6 text-blue-600" />
                      Weather Forecast
                    </CardTitle>
                    <CardDescription>
                      {startLocation && endLocation
                        ? "Click 'Calculate Route' to see weather along your journey"
                        : "Select both locations to see weather forecast"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {startLocation && endLocation ? (
                      <div className="text-center py-8">
                        <Cloud className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-600 mb-4">
                          Ready to calculate weather forecast for your route
                        </p>
                        <Button 
                          onClick={handleCalculateRoute}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Get Weather Forecast
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Cloud className="h-12 w-12 mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400">
                          Weather information will appear here once you select your route
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Empty State */
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="py-16">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Start Planning Your Trip
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                      Enter your starting location and destination to see route details and weather forecast.
                    </p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>• Real-time weather along your route</p>
                      <p>• Accurate distance and time estimates</p>
                      <p>• Save trips for future reference</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}