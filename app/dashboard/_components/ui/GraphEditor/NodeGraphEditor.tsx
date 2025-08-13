"use client";

import React, { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  MarkerType,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { NodeType, nodeTypeConfigs } from "./nodeTypes";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import { ConfigFormPops, RuleNode } from "@/lib/types";
import { useUpdateRuleChainMetadata } from "@/hooks/useRuleChains";
import { toThingsboardMetadata } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RuleChainEditorPageProps {
  ruleChainId: string;
}

export default function RuleChainEditorPage({
  ruleChainId,
}: RuleChainEditorPageProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [metadata, setMetadata] = useState<any>();
  const [openTypeDialog, setOpenTypeDialog] = useState(false);
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [openRelationDialog, setOpenRelationDialog] = useState(false);
  const [selectedNodeName, setSelectedNodeName] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [defaultConfig, setDefaultConfig] = useState<any>(null);

  const [pendingEdge, setPendingEdge] = useState<any>(null);
  const [selectedRelation, setSelectedRelation] = useState<string>("");

  const fetchRuleChain = async () => {
    const res = await fetch(`/api/tenant/rule-chains/${ruleChainId}/metadata`);
    const metadata = await res.json();
    setMetadata(metadata);
    const { nodes: tbNodes, connections } = metadata;

    const rfNodes: Node[] = tbNodes.map((n: any, index: number) => ({
      id: n.id.id,
      type: "default",
      position: {
        x: n.additionalInfo?.layoutX || 200 + index * 100,
        y: n.additionalInfo?.layoutY || 200,
      },
      data: {
        label: n.name,
        name: nodeTypeConfigs[n.type as NodeType]?.name || "",
        nodeType: n.type,
        config: n.configuration,
        id: n.id,
      },
    }));

    const rfEdges: Edge[] = connections
      ? connections.map((conn: any, index: number) => {
          const fromNode = tbNodes[conn.fromIndex];
          const toNode = tbNodes[conn.toIndex];
          return {
            id: `e${index}`,
            source: fromNode.id.id,
            target: toNode.id.id,
            label: conn.type,
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: true,
          };
        })
      : [];

    const parsedNodes = [
      {
        id: "start-node",
        type: "input",
        position: { x: 50, y: 150 },
        data: { label: "Input" },
        draggable: false,
        deletable: false,
        style: {
          backgroundColor: "#0094e3", // آبی تیره (tailwind: bg-blue-600)
          color: "white",
          border: "1px solid #ffffff",
        },
      },
      ...rfNodes,
    ];

    const parsedEdges: Edge[] = [];

    if (metadata.firstNodeIndex !== null) {
      parsedEdges.push({
        id: `e-start`,
        source: "start-node",
        target: metadata.nodes[metadata.firstNodeIndex].id.id,
        label: "",
        markerEnd: { type: MarkerType.ArrowClosed },
        animated: true,
      });
    }

    rfEdges.forEach((edge) => parsedEdges.push(edge));

    setNodes(parsedNodes);
    setEdges(parsedEdges);
  };

  useEffect(() => {
    fetchRuleChain();
  }, []);

  const handleAddNode = (type: NodeType): any => {
    const id = `${Date.now()}`;
    const newNode: Node = {
      id,
      type: "default",
      position: { x: 250, y: 100 },
      data: {
        name: nodeTypeConfigs[type].name,
        label: nodeTypeConfigs[type].label,
        nodeType: type,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setOpenTypeDialog(false);
    setSelectedNodeId(id);
    setSelectedNodeName(nodeTypeConfigs[type].name);
    setDefaultConfig(null);
    setOpenConfigDialog(true);
  };

  const handleEditNode = (node: Node) => {
    setSelectedNodeId(node.id);
    setSelectedNodeName(node.data.name);
    setDefaultConfig(node.data.config || null);
    setOpenConfigDialog(true);
  };

  const handleSaveNodeConfig = (config: any) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNodeId ? { ...n, data: { ...n.data, config } } : n
      )
    );
    setOpenConfigDialog(false);
    setSelectedNodeId(null);
    setSelectedNodeName(null);
    setDefaultConfig(null);

    console.log(config);
  };

  const handleDeleteNode = () => {
    setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
    setEdges((eds) =>
      eds.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
      )
    );
    setOpenConfigDialog(false);
    setSelectedNodeId(null);
    setSelectedNodeName(null);
    setDefaultConfig(null);
  };

  const ConfigForm = dynamic<ConfigFormPops>(
    () => import(`./forms/${selectedNodeName}Form`),
    { ssr: false, loading: () => <p>در حال بارگزاری...</p> }
  );

  const { mutate: saveMetadata, isPending } =
    useUpdateRuleChainMetadata(ruleChainId);

  const saveRuleChainMetadata = async () => {
    const payload = toThingsboardMetadata(
      nodes as RuleNode[],
      edges,
      ruleChainId
    );
    const finalData = {
      ruleChainId: {
        entityType: "RULE_CHAIN",
        id: ruleChainId,
      },
      firstNodeIndex: metadata.firstNodeIndex,
      version: metadata.version,
      nodes: payload.nodes,
      connections: payload.connections,
      ruleChainConnections: null,
    };
    saveMetadata(finalData);
  };

  return (
    <div className="h-screen w-full relative">
      <Button
        className="absolute top-4 right-4 z-50"
        onClick={saveRuleChainMetadata}
        disabled={isPending}
      >
        ذخیره تغییرات
      </Button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => {
          const sourceNode = nodes.find((n) => n.id === params.source);
          if (!sourceNode) return;

          const sourceNodeType = sourceNode?.data?.nodeType as NodeType;
          const relations = nodeTypeConfigs[sourceNodeType]?.relations || [];

          if (relations.length > 0) {
            setPendingEdge({ ...params, relations });
            setOpenRelationDialog(true);
          } else {
            // اگه relation خاصی نداشت، مستقیم اضافه کن
            setEdges((eds) =>
              addEdge(
                { ...params, markerEnd: { type: MarkerType.ArrowClosed } },
                eds
              )
            );
          }
        }}
        onNodeClick={(_, node) => handleEditNode(node)}
        onEdgeClick={(_, edge) => {}}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {/* دیالوگ انتخاب نود */}
      <div className="absolute top-4 left-4">
        <Dialog open={openTypeDialog} onOpenChange={setOpenTypeDialog}>
          <DialogTrigger asChild>
            <Button variant="default">افزودن نود</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogTitle className="text-lg font-bold mb-2 mt-6">
              انتخاب نوع نود
            </DialogTitle>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(nodeTypeConfigs).map(([type, config]) => (
                <Button
                  key={type}
                  onClick={() => handleAddNode(type as NodeType)}
                  variant="outline"
                >
                  {config.label}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* دیالوگ کانفیگ نود */}
      {ConfigForm && (
        <Dialog open={openConfigDialog} onOpenChange={setOpenConfigDialog}>
          <DialogContent>
            <DialogTitle className="mt-6">تنظیمات نود</DialogTitle>
            <div className="mb-4">
              <ConfigForm
                defaultValues={defaultConfig}
                onSubmit={handleSaveNodeConfig}
                onDeleteNode={handleDeleteNode}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={openRelationDialog} onOpenChange={setOpenRelationDialog}>
        <DialogContent>
          <DialogTitle>انتخاب Relation</DialogTitle>
          <Select value={selectedRelation} onValueChange={setSelectedRelation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="انتخاب کنید..." />
            </SelectTrigger>
            <SelectContent>
              {pendingEdge?.relations?.map((r: any) => (
                <SelectItem key={r.name} value={r.name}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                if (!selectedRelation) return;
                setEdges((eds) =>
                  addEdge(
                    {
                      ...pendingEdge,
                      label: selectedRelation,
                      markerEnd: { type: MarkerType.ArrowClosed },
                    },
                    eds
                  )
                );
                setPendingEdge(null);
                setSelectedRelation("");
                setOpenRelationDialog(false);
              }}
            >
              تایید
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
