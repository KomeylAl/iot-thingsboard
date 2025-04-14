import React from "react";
import { NodeType, nodeTypeConfigs } from "./nodeTypes";

// type NodeType =
//   | "org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode"
//   | "org.thingsboard.rule.engine.filter.TbCheckRelationNode";

// type FieldType = "string" | "number" | "boolean";

// type Field = {
//   name: string;
//   label: string;
//   type: FieldType;
//   default: any;
// };

// type NodeConfig = {
//   label: string;
//   fields: Field[];
// };

// const nodeTypeConfigs: Record<NodeType, NodeConfig> = {
//   "org.thingsboard.rule.engine.filter.TbDeviceTypeSwitchNode": {
//     label: "Device Type Switch",
//     fields: [
//       {
//         name: "version",
//         label: "Version",
//         type: "number",
//         default: 0,
//       },
//     ],
//   },
//   "org.thingsboard.rule.engine.filter.TbCheckRelationNode": {
//     label: "Check Relation",
//     fields: [
//       {
//         name: "checkForSingleEntity",
//         label: "Single Entity",
//         type: "boolean",
//         default: true,
//       },
//       {
//         name: "direction",
//         label: "Direction",
//         type: "string",
//         default: "FROM",
//       },
//       {
//         name: "entityType",
//         label: "Entity Type",
//         type: "string",
//         default: "DEVICE",
//       },
//       {
//         name: "entityId",
//         label: "Entity ID",
//         type: "string",
//         default: "",
//       },
//       {
//         name: "relationType",
//         label: "Relation Type",
//         type: "string",
//         default: "Contains",
//       },
//     ],
//   },
// };

type Props = {
  nodeType: NodeType;
  value: Record<string, any>;
  onChange: (newConfig: Record<string, any>) => void;
};

export function DynamicNodeForm({ nodeType, value, onChange }: Props) {
  const config = nodeTypeConfigs[nodeType];

  const handleChange = (fieldName: string, fieldValue: any) => {
    onChange({
      ...value,
      [fieldName]: fieldValue,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{config.label}</h2>
      {config.fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-sm font-medium mb-1">{field.label}</label>
          {field.type === "string" && (
            <input
              className="border p-2 rounded"
              type="text"
              value={value[field.name] ?? field.default}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
          {field.type === "number" && (
            <input
              className="border p-2 rounded"
              type="number"
              value={value[field.name] ?? field.default}
              onChange={(e) =>
                handleChange(field.name, parseFloat(e.target.value))
              }
            />
          )}
          {field.type === "boolean" && (
            <input
              type="checkbox"
              checked={value[field.name] ?? field.default}
              onChange={(e) => handleChange(field.name, e.target.checked)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
