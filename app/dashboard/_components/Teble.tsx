import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TableProps {
   data: any;
   columns: any;
   RPP: any;
   getRowLink: (row: any) => string;
}

const Table = ({ data, columns, RPP, getRowLink }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = RPP;

  // Pagination logic
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const router = useRouter();

  const handleRowClick = (row: any) => {
    if (getRowLink) {
      const link = getRowLink(row); // تولید مسیر داینامیک
      if (link) {
        router.push(link);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col: any, index: any) => (
              <th
                key={index}
                className="text-right px-4 py-2  font-medium text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row: any, rowIndex: any) => (
            <tr
              key={rowIndex}
              onClick={() => handleRowClick(row)}
              className={
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              }
            >
              {columns.map((col: any, colIndex: any) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 text-gray-600"
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 rounded-md bg-white mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          قبلی
        </button>
        <span className="text-gray-600">
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default Table;