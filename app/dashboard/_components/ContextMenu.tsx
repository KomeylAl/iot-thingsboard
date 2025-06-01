import { Modal } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import React, { useCallback, useState } from 'react';
import { useReactFlow } from 'reactflow';
import RuleNodeForm from './ui/form/RuleNodeForm';
import { NodeType } from './ui/form/nodeTypes';

interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  type: NodeType;
}

export default function ContextMenu({
  id,
  name,
  top,
  left,
  right,
  bottom,
  type,
  ...props
}: ContextMenuProps) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  
  const [isOpen, setIsOpen] = useState(false)

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  }, [id, setNodes, setEdges]);

  const [config, setConfig] = useState<Record<string, any>>({});

  if (isOpen) {console.log("open")} else {console.log("close")};

  return (
    <div
      className="absolute z-50 bg-white rounded-md shadow-lg border border-gray-300 p-3 flex flex-col space-y-2 min-w-[140px]"
      style={{
        top: top ?? undefined,
        left: left ?? undefined,
        right: right ?? undefined,
        bottom: bottom ?? undefined,
      }}
      {...props}
    >
      <p className="text-xs text-gray-500 mb-2 text-right">
         <span className="font-semibold">{name}</span> :نود
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="text-right text-sm px-2 py-1 rounded text-blue-500 hover:bg-gray-100 transition"
      >
        ویرایش
      </button>
      <button
        onClick={deleteNode}
        className="text-right px-2 py-1 rounded hover:bg-gray-100 text-red-500 transition"
      >
         حذف
      </button>
    </div>
  );
}
