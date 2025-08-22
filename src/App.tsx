import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { MapPin, Navigation, Cloud } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Car Trip Weather App</h1>
          <p className="text-lg text-muted-foreground">
            Plan your journey with real-time weather forecasts along your route
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Trip Planning
              </CardTitle>
              <CardDescription>
                Enter your starting point and destination to plan your route.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Starting location" />
              <Input placeholder="Destination" />
              <Button className="w-full">
                <Navigation className="mr-2 h-4 w-4" />
                Plan Route
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Weather Forecast
              </CardTitle>
              <CardDescription>
                See weather conditions along your entire journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Weather data will appear here
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Development Status</CardTitle>
              <CardDescription>
                Current implementation progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Project Setup</span>
                  <span className="text-sm text-green-600">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">UI Framework</span>
                  <span className="text-sm text-yellow-600">In Progress</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Map Integration</span>
                  <span className="text-sm text-gray-400">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Counter */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>React + Tailwind + shadcn/ui Test</CardTitle>
            <CardDescription>
              Testing that all components are working correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-2xl font-semibold">Count: {count}</p>
              <Button onClick={() => setCount((count) => count + 1)}>
                Increment Counter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
