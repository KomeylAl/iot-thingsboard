"use client";

import { RuleNodeInstance } from "@/lib/types";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { NodeTable } from "../../_components/NodeTable";
import { NodeType, nodeTypeConfigs } from "../../_components/ui/form/nodeTypes";
import { DynamicNodeForm } from "../../_components/ui/form/DynamicNodeFrom";

interface Params {
  ruleChainId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

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

const RuleChainPage = ({ params }: PageProps) => {
   const [nodes, setNodes] = useState<RuleNode[]>([
      {
        id: uuidv4(),
        type: "org.thingsboard.rule.engine.input.InputNode",
        name: "Input",
        config: {},
      },
    ]);
  
    const [showAddForm, setShowAddForm] = useState(false);
    const [newNodeType, setNewNodeType] = useState<NodeType>(
      "org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode"
    );
    const [newNodeConfig, setNewNodeConfig] = useState({});
  
    const handleAddNode = () => {
      const node: RuleNode = {
        id: uuidv4(),
        name: nodeTypeConfigs[newNodeType].label,
        type: newNodeType,
        config: newNodeConfig,
      };
      setNodes([...nodes, node]);
      setShowAddForm(false);
      setNewNodeConfig({});
    };

  return (
   <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Rule Chain</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          افزودن نود
        </button>
      </div>

      {showAddForm && (
        <div className="border p-4 rounded space-y-4">
          <select
            value={newNodeType}
            onChange={(e) =>
              setNewNodeType(e.target.value as NodeType)
            }
            className="border p-2 rounded w-full"
          >
            {Object.entries(nodeTypeConfigs).map(([key, val]) => (
              <option key={key} value={key}>
                {val.label}
              </option>
            ))}
          </select>
          <DynamicNodeForm
            nodeType={newNodeType}
            value={newNodeConfig}
            onChange={setNewNodeConfig}
          />
          <button
            onClick={handleAddNode}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            افزودن به زنجیره
          </button>
        </div>
      )}

      <NodeTable nodes={nodes} setNodes={setNodes} />
    </div>
  );
};

export default RuleChainPage;
