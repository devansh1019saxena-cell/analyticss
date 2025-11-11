"use client"

import { UsersTable } from "@/components/dashboard/users-table"
import { useState } from "react"
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isExporting, setIsExporting] = useState(false)

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      // Get the users data from the table
      const usersData = [
        // This is sample data - in a real app, you would fetch this from your API
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        // Add more users as needed
      ];
      
      exportToCSV(usersData, 'users_export');
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }

  const handleExportExcel = () => {
    setIsExporting(true);
    try {
      // Get the users data from the table
      const usersData = [
        // This is sample data - in a real app, you would fetch this from your API
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        // Add more users as needed
      ];
      
      exportToExcel(usersData, 'users_export');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Users</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and view all user accounts</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            Export Excel
          </button>
        </div>
      </div>

      <UsersTable searchTerm={searchTerm} />
    </div>
  )
}
