import React from "react";
import { NodeType, nodeTypeConfigs } from "./nodeTypes";

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
    // <div className="space-y-4">
    //   <h2 className="text-lg font-semibold">{config.label}</h2>
    //   {config.fields.map((field) => (
    //     <div key={field.name} className={`flex ${field.type === 'boolean' ? "flex-row-reverse items-center gap-3" : "flex col gap-2"}`}>
    //       <label className="text-sm font-medium mb-1">{field.label}</label>
    //       {field.type === "string" && (
    //         <input
    //           className="border p-2 rounded"
    //           type="text"
    //           value={value[field.name] ?? field.default}
    //           onChange={(e) => handleChange(field.name, e.target.value)}
    //         />
    //       )}
    //       {field.type === "number" && (
    //         <input
    //           className="border p-2 rounded"
    //           type="number"
    //           value={value[field.name] ?? field.default}
    //           onChange={(e) =>
    //             handleChange(field.name, parseFloat(e.target.value))
    //           }
    //         />
    //       )}
    //       {field.type === "boolean" && (
    //         <input
    //           type="checkbox"
    //           checked={value[field.name] ?? field.default}
    //           onChange={(e) => handleChange(field.name, e.target.checked)}
    //         />
    //       )}
    //     </div>
    //   ))}
    // </div>

    <div className="w-full">
      {/* {({ switch (nodeType) {
          case "Alarm status":
            return <AlarmStatusForm />;
          default:
            return <div></div>;
        } })} */}
    </div>
  );
}
