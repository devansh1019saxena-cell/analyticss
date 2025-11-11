"use client"

interface Location {
  name: string
  type: "country" | "city"
  users: number
  percentage: number
  trend: number
}

const topLocations: Location[] = [
  { name: "United States", type: "country", users: 8234, percentage: 33.5, trend: 5 },
  { name: "United Kingdom", type: "country", users: 3421, percentage: 13.9, trend: 2 },
  { name: "Germany", type: "country", users: 2876, percentage: 11.7, trend: 8 },
  { name: "Canada", type: "country", users: 2145, percentage: 8.7, trend: -1 },
  { name: "France", type: "country", users: 1923, percentage: 7.8, trend: 3 },
  { name: "Australia", type: "country", users: 1654, percentage: 6.7, trend: 12 },
  { name: "Japan", type: "country", users: 1432, percentage: 5.8, trend: 6 },
  { name: "Brazil", type: "country", users: 987, percentage: 4.0, trend: 4 },
  { name: "India", type: "country", users: 876, percentage: 3.6, trend: 15 },
  { name: "Netherlands", type: "country", users: 652, percentage: 2.7, trend: 1 },
]

export function TopLocations() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Top Locations</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">By user count</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {topLocations.map((location, index) => (
          <div
            key={location.name}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{location.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{location.users.toLocaleString()} users</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{location.percentage}%</p>
              <p
                className={`text-xs font-medium ${location.trend > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {location.trend > 0 ? "+" : ""}
                {location.trend}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
