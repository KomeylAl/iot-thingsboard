"use client";

import { useRuleChainMetadata } from "@/hooks/useRuleChains";
import { useCallback, useEffect, useState } from "react";

import React, { useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { NodeType, nodeTypeConfigs } from "../form/nodeTypes";

interface NodeGrapgEditorProps {
  ruleChainId: string;
}

const NodeGraphEditor = ({ ruleChainId }: NodeGrapgEditorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { data: metadata } = useRuleChainMetadata(ruleChainId);

  useEffect(() => {
    const fetchAndParse = async () => {
      const parsedNodes = [
        {
          id: "start-node",
          type: "input",
          position: { x: 50, y: 50 },
          data: { label: "Start" },
          draggable: false,
          deletable: false,
          style: {
            backgroundColor: "#0094e3",
            color: "white",
            border: "1px solid #ffffff",
          },
        },
        ...metadata.nodes.map((node: any) => ({
          id: node.id.id,
          type: node.type,
          position: {
            x: node.additionalInfo?.layoutX || 0,
            y: node.additionalInfo?.layoutY || 0,
          },
          data: {
            label: node.name,
            raw: node,
          },
          className: "bg-white dark:bg-gray-600 dark:text-white",
        })),
      ];

      const parsedEdges = [];

      if (metadata.firstNodeIndex !== null) {
        parsedEdges.push({
          id: `e-start-node`,
          source: "start-node",
          target: metadata.nodes[metadata.firstNodeIndex].id.id,
          type: "floating",
          animated: true,
          label: "",
        });
      }

      const connectionMap = new Map<string, string[]>();

      metadata.connections?.forEach((conn: any) => {
        const key = `${conn.fromIndex}-${conn.toIndex}`;
        if (!connectionMap.has(key)) {
          connectionMap.set(key, []);
        }
        connectionMap.get(key)!.push(conn.type);
      });

      connectionMap.forEach((labels, key) => {
        const [fromIndex, toIndex] = key.split("-").map(Number);
        parsedEdges.push({
          id: `e${metadata.nodes[fromIndex].id.id}-${metadata.nodes[toIndex].id.id}`,
          source: metadata.nodes[fromIndex].id.id,
          target: metadata.nodes[toIndex].id.id,
          type: "floating",
          animated: true,
          label: labels.join(" | "),
        });
      });

      setNodes(parsedNodes);
      setEdges(parsedEdges);
    };

    if (metadata) {
      fetchAndParse();
    }
  }, [metadata]);

  const onConnect = useCallback(
    (params: Connection) => {
      // console.log(params);
      const from = params.source!;
      const to = params.target!;

      // if (willCreateLoop(from, to, nodes, edges)) {
      //   toast.error("اتصال ایجاد شده باعث حلقه می‌شود!");
      //   return;
      // }

      // console.log(nodes);

      const node = nodes.filter((node) => node.id === from && node)[0];
      console.log(node);
      const nodeType = nodeTypeConfigs[node.type as NodeType];
      console.log(nodeType);

      // setConnections(nodeType[0][1].relations)

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            label: params.source === "start-node" ? "" : "label",
            style: { stroke: "#4f46e5" },
          },
          eds
        )
      );
    },
    [nodes, edges]
  );

  return (
    <div className="w-full h-full relative" ref={ref}>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
        className="absolute inset-0"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeGraphEditor;
