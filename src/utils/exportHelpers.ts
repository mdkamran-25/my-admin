// Export utilities for CSV and PDF generation

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// CSV Export
export const exportToCSV = (
  data: any[],
  filename: string,
  columns?: string[]
) => {
  if (data.length === 0) {
    alert("No data to export");
    return;
  }

  // Get columns from first object if not provided
  const csvColumns = columns || Object.keys(data[0]);

  // Create CSV header
  const header = csvColumns.join(",");

  // Create CSV rows
  const rows = data.map((item) => {
    return csvColumns
      .map((column) => {
        const value = item[column];
        // Handle values with commas or quotes
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? "";
      })
      .join(",");
  });

  // Combine header and rows
  const csv = [header, ...rows].join("\n");

  // Create blob and download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().getTime()}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// PDF Export with customization
interface PDFExportOptions {
  title: string;
  subtitle?: string;
  filename: string;
  data: any[];
  columns: { header: string; dataKey: string }[];
  orientation?: "portrait" | "landscape";
  includeTimestamp?: boolean;
}

export const exportToPDF = (options: PDFExportOptions) => {
  const {
    title,
    subtitle,
    filename,
    data,
    columns,
    orientation = "landscape",
    includeTimestamp = true,
  } = options;

  if (data.length === 0) {
    alert("No data to export");
    return;
  }

  // Create PDF document
  const doc = new jsPDF({
    orientation,
    unit: "mm",
    format: "a4",
  });

  // Add title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(title, 14, 15);

  // Add subtitle if provided
  if (subtitle) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(subtitle, 14, 22);
  }

  // Add timestamp if required
  if (includeTimestamp) {
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const yPosition = subtitle ? 27 : 20;
    doc.text(`Generated on: ${timestamp}`, 14, yPosition);
  }

  // Prepare table data
  const tableData = data.map((item) => {
    return columns.map((col) => item[col.dataKey] ?? "");
  });

  // Add table
  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: tableData,
    startY: subtitle ? 32 : includeTimestamp ? 25 : 20,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 10, right: 10, bottom: 10, left: 10 },
  });

  // Add page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Save PDF
  doc.save(`${filename}_${new Date().getTime()}.pdf`);
};

// Specific export functions for different pages

// Export Withdrawal Requests
export const exportWithdrawalRequests = (
  data: any[],
  format: "csv" | "pdf" = "csv"
) => {
  const columns = [
    "name",
    "username",
    "phone",
    "amount",
    "requestDate",
    "status",
    "type",
    "bankName",
    "accountNumber",
    "ifsc",
  ];

  if (format === "csv") {
    exportToCSV(data, "withdrawal_requests", columns);
  } else {
    exportToPDF({
      title: "Withdrawal Requests Report",
      subtitle: `Total Requests: ${data.length}`,
      filename: "withdrawal_requests",
      data,
      columns: [
        { header: "Name", dataKey: "name" },
        { header: "Username", dataKey: "username" },
        { header: "Phone", dataKey: "phone" },
        { header: "Amount", dataKey: "amount" },
        { header: "Date", dataKey: "requestDate" },
        { header: "Status", dataKey: "status" },
        { header: "Type", dataKey: "type" },
        { header: "Bank", dataKey: "bankName" },
        { header: "Account", dataKey: "accountNumber" },
      ],
      orientation: "landscape",
    });
  }
};

// Export User List
export const exportUserList = (data: any[], format: "csv" | "pdf" = "csv") => {
  const columns = [
    "sn",
    "username",
    "name",
    "phone",
    "email",
    "points",
    "wallet",
    "registrationDate",
    "lastActiveDate",
    "status",
    "city",
    "state",
  ];

  if (format === "csv") {
    exportToCSV(data, "user_list", columns);
  } else {
    exportToPDF({
      title: "User List Report",
      subtitle: `Total Users: ${data.length}`,
      filename: "user_list",
      data,
      columns: [
        { header: "S.N.", dataKey: "sn" },
        { header: "Username", dataKey: "username" },
        { header: "Name", dataKey: "name" },
        { header: "Phone", dataKey: "phone" },
        { header: "Points", dataKey: "points" },
        { header: "Wallet", dataKey: "wallet" },
        { header: "Registration", dataKey: "registrationDate" },
        { header: "Status", dataKey: "status" },
        { header: "City", dataKey: "city" },
      ],
      orientation: "landscape",
    });
  }
};

// Export Game History
export const exportGameHistory = (
  data: any[],
  format: "csv" | "pdf" = "csv"
) => {
  const columns = [
    "username",
    "phone",
    "gameType",
    "gameName",
    "marketType",
    "bidNumber",
    "bidAmount",
    "winAmount",
    "playDate",
    "playTime",
    "status",
  ];

  if (format === "csv") {
    exportToCSV(data, "game_history", columns);
  } else {
    exportToPDF({
      title: "Game History Report",
      subtitle: `Total Games: ${data.length}`,
      filename: "game_history",
      data,
      columns: [
        { header: "Username", dataKey: "username" },
        { header: "Phone", dataKey: "phone" },
        { header: "Game", dataKey: "gameName" },
        { header: "Market", dataKey: "marketType" },
        { header: "Bid", dataKey: "bidNumber" },
        { header: "Bid Amount", dataKey: "bidAmount" },
        { header: "Win Amount", dataKey: "winAmount" },
        { header: "Date", dataKey: "playDate" },
        { header: "Status", dataKey: "status" },
      ],
      orientation: "landscape",
    });
  }
};

// Export Activity Logs
export const exportActivityLogs = (
  data: any[],
  format: "csv" | "pdf" = "csv"
) => {
  const columns = [
    "username",
    "phone",
    "activity",
    "timestamp",
    "ipAddress",
    "device",
  ];

  if (format === "csv") {
    exportToCSV(data, "activity_logs", columns);
  } else {
    exportToPDF({
      title: "Activity Logs Report",
      subtitle: `Total Activities: ${data.length}`,
      filename: "activity_logs",
      data,
      columns: [
        { header: "Username", dataKey: "username" },
        { header: "Phone", dataKey: "phone" },
        { header: "Activity", dataKey: "activity" },
        { header: "Timestamp", dataKey: "timestamp" },
        { header: "IP Address", dataKey: "ipAddress" },
        { header: "Device", dataKey: "device" },
      ],
      orientation: "landscape",
    });
  }
};
