"use client"

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, useZoomPanContext } from 'react-simple-maps'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Sample data for markers
const markers = [
  { name: 'New York', coordinates: [-74.006, 40.7128], users: 1250 },
  { name: 'London', coordinates: [-0.1278, 51.5074], users: 980 },
  { name: 'Tokyo', coordinates: [139.6917, 35.6895], users: 1500 },
  { name: 'Mumbai', coordinates: [72.8777, 19.0760], users: 1100 },
  { name: 'São Paulo', coordinates: [-46.6333, -23.5505], users: 850 },
]

interface MapPosition {
  coordinates: [number, number];
  zoom: number;
}

export function LocationMap() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState<MapPosition>({ coordinates: [20, 0], zoom: 1 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="w-full h-96 flex items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">Loading map...</p>
        </div>
      </div>
    )
  }

  const handleMoveEnd = (position: any) => {
    // Limit maximum zoom level
    const maxZoom = 8;
    const minZoom = 0.5;
    
    setPosition({
      ...position,
      zoom: Math.min(Math.max(position.zoom, minZoom), maxZoom)
    });
  }

  const getFillColor = (users: number) => {
    if (users > 1200) return '#ef4444' // red-500
    if (users > 1000) return '#f59e0b' // amber-500
    return '#3b82f6' // blue-500
  }

  const getMarkerSize = (users: number) => {
    if (users > 1200) return 12
    if (users > 1000) return 10
    return 8
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">World Map</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">User distribution by country</p>
      </div>

      <div className="w-full h-96 bg-slate-50 dark:bg-slate-700/30 rounded-lg overflow-hidden relative">
        <ComposableMap 
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [20, 0],
          }}
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={0.5}
            maxZoom={8}
            filterZoomEvent={(e: any) => {
              // Only allow zoom with mouse wheel when holding Ctrl key
              if (e.type === 'wheel') {
                return e.ctrlKey || e.metaKey;
              }
              return true;
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={theme === 'dark' ? '#334155' : '#f1f5f9'}
                    stroke={theme === 'dark' ? '#475569' : '#e2e8f0'}
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: theme === 'dark' ? '#4b5563' : '#e2e8f0', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates, users }) => (
              <Marker key={name} coordinates={[coordinates[0], coordinates[1]]}>
                <circle
                  r={getMarkerSize(users)}
                  fill={getFillColor(users)}
                  stroke="#fff"
                  strokeWidth={1}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
                <text
                  textAnchor="middle"
                  y={-getMarkerSize(users) - 5}
                  className="text-xs font-medium fill-slate-700 dark:fill-slate-200 pointer-events-none"
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
        
        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setPosition(prev => ({
              ...prev,
              zoom: Math.min(prev.zoom * 1.5, 8)
            }))}
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-md shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            aria-label="Zoom in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button
            onClick={() => setPosition(prev => ({
              ...prev,
              zoom: Math.max(prev.zoom / 1.5, 0.5)
            }))}
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-md shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            aria-label="Zoom out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button
            onClick={() => setPosition({ coordinates: [20, 0], zoom: 1 })}
            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-md shadow-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            aria-label="Reset zoom"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-slate-600 dark:text-slate-400">High activity (1200+ users)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span className="text-slate-600 dark:text-slate-400">Medium activity (1000-1200 users)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-slate-600 dark:text-slate-400">Low activity (below 1000 users)</span>
        </div>
      </div>
    </div>
  )
}
