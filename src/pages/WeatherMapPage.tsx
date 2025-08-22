import { Cloud, MapPin, Thermometer, Wind } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function WeatherMapPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Weather Map</h1>
        <p className="text-lg text-muted-foreground">
          View current weather conditions and forecasts across your region.
        </p>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Interactive Weather Map
          </CardTitle>
          <CardDescription>
            Map integration coming in Phase 2 - this will show real-time weather data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
            <div className="text-center space-y-4">
              <Cloud className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <p className="text-lg font-medium">Weather Map Coming Soon</p>
                <p className="text-sm text-muted-foreground">
                  Interactive map with weather layers will be available in Phase 2
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Thermometer className="h-4 w-4 text-orange-500" />
              Temperature
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72°F</div>
            <p className="text-xs text-muted-foreground">
              Current temperature (placeholder)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Wind className="h-4 w-4 text-blue-500" />
              Wind Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 mph</div>
            <p className="text-xs text-muted-foreground">
              Current wind speed (placeholder)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Cloud className="h-4 w-4 text-gray-500" />
              Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Partly Cloudy</div>
            <p className="text-xs text-muted-foreground">
              Current conditions (placeholder)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}