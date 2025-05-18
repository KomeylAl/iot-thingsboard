"use client";

import React from "react";
import Table from "../Table";
import { PuffLoader } from "react-spinners";

interface EntityTableProps {
  data: any;
  error: Error | null;
  isLoading: boolean;
  columns: any;
  page?: number;
  pageSize?: number;
  onPageChange: (newPage: number) => void;
}

const EntityTable = ({
  data,
  error,
  isLoading,
  columns,
  page = 0,
  pageSize = 10,
  onPageChange,
}: EntityTableProps) => {
  return (
    <div>
      {error && <p>خطا در دریافت اطلاعات </p>}

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <PuffLoader color="#3b82f6" />
        </div>
      )}

      {!data && !isLoading && <p>اطلاعاتی برای نمایش وجود ندارد!</p>}

      {data && (
        <div className="w-full flex-1">
          <Table
            columns={columns}
            data={data.data}
            currentPage={page + 1}
            pageSize={pageSize}
            totalItems={data.totalElements}
            onPageChange={(newPage) => onPageChange(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default EntityTable;
