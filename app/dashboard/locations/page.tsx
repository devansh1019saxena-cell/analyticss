"use client"

import { LocationMap } from "@/components/dashboard/location-map"
import { TopLocations } from "@/components/dashboard/top-locations"

export default function LocationsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Locations</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Geographic distribution of your users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LocationMap />
        </div>
        <div>
          <TopLocations />
        </div>
      </div>
    </div>
  )
}
