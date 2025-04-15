import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RuleNode } from "./types";
import { NodeType, nodeTypeConfigs } from "@/app/dashboard/_components/ui/form/nodeTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function willCreateLoop(
  fromId: string,
  toId: string,
  nodes: any[],
  edges: any[]
): boolean {
  const graph: Record<string, string[]> = {};

  nodes.forEach((node) => (graph[node.id] = []));
  edges.forEach((edge) => {
    graph[edge.source].push(edge.target);
  });

  graph[fromId].push(toId);

  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(nodeId: string): boolean {
    if (stack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    stack.add(nodeId);

    for (const neighbor of graph[nodeId]) {
      if (dfs(neighbor)) return true;
    }

    stack.delete(nodeId);
    return false;
  }

  return dfs(fromId);
}

export function generateRuleChainJson(originalJson: any, newFlowNodes: any) {
  // Step 1: آماده‌سازی نودهای جدید بدون id و createdTime و ...
  const cleanedNewNodes = newFlowNodes.map((node: any, index: any) => {
    return {
      name: node.name,
      type: node.type,
      configuration: node.configuration,
      additionalInfo: node.additionalInfo || { layoutX: 0, layoutY: 0 },
      ruleChainId: originalJson.ruleChainId,
      configurationVersion: 0,
      singletonMode: false,
      queueName: null,
      debugSettings: null,
      externalId: null,
    };
  });

  // Step 2: ترکیب نودهای قبلی با نودهای جدید
  const mergedNodes = [...originalJson.nodes, ...cleanedNewNodes];

  // Step 3: مدیریت connections
  let newConnections = [...originalJson.connections];

  newFlowNodes.forEach((node: any, index: any) => {
    const realIndex = originalJson.nodes.length + index;

    if (node.connections && node.connections.length > 0) {
      node.connections.forEach((target: any) => {
        const targetIndex = mergedNodes.findIndex(n => n.name === target.name);
        if (targetIndex !== -1) {
          newConnections.push({
            fromIndex: realIndex,
            toIndex: targetIndex,
            type: target.type || 'default',
          });
        }
      });
    }
  });

  // Step 4: برگردوندن JSON نهایی
  return {
    ...originalJson,
    nodes: mergedNodes,
    connections: newConnections,
  };
}


export interface CustomNode {
  id: string;
  type: NodeType;
  name: string;
  position: { x: number; y: number };
}

interface CustomConnection {
  from: string;
  to: string;
  relationType: string;
}

interface FinalNode {
  id: string;
  name: string;
  type: NodeType;
  configuration: Record<string, any>;
  additionalInfo: { layoutX: number; layoutY: number };
  ruleChainId: string;
  configurationVersion: number;
  singletonMode: boolean;
  queueName: string | null;
  debugSettings: any;
  externalId: string | null;
}

interface FinalConnection {
  fromIndex: number;
  toIndex: number;
  type: string;
}

export function createFinalJson(
  customNodes: CustomNode[],
  customConnections: CustomConnection[],
  originalJson: any
): any {
  const nodeIdToIndex: Record<string, number> = {};
  const finalNodes: FinalNode[] = customNodes.map((node, index) => {
    nodeIdToIndex[node.id] = index;

    const config = nodeTypeConfigs[node.type];
    const configuration: Record<string, any> = {};
    config.fields.forEach(field => {
      configuration[field.name] = field.default ?? null;
    });

    return {
      id: node.id,
      name: node.name,
      type: node.type,
      configuration,
      additionalInfo: {
        layoutX: node.position.x,
        layoutY: node.position.y,
      },
      ruleChainId: originalJson.ruleChainId,
      configurationVersion: 0,
      singletonMode: false,
      queueName: null,
      debugSettings: null,
      externalId: null,
    };
  });

  const finalConnections: FinalConnection[] = customConnections.map(conn => ({
    fromIndex: nodeIdToIndex[conn.from],
    toIndex: nodeIdToIndex[conn.to],
    type: conn.relationType,
  }));

  return {
    ...originalJson,
    nodes: finalNodes,
    connections: finalConnections,
  };
}
