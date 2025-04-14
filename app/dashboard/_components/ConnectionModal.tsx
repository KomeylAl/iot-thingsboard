"use client";

import { NodeType, nodeTypeConfigs } from "./ui/form/nodeTypes";

interface Props {
  nodeType: NodeType;
  onSelect: (label: string) => void;
  onClose: () => void;
}

export function ConnectionModal({ nodeType, onSelect, onClose }: Props) {
  const labels = nodeTypeConfigs[nodeType]?.relations || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">برچسب اتصال</h3>
        <ul className="space-y-2">
          {labels.map((label: any) => (
            <li key={label}>
              <button
                onClick={() => onSelect(label)}
                className="w-full text-right px-3 py-2 border rounded hover:bg-gray-100"
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 underline"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
