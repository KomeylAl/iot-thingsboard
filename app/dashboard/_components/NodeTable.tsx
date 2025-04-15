"use client";

import { useState } from "react";
import { ConnectionModal } from "./ConnectionModal";
import { NodeType, nodeTypeConfigs } from "./ui/form/nodeTypes";
import { willCreateLoop } from "@/lib/utils";
import toast from "react-hot-toast";

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

  const handleTargetChange = (fromId: string, toId: string) => {
    if (!toId) return;

    setNodes(
      nodes.map((node) =>
        node.id === fromId
          ? {
              ...node,
              connectedTo: {
                targetNodeId: toId,
                label: node.connectedTo?.label || "",
              },
            }
          : node
      )
    );
  };

  const updateLabel = (label: string) => {
    setNodes(
      nodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              connectedTo: {
                ...node.connectedTo!,
                label,
              },
            }
          : node
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
            <th className="p-2">برچسب اتصال</th>
          </tr>
        </thead>
        <tbody>
          {nodes.map((node) => {
            const isStartNode =
              node.type === "org.thingsboard.rule.engine.input.InputNode";

            return (
              <tr key={node.id} className="border-t">
                <td className="p-2 font-medium">{node.name}</td>
                <td className="p-2 text-sm">
                  {nodeTypeConfigs[node.type]?.label}
                </td>
                <td className="p-2">
                  {!isStartNode && (
                    <select
                      value={node.connectedTo?.targetNodeId || ""}
                      onChange={(e) =>
                        handleTargetChange(node.id, e.target.value)
                      }
                      className="border p-1 rounded"
                    >
                      <option value="">-- انتخاب نود --</option>
                      {nodes
                        .filter(
                          (n) =>
                            n.id !== node.id &&
                            n.type !==
                              "org.thingsboard.rule.engine.input.InputNode"
                        )
                        .map((target) => (
                          <option key={target.id} value={target.id}>
                            {target.name}
                          </option>
                        ))}
                    </select>
                  )}
                </td>
                <td className="p-2">
                  {node.connectedTo?.targetNodeId && (
                    <button
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        setShowModal(true);
                      }}
                      className="text-blue-600 underline"
                    >
                      {node.connectedTo.label || "انتخاب برچسب"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && selectedNodeId && (
        <ConnectionModal
          nodeType={nodes.find((n) => n.id === selectedNodeId)!.type}
          onSelect={updateLabel}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
