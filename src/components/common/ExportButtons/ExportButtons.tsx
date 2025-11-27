// Export Buttons Component

import { memo } from "react";
import { FaFileCsv, FaFilePdf } from "react-icons/fa";

interface ExportButtonsProps {
  onExportCSV: () => void;
  onExportPDF: () => void;
  disabled?: boolean;
  csvLabel?: string;
  pdfLabel?: string;
  showLabel?: boolean;
}

export const ExportButtons = memo<ExportButtonsProps>(
  ({
    onExportCSV,
    onExportPDF,
    disabled = false,
    csvLabel = "Export CSV",
    pdfLabel = "Export PDF",
    showLabel = true,
  }) => {
    return (
      <div className="flex gap-3">
        <button
          onClick={onExportCSV}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm font-medium"
          title={csvLabel}
        >
          <FaFileCsv className="w-4 h-4" />
          {showLabel && <span>{csvLabel}</span>}
        </button>

        <button
          onClick={onExportPDF}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm font-medium"
          title={pdfLabel}
        >
          <FaFilePdf className="w-4 h-4" />
          {showLabel && <span>{pdfLabel}</span>}
        </button>
      </div>
    );
  }
);

ExportButtons.displayName = "ExportButtons";
