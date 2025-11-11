"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyReports, setWeeklyReports] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="p-8 space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Receive important updates via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-12 h-6 rounded-full transition ${emailNotifications ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${emailNotifications ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Weekly Reports</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Get weekly analytics summaries</p>
              </div>
              <button
                onClick={() => setWeeklyReports(!weeklyReports)}
                className={`relative w-12 h-6 rounded-full transition ${weeklyReports ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${weeklyReports ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Use dark theme throughout the dashboard</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition ${darkMode ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account</h3>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium">
              Change Password
            </button>
            <button className="w-full px-4 py-2 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
