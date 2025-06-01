import React, { useState } from "react";
import { DynamicNodeForm } from "./DynamicNodeFrom";
import { NodeType, nodeTypeConfigs } from "./nodeTypes";
import RuleNodeForm from "./RuleNodeForm";

interface ChangeRuleChainFormProps {
  onSubmit: (type: NodeType, config: Record<string, any>) => void;
}

export default function ChangeRuleChainForm({
  onSubmit,
}: ChangeRuleChainFormProps) {
  const [nodeType, setNodeType] = useState<NodeType>(
    "org.thingsboard.rule.engine.action.TbAssignToCustomerNode"
  );

  const [config, setConfig] = useState<Record<string, any>>({});

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <select
        value={nodeType}
        onChange={(e) => setNodeType(e.target.value as NodeType)}
        className="border p-2 rounded w-full dark:bg-gray-800 no-scrollbar"
      >
        {Object.entries(nodeTypeConfigs)
          .filter((node: any) => node.label !== "Start Node")
          .map(
            ([key, value]) =>
              value.label !== "Start Node" && (
                <option key={key} value={key}>
                  {value.label}
                </option>
              )
          )}
      </select>

      <RuleNodeForm
        nodeType={nodeType}
        value={config}
        onChange={setConfig}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onSubmit(nodeType, config)}
      >
        افزودن نود
      </button>
    </div>
  );
}
