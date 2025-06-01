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
  console.log(edges)

  nodes.forEach((node) => (graph[node.id] = []));
  edges.forEach((edge) => {
    graph[edge.source]!.push(edge.target);
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

// export function createFinalJson(
//   customNodes: CustomNode[],
//   customConnections: CustomConnection[],
//   originalJson: any
// ): any {
//   const nodeIdToIndex: Record<string, number> = {};
//   const finalNodes: FinalNode[] = customNodes.map((node, index) => {
//     nodeIdToIndex[node.id] = index;

//     const config = nodeTypeConfigs[node.type];
//     const configuration: Record<string, any> = {};
//     config.fields.forEach(field => {
//       configuration[field.name] = field.default ?? null;
//     });

//     return {
//       id: node.id,
//       name: node.name,
//       type: node.type,
//       configuration,
//       additionalInfo: {
//         layoutX: node.position.x,
//         layoutY: node.position.y,
//       },
//       ruleChainId: originalJson.ruleChainId,
//       configurationVersion: 0,
//       singletonMode: false,
//       queueName: null,
//       debugSettings: null,
//       externalId: null,
//     };
//   });

//   const finalConnections: FinalConnection[] = customConnections.map(conn => ({
//     fromIndex: nodeIdToIndex[conn.from],
//     toIndex: nodeIdToIndex[conn.to],
//     type: conn.relationType,
//   }));

//   return {
//     ...originalJson,
//     nodes: finalNodes,
//     connections: finalConnections,
//   };
// }


// export function createFinalJsonFromEditor(
//   nodes: Node[],
//   edges: Edge[],
//   originalJson: any
// ): any {
//   const finalNodes: any[] = [];
//   const nodeIdToIndex: Record<string, number> = {};

//   nodes.forEach((node, index) => {
//     const raw = node.data?.raw;
//     const isExisting = raw && raw.id;

//     const finalNode = isExisting
//       ? {
//           ...raw, // نود از سمت سرور
//           additionalInfo: {
//             ...(raw.additionalInfo || {}),
//             layoutX: node.position.x,
//             layoutY: node.position.y,
//           },
//         }
//       : {
//           ruleChainId: originalJson.ruleChainId,
//           type: node.data?.raw?.type || "org.thingsboard.rule.engine.filter.TbJsFilterNode", // یا هر مقدار پیش‌فرضی
//           name: node.data?.label || "New Node",
//           debugSettings: null,
//           singletonMode: false,
//           queueName: null,
//           configurationVersion: 0,
//           externalId: null,
//           configuration: {}, // اگه نیاز هست از config پیش‌فرض بساز
//           additionalInfo: {
//             description: "",
//             layoutX: node.position.x,
//             layoutY: node.position.y,
//           },
//         };

//     nodeIdToIndex[node.id] = index;
//     finalNodes.push(finalNode);
//   });

//   const finalConnections = edges.map((edge) => ({
//     fromIndex: nodeIdToIndex[edge.source],
//     toIndex: nodeIdToIndex[edge.target],
//     type: edge.label || "default",
//   }));

//   const firstRealNodeIndex = nodes.findIndex((n) => n.id !== "start-node");

//   return {
//     ...originalJson,
//     firstNodeIndex: firstRealNodeIndex !== -1 ? firstRealNodeIndex : 0,
//     nodes: finalNodes,
//     connections: finalConnections,
//     ruleChainConnections: null,
//   };
// }


import { Node as FlowNode, Edge as FlowEdge } from 'reactflow';

type NodeData = {
  label: string;
  raw?: any;
};

type Node = FlowNode<NodeData>;
type Edge = FlowEdge;

type PreparedRuleChain = {
  metaData: {
    firstNodeIndex: number;
    nodes: any[];
    connections: {
      fromIndex: number;
      toIndex: number;
      type: string;
    }[];
  };
  ruleChainConnections: any[]; // اختیاری
};

export function prepareRuleChainForServer(
  nodes: any,
  edges: Edge[],
  ruleChainId: string
): PreparedRuleChain {

  console.log(nodes);

  const filteredNodes = nodes.filter((node: any) => node.id !== 'start-node');
  const nodeIndexMap = new Map<string, number>(); // mapping node.id => index in filteredNodes

  console.log(filteredNodes)

  const preparedNodes = filteredNodes.map((node: any, index: any) => {
    nodeIndexMap.set(node.id, index);

    const raw = node.data.raw;
    
    if (raw) {
      return {
        ...raw,
        additionalInfo: {
          ...raw.additionalInfo,
          layoutX: node.position.x,
          layoutY: node.position.y,
        },
      };
    } else {
      return {
        ruleChainId: {
          entityType: 'RULE_CHAIN',
          id: ruleChainId,
        },
        type: node.type,
        name: node.data.label,
        debugSettings: null,
        singletonMode: false,
        queueName: null,
        configurationVersion: 0,
        externalId: null,
        configuration: {},
        additionalInfo: {
          description: '',
          layoutX: node.position.x,
          layoutY: node.position.y,
        },
      };
    }
  });

  // console.log(preparedNodes)

  const preparedConnections = edges
  .filter((edge) => edge.source !== 'start-node')
  .map((edge) => {
    const fromIndex = nodeIndexMap.get(edge.source);
    const toIndex = nodeIndexMap.get(edge.target);
    return {
      fromIndex,
      toIndex,
      type: typeof edge.label === 'string' ? edge.label : 'Success',
    };
  })
  .filter(
    (conn): conn is { fromIndex: number; toIndex: number; type: string } =>
      typeof conn.fromIndex === 'number' &&
      typeof conn.toIndex === 'number' &&
      typeof conn.type === 'string'
  );

  const firstNodeId = edges.find((e) => e.source === 'start-node')?.target;
  const firstNodeIndex = nodeIndexMap.get(firstNodeId ?? '') ?? 0;

  const result: PreparedRuleChain = {
    metaData: {
      firstNodeIndex,
      nodes: preparedNodes,
      connections: preparedConnections,
    },
    ruleChainConnections: [],
  };

  return result;
}
