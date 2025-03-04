import Popup from "@/components/Popup";
import { convertISOToJalali } from "@/utils/convert";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface TableProps {
  data: any;
  columns: any;
  RPP: any;
  getRowLink: (row: any) => string;
  clickableRows?: boolean;
  onDeleteClicked?: (rowId: string) => void;
  onEditClicked?: (rowId: string) => void;
}

const Table = ({
  data,
  columns,
  RPP,
  getRowLink,
  clickableRows = true,
  onDeleteClicked,
  onEditClicked,
}: TableProps) => {
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

  const handleDelete = (row: any) => {
    if (onDeleteClicked) {
      onDeleteClicked(row);
    }
  };

  const handleEdit = (row: any) => {
    if (onEditClicked) {
      onEditClicked(row);
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
      <table className="min-w-full table-auto rounded-lg border-separate border-spacing-y-2">
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
              onClick={() => clickableRows && handleRowClick(row)}
              className="bg-white hover:bg-gray-100 transition-colors duration-200 group"
            >
              {columns.map((col: any, colIndex: any) => (
                <td
                  key={colIndex}
                  className={`px-4 py-4  rounded-md text-gray-600 mt-2 ${
                    clickableRows && "cursor-pointer group-hover:text-blue-500"
                  }`}
                >
                  {col.accessor === "createdAt" ||
                  col.accessor === "createdTime"
                    ? convertISOToJalali(row[col.accessor])
                    : row[col.accessor]}
                  {col.type === "editButton" && (
                    <MdEdit
                      size={20}
                      className="text-blue-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(row);
                      }}
                    />
                  )}
                  {col.type === "deleteButton" && (
                    <MdDelete
                      size={20}
                      className="text-rose-500 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row);
                      }}
                    />
                  )}
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
