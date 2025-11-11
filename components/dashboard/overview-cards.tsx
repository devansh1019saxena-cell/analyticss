"use client"

import { MetricCard } from "./metric-card"

export function OverviewCards() {
  const metrics = [
    {
      title: "Total Users",
      value: "24,582",
      trend: "+12.5%",
      trendUp: true,
      icon: "",
      color: "blue",
    },
    {
      title: "Total Downloads",
      value: "128,341",
      trend: "+8.2%",
      trendUp: true,
      icon: "",
      color: "purple",
    },
    {
      title: "Active Users",
      value: "8,234",
      trend: "-2.1%",
      trendUp: false,
      icon: "",
      color: "green",
    },
    {
      title: "Top Country",
      value: "United States",
      trend: "34.2% of users",
      trendUp: true,
      icon: "",
      color: "orange",
    },
    {
      title: "Company Accounts",
      value: "6,234",
      trend: "25.3%",
      trendUp: true,
      icon: "",
      color: "indigo",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}
