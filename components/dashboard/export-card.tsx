"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

interface ExportCardProps {
  title: string
  description: string
  icon: string
  formats: string[]
  onExport: (format: string) => void
  isExporting?: boolean
}

export function ExportCard({ 
  title, 
  description, 
  icon, 
  formats, 
  onExport,
  isExporting = false
}: ExportCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>

      <div className="mb-4 flex-1">
        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          Available formats
        </p>
        <div className="flex flex-wrap gap-2">
          {formats.map((format) => (
            <span
              key={format}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-medium rounded"
            >
              {format}
            </span>
          ))}
        </div>
      </div>

      {formats.length === 1 ? (
        <Button
          onClick={() => onExport(formats[0])}
          disabled={isExporting}
          className="w-full"
        >
          {isExporting ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            `Export as ${formats[0]}`
          )}
        </Button>
      ) : (
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="w-full" disabled={isExporting}>
              {isExporting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  Export Data
                  <Icons.chevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {formats.map((format) => (
              <DropdownMenuItem 
                key={format} 
                onClick={() => onExport(format)}
                className="cursor-pointer"
              >
                <Icons.file className="mr-2 h-4 w-4" />
                Export as {format}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
