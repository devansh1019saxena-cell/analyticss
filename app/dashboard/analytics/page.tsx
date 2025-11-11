"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"

const analyticsData = [
  { day: "Day 1", downloads: 1200, revenue: 2400 },
  { day: "Day 2", downloads: 1900, revenue: 2210 },
  { day: "Day 3", downloads: 2290, revenue: 2290 },
  { day: "Day 4", downloads: 2000, revenue: 2000 },
  { day: "Day 5", downloads: 2181, revenue: 2100 },
  { day: "Day 6", downloads: 2500, revenue: 2200 },
  { day: "Day 7", downloads: 2100, revenue: 2300 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7days")
  const [accountType, setAccountType] = useState("all")

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Detailed performance metrics and trends</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>

        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All accounts</option>
          <option value="company">Company accounts</option>
          <option value="private">Private accounts</option>
        </select>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Downloads & Revenue</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Legend />
            <Bar dataKey="downloads" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Cumulative Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={analyticsData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="downloads"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
