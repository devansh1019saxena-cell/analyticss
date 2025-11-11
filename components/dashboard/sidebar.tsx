"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "/images/overview.svg" },
  { href: "/dashboard/users", label: "Users", icon: "/images/user.svg" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "/images/analytics.svg" },
  { href: "/dashboard/locations", label: "Locations", icon: "/images/location.svg" },
  { href: "/dashboard/exports", label: "Exports", icon: "/images/export.svg" },
  { href: "/dashboard/settings", label: "Settings", icon: "/images/setting.svg" },
]

export function Sidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-800`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between h-16 border-b border-slate-800">
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-bold text-lg">Hantly</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-slate-800 rounded-lg transition"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          const isImageIcon = item.icon.startsWith("/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
              title={!open ? item.label : undefined}
            >
              {isImageIcon ? (
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={22}
                  height={22}
                  className="flex-shrink-0 object-contain"
                />
              ) : (
                <span className="text-lg flex-shrink-0">{item.icon}</span>
              )}
              {open && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => {
            localStorage.removeItem("authToken")
            localStorage.removeItem("userEmail")
            window.location.href = "/login"
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <span className="text-lg">🚪</span>
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
