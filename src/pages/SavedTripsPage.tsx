import { History, MapPin, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function SavedTripsPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Saved Trips</h1>
        <p className="text-lg text-muted-foreground">
          View and manage your previously planned trips.
        </p>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <History className="h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-xl mb-2">No Saved Trips Yet</CardTitle>
          <CardDescription className="text-center max-w-sm mb-6">
            Start planning your first trip to see your saved journeys here. 
            All your planned routes and weather data will be stored for easy access.
          </CardDescription>
          <Button onClick={() => navigate('/')}>
            <MapPin className="mr-2 h-4 w-4" />
            Plan Your First Trip
          </Button>
        </CardContent>
      </Card>

      {/* Future: Trip cards would appear here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example of what a saved trip card would look like */}
        <Card className="opacity-50">
          <CardHeader>
            <CardTitle className="text-base">San Francisco → Los Angeles</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Planned for Aug 25, 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance:</span>
                <span>383 miles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>6h 15m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Weather:</span>
                <span>Sunny, 75°F</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}