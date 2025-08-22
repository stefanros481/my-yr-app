import { useState } from 'react'
import { LocationInput } from '@/components/trip/LocationInput'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Navigation } from 'lucide-react'

interface LocationSuggestion {
  id: string
  name: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export function LocationInputTestPage() {
  const [selectedLocation, setSelectedLocation] = useState<LocationSuggestion | null>(null)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Location Input Test</h1>
        <p className="text-lg text-muted-foreground">
          Testing the LocationInput component with autocomplete functionality.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Input Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Location Search
            </CardTitle>
            <CardDescription>
              Try searching for cities like "San Francisco", "New York", or "Los Angeles"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <LocationInput
              placeholder="Search for a location..."
              onLocationSelect={setSelectedLocation}
              onClear={() => setSelectedLocation(null)}
            />
            
            {/* Test Features */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>🔍 <strong>Test features:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Type to search with autocomplete</li>
                <li>Use arrow keys to navigate suggestions</li>
                <li>Press Enter to select</li>
                <li>Click the navigation icon for current location</li>
                <li>Click X to clear</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Selected Location Display */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Selected Location
            </CardTitle>
            <CardDescription>
              Shows the location you've selected
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedLocation ? (
              <div className="space-y-3">
                <div className="p-4 bg-accent/50 rounded-lg">
                  <h3 className="font-semibold">{selectedLocation.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
                  {selectedLocation.coordinates && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Coordinates: {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                    </p>
                  )}
                </div>
                
                <div className="text-sm">
                  <p><strong>ID:</strong> {selectedLocation.id}</p>
                  <p><strong>Name:</strong> {selectedLocation.name}</p>
                  <p><strong>Address:</strong> {selectedLocation.address}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto opacity-50 mb-2" />
                <p>No location selected</p>
                <p className="text-sm">Search and select a location to see details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Multiple Input Test */}
      <Card>
        <CardHeader>
          <CardTitle>Multiple Location Inputs</CardTitle>
          <CardDescription>
            Testing multiple LocationInput components on the same page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Starting Point</label>
              <LocationInput placeholder="Enter starting location..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <LocationInput placeholder="Enter destination..." />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Waypoint (Optional)</label>
            <LocationInput placeholder="Add a stop along the way..." />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}