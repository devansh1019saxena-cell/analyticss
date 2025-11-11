"use client"

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const dailyData = [
  { date: "Mon", downloads: 2400, signups: 1240 },
  { date: "Tue", downloads: 1398, signups: 1221 },
  { date: "Wed", downloads: 9800, signups: 2290 },
  { date: "Thu", downloads: 3908, signups: 2000 },
  { date: "Fri", downloads: 4800, signups: 2181 },
  { date: "Sat", downloads: 3800, signups: 2500 },
  { date: "Sun", downloads: 4300, signups: 2100 },
]

const platformData = [
  { name: "iOS", value: 55 },
  { name: "Android", value: 45 },
]

const COLORS = ["#3b82f6", "#8b5cf6"]

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Downloads & Signups Trend</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Weekly performance overview</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
            <XAxis dataKey="date" stroke="#94a3b8" className="dark:stroke-slate-400" />
            <YAxis stroke="#94a3b8" className="dark:stroke-slate-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #475569",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="downloads"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4 }}
            />
            <Line type="monotone" dataKey="signups" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Platform Distribution</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Active downloads</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {platformData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
