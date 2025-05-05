import React, { useState } from "react";
import { DynamicNodeForm } from "./DynamicNodeFrom";
import { NodeType, nodeTypeConfigs } from "./nodeTypes";

interface ChangeRuleChainFormProps {
  onSubmit: (type: NodeType, config: Record<string, any>) => void;
}

export default function ChangeRuleChainForm({
  onSubmit,
}: ChangeRuleChainFormProps) {
  const [nodeType, setNodeType] = useState<NodeType>(
    "org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode"
  );

  const [config, setConfig] = useState<Record<string, any>>({});

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <select
        value={nodeType}
        onChange={(e) => setNodeType(e.target.value as NodeType)}
        className="border p-2 rounded w-full"
      >
        {Object.entries(nodeTypeConfigs).filter((node: any) => node.label !== "Start Node").map(([key, value]) => value.label !== "Start Node" && (
          <option key={key} value={key}>
            {value.label}
          </option>
        ))}
      </select>

      <DynamicNodeForm
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
