"use client"

import { useState } from "react"

interface User {
  id: string
  name: string
  email: string
  accountType: "Company" | "Private"
  city: string
  country: string
  signupDate: string
  downloads: number
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    accountType: "Company",
    city: "San Francisco",
    country: "United States",
    signupDate: "2024-01-15",
    downloads: 1250,
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    accountType: "Private",
    city: "Seattle",
    country: "United States",
    signupDate: "2024-02-22",
    downloads: 892,
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@startup.io",
    accountType: "Company",
    city: "Austin",
    country: "United States",
    signupDate: "2024-03-10",
    downloads: 2134,
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "james.r@gmail.com",
    accountType: "Private",
    city: "New York",
    country: "United States",
    signupDate: "2024-01-28",
    downloads: 654,
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@tech.com",
    accountType: "Company",
    city: "Boston",
    country: "United States",
    signupDate: "2024-02-05",
    downloads: 1876,
  },
  {
    id: "6",
    name: "David Park",
    email: "david.park@company.uk",
    accountType: "Company",
    city: "London",
    country: "United Kingdom",
    signupDate: "2024-03-01",
    downloads: 1245,
  },
  {
    id: "7",
    name: "Sophie Martin",
    email: "sophie.m@freelance.fr",
    accountType: "Private",
    city: "Paris",
    country: "France",
    signupDate: "2024-02-14",
    downloads: 567,
  },
  {
    id: "8",
    name: "Alex Mueller",
    email: "alex.mueller@de.com",
    accountType: "Company",
    city: "Berlin",
    country: "Germany",
    signupDate: "2024-01-20",
    downloads: 2001,
  },
]

export function UsersTable({ searchTerm }: { searchTerm: string }) {
  const [sortBy, setSortBy] = useState<keyof User>("signupDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]

    if (typeof aValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue)
    }

    if (typeof aValue === "number") {
      return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    }

    return 0
  })

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedUsers = sortedUsers.slice(startIdx, startIdx + itemsPerPage)

  const handleSort = (field: keyof User) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <tr>
              {[
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "accountType", label: "Account Type" },
                { key: "city", label: "City" },
                { key: "country", label: "Country" },
                { key: "signupDate", label: "Signup Date" },
                { key: "downloads", label: "Downloads" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof User)}
                  className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-2">
                    {label}
                    {sortBy === key && (
                      <svg
                        className={`w-4 h-4 transition ${sortOrder === "desc" ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.accountType === "Company"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                        : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                    }`}
                  >
                    {user.accountType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{user.city}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{user.country}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                  {new Date(user.signupDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                  {user.downloads.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, sortedUsers.length)} of {sortedUsers.length}{" "}
          users
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
