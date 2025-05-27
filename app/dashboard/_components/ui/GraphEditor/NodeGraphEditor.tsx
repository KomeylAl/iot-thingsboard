import { useState } from 'react';

"use client";

import React, { useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";

interface NodeGrapgEditorProps {
  ruleChainId: string;
}

const NodeGraphEditor = ({ ruleChainId }: NodeGrapgEditorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="w-full h-full relative" ref={ref}>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        fitView
        className="absolute inset-0"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeGraphEditor;
