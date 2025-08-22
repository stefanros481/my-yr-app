import { useState, useRef, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface LocationSuggestion {
  id: string
  name: string
  address: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface LocationInputProps {
  placeholder?: string
  value?: string
  onLocationSelect?: (location: LocationSuggestion) => void
  disabled?: boolean
  className?: string
}

export function LocationInput({
  placeholder = "Enter location...",
  value = "",
  onLocationSelect,
  disabled = false,
  className = ""
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Mock location data - in a real app, this would come from a geocoding API
  const mockLocations: LocationSuggestion[] = [
    {
      id: '1',
      name: 'San Francisco',
      address: 'San Francisco, CA, USA',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: '2',
      name: 'New York',
      address: 'New York, NY, USA',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '3',
      name: 'Los Angeles',
      address: 'Los Angeles, CA, USA',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: '4',
      name: 'Chicago',
      address: 'Chicago, IL, USA',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    {
      id: '5',
      name: 'Miami',
      address: 'Miami, FL, USA',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    {
      id: '6',
      name: 'Seattle',
      address: 'Seattle, WA, USA',
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    {
      id: '7',
      name: 'Denver',
      address: 'Denver, CO, USA',
      coordinates: { lat: 39.7392, lng: -104.9903 }
    },
    {
      id: '8',
      name: 'Austin',
      address: 'Austin, TX, USA',
      coordinates: { lat: 30.2672, lng: -97.7431 }
    }
  ]

  // Simulate API search with delay
  const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockLocations.filter(location =>
          location.name.toLowerCase().includes(query.toLowerCase()) ||
          location.address.toLowerCase().includes(query.toLowerCase())
        )
        resolve(filtered)
      }, 300) // Simulate network delay
    })
  }

  // Handle input change and search
  useEffect(() => {
    const handleSearch = async () => {
      if (inputValue.length >= 2) {
        try {
          const results = await searchLocations(inputValue)
          setSuggestions(results)
          setShowSuggestions(true)
          setSelectedIndex(-1)
        } catch (error) {
          console.error('Error searching locations:', error)
          setSuggestions([])
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }

    const timeoutId = setTimeout(handleSearch, 200) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  // Handle input value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // Handle location selection
  const handleLocationSelect = (location: LocationSuggestion) => {
    setInputValue(location.name)
    setSuggestions([])
    setShowSuggestions(false)
    onLocationSelect?.(location)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleLocationSelect(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
        disabled={disabled}
        className="w-full"
      />

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card
          ref={suggestionsRef}
          className="absolute top-full z-[100] mt-1 w-full shadow-lg border bg-popover"
        >
          <CardContent className="p-0">
            <div className="max-h-60 overflow-y-auto">
              {suggestions.map((location, index) => (
                <button
                  key={location.id}
                  className={`flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-accent first:rounded-t-lg last:rounded-b-lg ${
                    index === selectedIndex ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleLocationSelect(location)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate">{location.name}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {location.address}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}