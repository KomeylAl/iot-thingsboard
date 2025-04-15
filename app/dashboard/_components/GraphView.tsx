"use client";

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import { createFinalJson, CustomNode, generateRuleChainJson, willCreateLoop } from "@/lib/utils"; // فرض بر اینکه داریم
import toast from "react-hot-toast";
import Popup from "@/components/Popup";
import ChangeRuleChainForm from "./ui/form/ChangeRuleChainFor";
import { useRuleChainMetadata } from "@/hooks/useRuleChains";
import { RuleNode } from "@/lib/types";
import { NodeType, nodeTypeConfigs } from "./ui/form/nodeTypes";

const initialNodes: Node[] = [
  {
    id: "start",
    type: "default",
    position: { x: 100, y: 100 },
    data: { label: "Start Node" },
  },
];

interface NodeGraphEditorProps {
  ruleChainId: string;
}

export function NodeGraphEditor({ ruleChainId }: NodeGraphEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [newNodes, setNewNodes] = useState<CustomNode[]>([]);

  const { data: metadata } = useRuleChainMetadata(ruleChainId);

  useEffect(() => {
    const fetchAndParse = async () => {
      const parsedNodes = [
        {
          id: "start-node",
          type: "input",
          position: { x: 50, y: 50 },
          data: { label: "Start" },
        },
        ...metadata.nodes.map((node: any) => ({
          id: node.id.id,
          type: "default",
          position: {
            x: node.additionalInfo?.layoutX || 0,
            y: node.additionalInfo?.layoutY || 0,
          },
          data: {
            label: node.name,
            raw: node,
          },
        })),
      ];

      const parsedEdges = [
        metadata.firstNodeIndex && {
          id: `e-start-node-${metadata.nodes[metadata.firstNodeIndex].id.id}`,
          source: "start-node",
          target: metadata.nodes[metadata.firstNodeIndex].id.id,
          type: "default",
          animated: true,
          label: "start",
        },
        ...metadata.connections.map((conn: any) => ({
          id: `e${metadata.nodes[conn.fromIndex].id.id}-${
            metadata.nodes[conn.toIndex].id.id
          }`,
          source: metadata.nodes[conn.fromIndex].id.id,
          target: metadata.nodes[conn.toIndex].id.id,
          type: "default",
          animated: true,
          label: conn.type,
        })),
      ];

      setNodes(parsedNodes);
      setEdges(parsedEdges);
    };

    if (metadata) {
      fetchAndParse();
    }
  }, [metadata]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      const from = params.source!;
      const to = params.target!;

      if (willCreateLoop(from, to, nodes, edges)) {
        toast.error("اتصال ایجاد شده باعث حلقه می‌شود!");
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            label: "label", // بعداً قابل ویرایش
            style: { stroke: "#4f46e5" },
          },
          eds
        )
      );
    },
    [nodes, edges]
  );

  const addNewNode = () => {
    const id = uuidv4();
    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: `Node ${prev.length}` },
      },
    ]);
  };

  const handleAddNode = (type: NodeType, config: Record<string, any>) => {
    const id = uuidv4();

    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          label: nodeTypeConfigs[type]?.label || "Custom Node",
          type,
          config,
        },
      },
    ]);

    setNewNodes((prev: any) => [
      ...prev,
      {
        id,
        type: "default",
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          label: nodeTypeConfigs[type]?.label || "Custom Node",
          type,
          config,
        },
      },
    ]);

    setIsModalOpen(false); // مودال بسته بشه
  };

  const handleEditClick = () => {
    // const updatedJson = createFinalJson(newNodes, [], metadata);
    // console.log(JSON.stringify(updatedJson, null, 2));
    toast.error("خطا در برقراری ارتباط با سرور")
  };

  return (
    <div className="w-full h-full relative">
      <div className="w-full flex items-center gap-4 h-20 absolute">
        <button
          onClick={() => setIsModalOpen(true)}
          className=" z-10 top-2 left-2 bg-blue-600 text-white px-4 py-1 rounded"
        >
          افزودن نود جدید
        </button>

        <button
          onClick={handleEditClick}
          className=" z-10 top-2 left-2 bg-rose-600 text-white px-4 py-1 rounded"
        >
          ویرایش
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="absolute inset-0"
        onNodeClick={(e: any, node: any) => {
          toast.success(`node: ${node.data.label}`);
        }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          addNewNode();
        }}
      >
        <ChangeRuleChainForm onSubmit={handleAddNode} />
      </Popup>
    </div>
  );
}
