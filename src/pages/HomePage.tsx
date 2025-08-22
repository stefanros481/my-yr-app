import { MapPin, Navigation, Cloud } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Plan Your Trip</h1>
        <p className="text-lg text-muted-foreground">
          Enter your starting point and destination to plan your journey with weather insights.
        </p>
      </div>

      {/* Trip Planning Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Trip Details
            </CardTitle>
            <CardDescription>
              Enter your starting point and destination to begin planning.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Starting Location</label>
              <Input placeholder="Enter starting point..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input placeholder="Enter destination..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Departure Date & Time</label>
              <Input type="datetime-local" />
            </div>
            <Button className="w-full">
              <Navigation className="mr-2 h-4 w-4" />
              Calculate Route
            </Button>
          </CardContent>
        </Card>

        {/* Weather Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              Weather Preview
            </CardTitle>
            <CardDescription>
              Weather conditions will appear here once you plan your route.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              <div className="text-center space-y-2">
                <Cloud className="h-12 w-12 mx-auto opacity-50" />
                <p>Enter your trip details to see weather forecast</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:bg-accent transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Navigation className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Current Location</p>
                <p className="text-sm text-muted-foreground">Use my location as start</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => navigate('/weather')}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cloud className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Weather Map</p>
                <p className="text-sm text-muted-foreground">View regional weather</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent transition-colors" onClick={() => navigate('/saved')}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Saved Trips</p>
                <p className="text-sm text-muted-foreground">Load previous trips</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}