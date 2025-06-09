"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  Connection,
  Node,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import {
  CustomNode,
  prepareRuleChainForServer,
  willCreateLoop,
} from "@/lib/utils";
import toast from "react-hot-toast";
import Popup from "@/components/Popup";
import ChangeRuleChainForm from "./ui/form/ChangeRuleChainFor";
import {
  useRuleChainMetadata,
  useUpdateRuleChainMetadata,
} from "@/hooks/useRuleChains";
import { NodeType, nodeTypeConfigs } from "./ui/form/nodeTypes";
import ContextMenu from "./ContextMenu";
import { GoPlus } from "react-icons/go";
import { IoHelpSharp } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useModal } from "@/hooks/useModal";
import { PuffLoader } from "react-spinners";
import { Modal } from "@/components/Modal";
import RuleNodeForm from "./ui/form/RuleNodeForm";

interface NodeGraphEditorProps {
  ruleChainId: string;
}

export function NodeGraphEditor({ ruleChainId }: NodeGraphEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu]: any = useState(null);
  const [edgeId, setEdgeId] = useState<string>("");
  const [nodeId, setNodeId] = useState<string>("");
  const [connections, setConnections] = useState<Array<Object>>([]);
  const [edgeLabel, setEdgeLabel] = useState("");

  const [node, setNode] = useState<Node>();
  const [config, setConfig] = useState<Record<string, any>>(
    node?.data.raw.configuration || {}
  );

  const {
    isOpen: edgeOpen,
    openModal: openEdge,
    closeModal: closeEdge,
  } = useModal();

  const {
    isOpen: menuOpen,
    openModal: openMenu,
    closeModal: closeMenu,
  } = useModal();

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      event.preventDefault();

      if (node?.data?.label === "Start Node" || node?.data?.label === "Start") {
        return;
      }

      setNode(node);
      setNodeId(node.id);
      setConfig(node?.data.raw.configuration || {});

      openMenu();
    },
    [setMenu, config, setConfig, node]
  );

  const onEdgeContextMenu = useCallback(
    (event: any, edge: any) => {
      event.preventDefault();

      if (edge.source === "start-node") return;
      const from = edge.source;
      console.log(from);
      nodes.map((node: Node) => {
        node.id == from && setConnections(node.data.relations);
      });

      setEdgeId(edge.id);
      openEdge();
    },
    [nodes]
  );

  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, [setMenu]);

  const { data: metadata } = useRuleChainMetadata(ruleChainId);
  console.log(metadata);

  useEffect(() => {
    const fetchAndParse = async () => {
      const parsedNodes = [
        {
          id: "start-node",
          type: "input",
          position: { x: 50, y: 50 },
          data: { label: "Start" },
          draggable: false,
          deletable: false,
          style: {
            backgroundColor: "#0094e3", // آبی تیره (tailwind: bg-blue-600)
            color: "white",
            border: "1px solid #ffffff",
          },
        },
        ...metadata.nodes.map((node: any) => ({
          id: node.id.id,
          type: node.type,
          position: {
            x: node.additionalInfo?.layoutX || 0,
            y: node.additionalInfo?.layoutY || 0,
          },
          data: {
            label: node.name,
            raw: node,
            relations: nodeTypeConfigs[node.type as NodeType]?.relations ?? [],
          },
          className: "bg-white dark:bg-gray-600 dark:text-white",
        })),
      ];

      const parsedEdges = [];

      if (metadata.firstNodeIndex !== null) {
        parsedEdges.push({
          id: `e-start-node`,
          source: "start-node",
          target: metadata.nodes[metadata.firstNodeIndex].id.id,
          type: "floating",
          animated: true,
          label: "",
        });
      }

      const connectionMap = new Map<string, string[]>();

      metadata.connections?.forEach((conn: any) => {
        const key = `${conn.fromIndex}-${conn.toIndex}`;
        if (!connectionMap.has(key)) {
          connectionMap.set(key, []);
        }
        connectionMap.get(key)!.push(conn.type);
      });

      connectionMap.forEach((labels, key) => {
        const [fromIndex, toIndex] = key.split("-").map(Number);
        parsedEdges.push({
          id: `e${metadata.nodes[fromIndex].id.id}-${metadata.nodes[toIndex].id.id}`,
          source: metadata.nodes[fromIndex].id.id,
          target: metadata.nodes[toIndex].id.id,
          type: "floating",
          animated: true,
          label: labels.join(" | "),
        });
      });

      setNodes(parsedNodes);
      setEdges(parsedEdges);
    };

    if (metadata) {
      fetchAndParse();
    }
  }, [metadata]);

  // console.log(nodes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      const from = params.source!;
      const to = params.target!;

      // if (willCreateLoop(from, to, nodes, edges)) {
      //   toast.error("اتصال ایجاد شده باعث حلقه می‌شود!");
      //   return;
      // }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            label: params.source === "start-node" ? "" : "label",
            style: { stroke: "#4f46e5" },
          },
          eds
        )
      );
    },
    [nodes, edges]
  );

  const handleAddNode = (type: NodeType, config: Record<string, any>) => {
    const id = uuidv4();

    console.log(config);

    setNodes((prev) => [
      ...prev,
      {
        id,
        type: type,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          label: nodeTypeConfigs[type]?.label || "Custom Node",
          relations: nodeTypeConfigs[type as NodeType]?.relations ?? [],
          row: {
            type,
          },
          config,
        },
      },
    ]);

    setIsModalOpen(false); // مودال بسته بشه
  };

  const updateNodeConfig = (nodeId: string, newConfig: any) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                configuratin: {
                  ...node.data?.configuratin,
                  ...newConfig,
                },
              },
            }
          : node
      )
    );
  };

  const { mutate: saveMetadata, isPending } =
    useUpdateRuleChainMetadata(ruleChainId);

  const handleEditClick = () => {
    // const updatedJson = createFinalJson(newNodes, [], metadata);
    // console.log(JSON.stringify(updatedJson, null, 2));
    // toast.error("خطا در برقراری ارتباط با سرور");
    // const finalJson = createFinalJson(nodes, edges, metadata);
    const finalJson = prepareRuleChainForServer(nodes, edges, ruleChainId);
    const finalData = {
      ruleChainId: metadata.ruleChainId,
      firstNodeIndex: metadata.firstNodeIndex,
      version: metadata.version,
      nodes: finalJson.metaData.nodes,
      connections: finalJson.metaData.connections,
      ruleChainConnections: finalJson.ruleChainConnections,
    };
    console.log(finalData);
    saveMetadata(finalData);
  };

  const { isOpen, openModal, closeModal } = useModal();

  const deleteEdge = useCallback(
    (event: any) => {
      event.preventDefault();

      setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
      closeEdge();
    },
    [edgeId]
  );

  const deleteNode = useCallback(
    (event: any) => {
      event.preventDefault();

      // حذف نود
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));

      // حذف تمام edgeهایی که به نود متصل هستن
      setEdges((edges) =>
        edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );

      closeMenu();
    },
    [nodeId]
  );

  return (
    <div className="w-full h-full relative" ref={ref}>
      <div className="w-full flex items-center gap-4 h-20 absolute pr-6 z-[500]">
        <button
          onClick={openModal}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 top-2 left-2 bg-blue-500 text-white"
        >
          <IoHelpSharp size={20} />
        </button>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 top-2 left-2 bg-rose-500 text-white"
        >
          <GoPlus size={20} />
        </button>

        <button
          onClick={handleEditClick}
          disabled={isPending}
          className={`w-12 h-12 rounded-full flex items-center justify-center z-10 top-2 left-2 text-white ${
            isPending ? "cursor-not-allowed bg-amber-300" : "bg-amber-500"
          }`}
        >
          {isPending ? (
            <PuffLoader color="#ffffff" size={30} />
          ) : (
            <IoCheckmarkOutline size={20} />
          )}
        </button>
      </div>

      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="absolute inset-0"
        onPaneClick={onPaneClick}
        onNodeClick={onNodeContextMenu}
        onEdgeClick={onEdgeContextMenu}
      >
        {/* <MiniMap /> */}
        <Controls />
        <Background />
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
      </ReactFlow>
      <Popup
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          // addNewNode();
        }}
      >
        <ChangeRuleChainForm onSubmit={handleAddNode} />
      </Popup>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        showCloseButton={true}
        className="max-w-[700px]"
      >
        <div className="w-full rounded-md bg-white dark:bg-gray-700 p-4 flex flex-col items-start space-y-4 pt-20 pr-8">
          <h2 className="text-lg font-semibold">
            راهنمای استفاده از گراف زنجیره قواعد:
          </h2>
          <p>1- از دکمه (+) برای افزودن نود های جدید استفاده کنید.</p>
          <p>2- از دکمه (تیک) برای ذخیره تغییرات استفاده کنید.</p>
          <p>
            3- در فرم افزودن نود میتوانید تنظیمات مخصوص هر نود را تعیین کنید.
          </p>
          <p>
            4- با کلیک روی نود ها و اتصالات میتوانید آنهارا ویرایش یا حذف کنید.
          </p>
          <p>5- نود شروع غیر قابل حذف یا ویرایش می باشد.</p>
        </div>
      </Modal>
      <Modal
        isOpen={edgeOpen}
        onClose={closeEdge}
        className="max-w-[600px]"
        showCloseButton={false}
      >
        <div className="w-full rounded-md bg-white dark:bg-gray-700 p-4 flex flex-col items-start space-y-4">
          <h2 className="text-lg font-semibold">ویرایش یا حذف اتصال</h2>
          <div className="w-full flex items-center gap-4">
            <select
              name=""
              id=""
              className="w-full flex-1 px-4 py-2 rounded-lg border dark:bg-gray-700 border-gray-300"
              onChange={(event: any) => {
                const edge = edges.filter((edge) => edge.id === edgeId);
                edge[0].label = event.target.value;
                // console.log(edge)
                closeEdge();
              }}
            >
              {connections.map((con: any, index: number) => (
                <option key={index} value={con.label}>
                  {con.label}
                </option>
              ))}
            </select>
            <button
              onClick={deleteEdge}
              className="bg-rose-600 rounded-lg px-4 py-3 w-40 text-white"
            >
              حذف اتصال
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={menuOpen}
        onClose={closeMenu}
        showCloseButton={false}
        className="max-w-[600px]"
      >
        <div className="w-full rounded-md bg-white dark:bg-gray-700 p-4 flex flex-col items-start space-y-4">
          <h2 className="text-lg font-semibold">ویرایش یا حذف نود</h2>
          <RuleNodeForm
            nodeType={node?.type as NodeType}
            value={config}
            onChange={(newConfig) => {
              setConfig(newConfig); // 👈 این باعث ری‌رن میشه
              // console.log(newConfig);
            }}
          />

          <button
            className="w-64 px-4 py-2 rounded-md bg-blue-500 text-white text-center"
            onClick={() => {
              updateNodeConfig(node!.id, config);
              closeMenu();
            }}
          >
            ذخیره تغییرات
          </button>

          <button
            className="w-64 px-4 py-2 rounded-md bg-rose-500 text-white text-center"
            onClick={deleteNode}
          >
            حذف نود
          </button>
        </div>
      </Modal>
    </div>
  );
}
