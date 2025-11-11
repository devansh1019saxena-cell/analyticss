import { OverviewCards } from "@/components/dashboard/overview-cards"
import { ChartsSection } from "@/components/dashboard/charts-section"

export const metadata = {
  title: "Dashboard - Hantly",
  description: "View your analytics overview",
}

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Overview</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back to your analytics dashboard</p>
      </div>
      <OverviewCards />
      <ChartsSection />
    </div>
  )
}
