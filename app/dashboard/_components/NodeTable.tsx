"use client";

import { useState } from "react";
import { ConnectionModal } from "./ConnectionModal";
import { NodeType, nodeTypeConfigs } from "./ui/form/nodeTypes";

interface RuleNode {
  id: string;
  type: NodeType;
  name: string;
  config: any;
  connectedTo?: {
    targetNodeId: string;
    label: string;
  };
}

interface Props {
  nodes: RuleNode[];
  setNodes: (nodes: RuleNode[]) => void;
}

export function NodeTable({ nodes, setNodes }: Props) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleConnection = (fromId: string, toId: string) => {
    setSelectedNodeId(fromId);
    setShowModal(true);
  };

  const updateLabel = (label: string) => {
   setNodes((prev: RuleNode[]): RuleNode[] =>
     prev.map((n) =>
       n.id === selectedNodeId
         ? {
             ...n,
             connectedTo: {
               ...n.connectedTo!,
               label,
             },
           }
         : n
     )
   );
   setShowModal(false);
 };

  return (
    <div className="border rounded">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">نام نود</th>
            <th className="p-2">نوع</th>
            <th className="p-2">اتصال به</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => (
            <tr key={node.id} className="border-t">
              <td className="p-2 font-medium">{node.name}</td>
              <td className="p-2 text-sm">{nodeTypeConfigs[node.type]?.label}</td>
              <td className="p-2">
                <select
                  value={node.connectedTo?.targetNodeId || ""}
                  onChange={(e) =>
                    setNodes((prev: RuleNode[]): RuleNode[] =>
                      prev.map((n) =>
                        n.id === node.id
                          ? {
                              ...n,
                              connectedTo: {
                                ...n.connectedTo,
                                targetNodeId: e.target.value,
                              },
                            } as RuleNode
                          : n
                      )
                    )
                  }
                  className="border p-1 rounded mr-2"
                >
                  <option value="">-- انتخاب نود --</option>
                  {nodes
                    .filter((n) => n.id !== node.id)
                    .map((target) => (
                      <option key={target.id} value={target.id}>
                        {target.name}
                      </option>
                    ))}
                </select>
                {node.connectedTo?.targetNodeId && (
                  <button
                    onClick={() => handleConnection(node.id, node.connectedTo!.targetNodeId)}
                    className="text-blue-600 underline"
                  >
                    انتخاب برچسب
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedNodeId && (
        <ConnectionModal
          nodeType={
            nodes.find((n) => n.id === selectedNodeId)!.type
          }
          onSelect={updateLabel}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
