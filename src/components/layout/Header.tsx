import { MapPin, Menu, Settings, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onMenuToggle?: () => void
}

export function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold leading-none">
                Car Trip Weather
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Plan your journey with weather insights
              </p>
            </div>
          </div>
        </div>

        {/* Navigation - Hidden on mobile, handled by sidebar */}
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`
            }
          >
            Plan Trip
          </NavLink>
          <NavLink 
            to="/saved" 
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`
            }
          >
            Saved Trips
          </NavLink>
          <NavLink 
            to="/weather" 
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              }`
            }
          >
            Weather Map
          </NavLink>
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center space-x-2">
          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
            <span className="sr-only">User profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}