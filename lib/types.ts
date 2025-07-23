import { NodeType } from "@/app/dashboard/_components/ui/GraphEditor/nodeTypes";
import { Node as FlowNode, Edge as FlowEdge } from "reactflow";

export type RuleNodeInstance = {
  id: string; // uuid یا uniqid
  type: NodeType;
  name: string;
  config: any;
  connections: {
    toNodeId: string;
    label: string;
  }[];
};

export type RuleChainEditorState = {
  nodes: RuleNodeInstance[];
};

export interface RuleNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    name: string;
    nodeType: string;
    config: any;
    id: any;
  };
}

export interface ConfigFormPops {
  defaultValues: any;
  onSubmit: (config: any) => void;
  onDeleteNode: () => void;
}

export type EntityType = {
  label: string;
  value: string;
};

export interface CustomNode {
  id: string;
  type: NodeType;
  name: string;
  position: { x: number; y: number };
}

type NodeData = {
  label: string;
  raw?: any;
};

export type Node = FlowNode<NodeData>;
export type Edge = FlowEdge;
