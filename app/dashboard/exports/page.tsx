"use client"

import { ExportCard } from "@/components/dashboard/export-card"
import { useState } from "react"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface ExportLog {
  id: string
  type: string
  date: string
  status: "completed" | "processing" | "failed"
  size: string
}

// Sample data for exports
const sampleData: Record<string, any[]> = {
  "Users Data": [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ],
  "Analytics Report": [
    { date: '2024-01-01', visitors: 1000, pageViews: 3500, conversion: 2.5 },
    { date: '2024-01-02', visitors: 1200, pageViews: 4200, conversion: 3.1 },
    { date: '2024-01-03', visitors: 950, pageViews: 3200, conversion: 2.8 },
  ],
  "Locations Data": [
    { id: 1, name: 'New York', users: 1250, country: 'USA' },
    { id: 2, name: 'London', users: 980, country: 'UK' },
    { id: 3, name: 'Tokyo', users: 1500, country: 'Japan' },
  ],
  "Downloads Report": [
    { id: 1, file: 'Document.pdf', downloads: 1200, date: '2024-01-01' },
    { id: 2, file: 'Presentation.pptx', downloads: 850, date: '2024-01-02' },
    { id: 3, file: 'Spreadsheet.xlsx', downloads: 1100, date: '2024-01-03' },
  ],
  "Revenue Report": [
    { month: 'Jan', revenue: 50000, expenses: 30000, profit: 20000 },
    { month: 'Feb', revenue: 52000, expenses: 31000, profit: 21000 },
    { month: 'Mar', revenue: 55000, expenses: 32000, profit: 23000 },
  ],
  "Custom Report": [
    { id: 1, name: 'Custom Data 1', value: 100, category: 'A' },
    { id: 2, name: 'Custom Data 2', value: 200, category: 'B' },
    { id: 3, name: 'Custom Data 3', value: 300, category: 'A' },
  ]
};

// Function to export data as CSV
const exportToCSV = (data: any[], fileName: string) => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const csvRows = data.map(row => 
    Object.values(row).map(field => 
      typeof field === 'string' && field.includes(',') ? `"${field}"` : field
    ).join(',')
  );
  const csv = [headers, ...csvRows].join('\n');
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
};

// Function to export data as Excel
const exportToExcel = (data: any[], fileName: string) => {
  // Convert data to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  // Generate Excel file and download
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  saveAs(blob, `${fileName}.xlsx`);
};

// Function to export data as JSON
const exportToJSON = (data: any[], fileName: string) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, `${fileName}.json`);
};

// Function to export data as PDF (placeholder - in a real app, you would use a PDF library)
const exportToPDF = (data: any[], fileName: string) => {
  // This is a placeholder - in a real app, you would use a PDF library like jspdf or pdf-lib
  alert(`Exporting ${fileName} as PDF would happen here`);
};

const exportLogs: ExportLog[] = [
  { id: "1", type: "Users Data", date: new Date().toISOString().split('T')[0], status: "completed", size: "2.5 MB" },
  { id: "2", type: "Analytics Report", date: new Date(Date.now() - 86400000).toISOString().split('T')[0], status: "completed", size: "1.8 MB" },
  { id: "3", type: "Locations Data", date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], status: "completed", size: "892 KB" },
  { id: "4", type: "Users Data", date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0], status: "completed", size: "2.4 MB" },
];

export default function ExportsPage() {
  const [logs, setLogs] = useState<ExportLog[]>(exportLogs);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format: string, type: string) => {
    setIsExporting(true);
    
    // Add a new log entry
    const newLog: ExportLog = {
      id: Date.now().toString(),
      type: `${type} (${format})`,
      date: new Date().toISOString().split('T')[0],
      status: "processing",
      size: "0 KB"
    };
    
    setLogs(prevLogs => [newLog, ...prevLogs]);
    
    try {
      // Get the data to export
      const data = sampleData[type] || [];
      
      // Export based on format
      switch (format) {
        case 'CSV':
          exportToCSV(data, `${type.toLowerCase().replace(/\s+/g, '_')}_export`);
          break;
        case 'Excel':
          exportToExcel(data, `${type.toLowerCase().replace(/\s+/g, '_')}_export`);
          break;
        case 'JSON':
          exportToJSON(data, `${type.toLowerCase().replace(/\s+/g, '_')}_export`);
          break;
        case 'PDF':
          exportToPDF(data, `${type.toLowerCase().replace(/\s+/g, '_')}_export`);
          break;
        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
      
      // Update log entry on success
      setTimeout(() => {
        setLogs(prevLogs => 
          prevLogs.map(log => 
            log.id === newLog.id 
              ? { ...log, status: "completed", size: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9) + 1} MB` }
              : log
          )
        );
      }, 1000);
      
    } catch (error) {
      console.error(`Error exporting ${type} as ${format}:`, error);
      
      // Update log entry on error
      setLogs(prevLogs => 
        prevLogs.map(log => 
          log.id === newLog.id 
            ? { ...log, status: "failed" }
            : log
        )
      );
      
      alert(`Failed to export ${type} as ${format}. Please try again.`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Exports</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Export your analytics data in multiple formats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExportCard
          title="Users Data"
          description="Export all user accounts and information"
          icon="👥"
          formats={["CSV", "Excel", "JSON"]}
          onExport={(format) => handleExport(format, "Users Data")}
        />
        <ExportCard
          title="Analytics Report"
          description="Complete analytics metrics and charts data"
          icon="📊"
          formats={["CSV", "Excel", "PDF"]}
          onExport={(format) => handleExport(format, "Analytics Report")}
        />
        <ExportCard
          title="Locations Data"
          description="Geographic distribution and location insights"
          icon="🗺️"
          formats={["CSV", "Excel", "JSON"]}
          onExport={(format) => handleExport(format, "Locations Data")}
        />
        <ExportCard
          title="Downloads Report"
          description="Complete download statistics and trends"
          icon="⬇️"
          formats={["CSV", "Excel"]}
          onExport={(format) => handleExport(format, "Downloads Report")}
        />
        <ExportCard
          title="Revenue Report"
          description="Revenue metrics and financial data"
          icon="💰"
          formats={["Excel", "PDF"]}
          onExport={(format) => handleExport(format, "Revenue Report")}
        />
        <ExportCard
          title="Custom Report"
          description="Build and export a custom report"
          icon="⚙️"
          formats={["CSV", "Excel", "JSON"]}
          onExport={(format) => handleExport(format, "Custom Report")}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Export History</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Your recent exports</p>
        </div>

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">{log.type}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{log.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    log.status === "completed"
                      ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                      : log.status === "processing"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
                  }`}
                >
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{log.size}</span>
                <button className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition text-sm font-medium">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
