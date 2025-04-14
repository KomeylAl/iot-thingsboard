import React, { useState } from "react";
import { DynamicNodeForm } from "./DynamicNodeFrom";
import { NodeType, nodeTypeConfigs } from "./nodeTypes";

export default function ChangeRuleChainForm() {
  const [nodeType, setNodeType] = useState<NodeType>("org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode");

  const [config, setConfig] = useState<Record<string, any>>({});

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <select
        value={nodeType}
        onChange={(e) =>
          setNodeType(
            e.target.value as NodeType
          )
        }
        className="border p-2 rounded w-full"
      >
        {Object.entries(nodeTypeConfigs).map(([key, value]) => (
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

      <pre className="bg-gray-100 p-4 rounded text-left">
        {JSON.stringify(config, null, 2)}
      </pre>
    </div>
  );
}
