# Car Trip Weather App - Technical Specification

## 🗺️ Project Overview

A React application that helps users plan car trips by showing weather conditions along their route. Users can input starting and destination points, view the route on a map, and see weather forecasts for various points along the journey.

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Maps**: Google Maps API or Mapbox
- **Weather Data**: yr.no API
- **Routing**: React Router
- **State Management**: React Query + Zustand (for complex state)
- **Build Tool**: Vite

## Core Features

### 1. Trip Planning Interface
- Input fields for starting point and destination
- Autocomplete for location search
- Option to add waypoints/stops along the route
- Trip duration and distance calculation

### 2. Map Integration
- Interactive map showing the planned route
- Weather markers along the route
- Current location detection
- Zoom and pan functionality

### 3. Weather Display
- Current weather at start/end points
- Hourly forecast along the route
- Weather icons and temperature
- Wind, precipitation, and visibility info
- Weather alerts/warnings

### 4. Route Optimization
- Multiple route options
- Avoid weather hazards option
- Real-time traffic consideration
- Fuel stop suggestions

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── map/
│   │   ├── MapContainer.tsx
│   │   ├── RouteDisplay.tsx
│   │   └── WeatherMarkers.tsx
│   ├── trip/
│   │   ├── TripPlanner.tsx
│   │   ├── LocationInput.tsx
│   │   └── RouteOptions.tsx
│   ├── weather/
│   │   ├── WeatherCard.tsx
│   │   ├── WeatherForecast.tsx
│   │   └── WeatherIcon.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Layout.tsx
├── hooks/
│   ├── useGeolocation.ts
│   ├── useWeatherData.ts
│   ├── useRouteCalculation.ts
│   └── useMapControls.ts
├── services/
│   ├── api/
│   │   ├── weatherApi.ts
│   │   ├── mapsApi.ts
│   │   └── geocodingApi.ts
│   └── utils/
│       ├── routeUtils.ts
│       ├── weatherUtils.ts
│       └── dateUtils.ts
├── types/
│   ├── weather.ts
│   ├── route.ts
│   └── location.ts
├── store/
│   └── tripStore.ts
├── App.tsx
└── main.tsx
```

## API Integrations

### Weather API (yr.no)

```typescript
interface WeatherData {
  location: {
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    icon: string;
  };
  forecast: WeatherForecast[];
}

interface WeatherForecast {
  time: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  cloudiness: number;
  visibility: number;
  symbol: string;
}
```

### Maps API
- Route calculation and display
- Geocoding for location search
- Real-time traffic data
- Points of interest along route

## Key Components Design

### 1. Trip Planner Component

```typescript
interface TripPlannerProps {
  onRouteCalculated: (route: Route) => void;
}

interface TripPlannerState {
  startLocation: Location | null;
  endLocation: Location | null;
  waypoints: Location[];
  departureTime: Date;
  routePreferences: RoutePreferences;
}
```

**Features:**
- Location autocomplete inputs
- Date/time picker for departure
- Route preferences (fastest, scenic, etc.)
- Add waypoints functionality

### 2. Map Container

```typescript
interface MapContainerProps {
  route?: Route;
  weatherData: WeatherPoint[];
  onLocationSelect: (location: Location) => void;
}

interface MapState {
  center: LatLng;
  zoom: number;
  selectedWeatherPoint: WeatherPoint | null;
}
```

**Features:**
- Interactive map with route display
- Weather markers with popover details
- Current location indicator
- Responsive design for mobile

### 3. Weather Forecast Panel

```typescript
interface WeatherForecastProps {
  route: Route;
  departureTime: Date;
}

interface WeatherTimelinePoint {
  location: LatLng;
  estimatedArrivalTime: Date;
  weather: WeatherData;
  distanceFromStart: number;
}
```

**Features:**
- Timeline view of weather along route
- Hourly breakdown
- Weather alerts and warnings
- Clothing/preparation suggestions

## Data Models

### Location Type

```typescript
interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: LatLng;
  placeId?: string;
}

interface LatLng {
  lat: number;
  lng: number;
}
```

### Route Type

```typescript
interface Route {
  id: string;
  startLocation: Location;
  endLocation: Location;
  waypoints: Location[];
  path: LatLng[];
  distance: number; // in kilometers
  duration: number; // in seconds
  alternativeRoutes?: Route[];
  trafficData?: TrafficInfo;
}

interface RoutePreferences {
  avoidTolls: boolean;
  avoidHighways: boolean;
  avoidFerries: boolean;
  optimize: 'time' | 'distance' | 'fuel';
  avoidWeatherHazards: boolean;
}
```

### Weather Types

```typescript
interface WeatherPoint {
  location: LatLng;
  timestamp: Date;
  current: CurrentWeather;
  forecast: WeatherForecast[];
}

interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  condition: WeatherCondition;
  icon: string;
}

interface WeatherCondition {
  main: string; // e.g., "Rain", "Snow", "Clear"
  description: string; // e.g., "light rain", "heavy snow"
  severity: 'low' | 'medium' | 'high';
}
```

## Implementation Phases

### Phase 1: Basic Setup (Week 1)
1. Initialize React + Vite project with TypeScript
2. Set up Tailwind CSS and shadcn/ui
3. Create basic layout and routing structure
4. Implement location input with autocomplete
5. Set up project structure and basic components

**Deliverables:**
- Working React app with basic UI
- Location search functionality
- Basic layout components

### Phase 2: Map Integration (Week 2)
1. Integrate maps API (Google Maps or Mapbox)
2. Display basic route between two points
3. Add interactive map controls
4. Implement route calculation
5. Add current location detection

**Deliverables:**
- Interactive map with route display
- Route calculation between points
- Map controls and interactions

### Phase 3: Weather Integration (Week 3)
1. Connect to yr.no API
2. Display current weather for start/end points
3. Show weather along route markers
4. Create weather forecast timeline
5. Implement weather data caching

**Deliverables:**
- Weather data integration
- Weather markers on map
- Forecast timeline component

### Phase 4: Enhanced Features (Week 4)
1. Add multiple route options
2. Implement weather-based route suggestions
3. Add trip saving/loading functionality
4. Implement waypoints and route optimization
5. Add weather alerts and warnings

**Deliverables:**
- Multiple route options
- Trip persistence
- Advanced weather features

### Phase 5: Polish & Deploy (Week 5)
1. Error handling and loading states
2. Performance optimization
3. Mobile responsiveness
4. Testing implementation
5. Deployment setup

**Deliverables:**
- Production-ready application
- Comprehensive error handling
- Mobile-optimized UI

## API Endpoints

### yr.no Weather API

```typescript
// Current weather
GET https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}

// Weather forecast
GET https://api.met.no/weatherapi/locationforecast/2.0/complete?lat={lat}&lon={lon}

// Weather warnings
GET https://api.met.no/weatherapi/metalerts/1.1/?lat={lat}&lon={lon}
```

### Google Maps API (Alternative: Mapbox)

```typescript
// Geocoding
GET https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={API_KEY}

// Directions
GET https://maps.googleapis.com/maps/api/directions/json?origin={origin}&destination={destination}&key={API_KEY}

// Places Autocomplete
GET https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}&key={API_KEY}
```

## Environment Variables

```env
# API Keys
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token

# App Configuration
VITE_APP_NAME=Car Trip Weather App
VITE_DEFAULT_MAP_CENTER_LAT=39.8283
VITE_DEFAULT_MAP_CENTER_LNG=-98.5795
VITE_DEFAULT_MAP_ZOOM=4

# Weather API
VITE_WEATHER_API_BASE_URL=https://api.met.no/weatherapi
VITE_WEATHER_CACHE_DURATION=300000
```

## Getting Started Commands

### 1. Initialize the project:
```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Add required dependencies:
```bash
# Core dependencies
npm install react-router-dom
npm install @tanstack/react-query
npm install zustand
npm install axios

# UI and Styling
npm install tailwindcss @tailwindcss/forms @tailwindcss/typography
npm install clsx tailwind-merge
npm install lucide-react

# Maps (choose one)
npm install @vis.gl/react-google-maps  # Google Maps
# OR
npm install react-map-gl mapbox-gl     # Mapbox

# Development dependencies
npm install -D @types/google.maps
npm install -D autoprefixer postcss
npm install -D @types/node
```

### 3. Set up shadcn/ui:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card dialog select separator
npx shadcn-ui@latest add tooltip popover command calendar
```

### 4. Initialize Tailwind CSS:
```bash
npx tailwindcss init -p
```

## Testing Strategy

### Unit Tests
- Component rendering tests
- Utility function tests
- API service tests
- Custom hook tests

### Integration Tests
- Map and weather data integration
- Route calculation workflows
- User interaction flows

### E2E Tests
- Complete trip planning journey
- Mobile responsiveness
- Cross-browser compatibility

## Performance Considerations

1. **API Rate Limiting**: Implement caching for weather and map data
2. **Image Optimization**: Use optimized weather icons and map tiles
3. **Bundle Splitting**: Code splitting for map and weather modules
4. **Lazy Loading**: Lazy load non-critical components
5. **Debounced Search**: Debounce location search inputs

## Security Considerations

1. **API Key Protection**: Use environment variables and domain restrictions
2. **Input Validation**: Sanitize all location inputs
3. **HTTPS Only**: Ensure all API calls use HTTPS
4. **CSP Headers**: Implement Content Security Policy
5. **Rate Limiting**: Implement client-side rate limiting for API calls

## Accessibility Features

1. **Keyboard Navigation**: Full keyboard support for map and form controls
2. **Screen Reader Support**: ARIA labels and semantic HTML
3. **Color Contrast**: High contrast weather icons and text
4. **Focus Management**: Proper focus indicators and management
5. **Alternative Text**: Descriptive alt text for weather icons

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Basic functionality without JavaScript

---

*Last Updated: August 22, 2025*
*Version: 1.0*