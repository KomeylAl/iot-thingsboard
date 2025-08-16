import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Edge, Node } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toThingsboardMetadata = (
  rfNodes: Node[],
  rfEdges: Edge[],
  ruleChainId: string
) => {
  // map node id => index (بدون start-node)
  const nodeIdToIndex = rfNodes
    .filter((node) => node.id !== "start-node")
    .reduce((acc: any, node: any, index: any) => {
      acc[node.id] = index;
      return acc;
    }, {} as Record<string, number>);

  // ساخت لیست nodes
  const nodes = rfNodes
    .filter((n: any) => n.id !== "start-node")
    .map((node: any) => ({
      ruleChainId: {
        entityType: "RULE_CHAIN",
        id: ruleChainId,
      },
      id: node.data.id || null,
      type: node.data.nodeType,
      name: node.data.label,
      additionalInfo: {
        layoutX: node.position.x,
        layoutY: node.position.y,
      },
      configuration: node.data.config || {},
    }));

  // پیدا کردن firstNodeIndex از start-node
  const startEdge = rfEdges.find((edge) => edge.source === "start-node");
  const firstNodeIndex = startEdge
    ? nodeIdToIndex[startEdge.target]
    : null; // یا -1 اگر چیزی نبود

  // ساخت connections (حذف edge های start-node)
  const connections = rfEdges
    .filter((edge) => edge.source !== "start-node")
    .map((edge) => ({
      fromIndex: nodeIdToIndex[edge.source],
      toIndex: nodeIdToIndex[edge.target],
      type: edge.label || "Success",
      additionalInfo: {},
    }));

  return {
    ruleChainId: {
      entityType: "RULE_CHAIN",
      id: ruleChainId,
    },
    firstNodeIndex,
    nodes,
    connections,
  };
};

