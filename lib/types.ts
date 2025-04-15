import { NodeType } from "@/app/dashboard/_components/ui/form/nodeTypes";

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
  type: NodeType;
  name: string;
  config: any;
  connectedTo?: {
    targetNodeId: string;
    label: string;
  };
}
