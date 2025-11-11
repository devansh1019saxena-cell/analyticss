"use client"

export function MetricCard({
  title,
  value,
  trend,
  trendUp,
  icon,
  color,
}: {
  title: string
  value: string
  trend: string
  trendUp: boolean
  icon: string
  color: string
}) {
  const colorClasses = {
    blue: "from-blue-500/10 to-blue-600/5",
    purple: "from-purple-500/10 to-purple-600/5",
    green: "from-green-500/10 to-green-600/5",
    orange: "from-orange-500/10 to-orange-600/5",
    indigo: "from-indigo-500/10 to-indigo-600/5",
  }

  const borderColors = {
    blue: "border-blue-200 dark:border-blue-900",
    purple: "border-purple-200 dark:border-purple-900",
    green: "border-green-200 dark:border-green-900",
    orange: "border-orange-200 dark:border-orange-900",
    indigo: "border-indigo-200 dark:border-indigo-900",
  }

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm border ${borderColors[color as keyof typeof borderColors]} rounded-xl p-6 hover:shadow-lg transition-shadow`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="mb-3">
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
      <div className="flex items-center gap-1">
        <span
          className={`text-sm font-medium ${trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {trend}
        </span>
        {trendUp ? (
          <svg
            className="w-4 h-4 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m0 0h4" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16v-4m0 0V8m0 4h4" />
          </svg>
        )}
      </div>
    </div>
  )
}
