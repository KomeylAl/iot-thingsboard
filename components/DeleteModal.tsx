import React from "react";

interface DeleteModalPropd {
  deleteFunc: () => void;
  isDeleting: boolean;
  onCancel: () => void;
}

const DeleteModal = ({
  deleteFunc,
  isDeleting,
  onCancel,
}: DeleteModalPropd) => {
  return (
    <div className="w-96 flex flex-col items-start gap-4">
      <p className="text-lg">از حذف این مورد اطمینان دارید؟</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onCancel()}
          className="px-4 py-2 bg-blue-500 rounded-lg text-white"
        >
          لغو
        </button>
        <button
          disabled={isDeleting}
          onClick={() => deleteFunc()}
          className="px-4 py-2 bg-rose-500 rounded-lg text-white"
        >
          {isDeleting ? "در حال حذف..." : "حذف"}
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
