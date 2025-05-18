"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Node,
  useNodesState,
  useEdgesState,
  MarkerType,
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
import { RuleNode } from "@/lib/types";
import { NodeType, nodeTypeConfigs } from "./ui/form/nodeTypes";
import ContextMenu from "./ContextMenu";
import { GoPlus } from "react-icons/go";
import { IoHelpSharp } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { useModal } from "@/hooks/useModal";
import { PuffLoader } from "react-spinners";

const initialNodes: Node[] = [
  {
    id: "start",
    type: "default",
    position: { x: 100, y: 100 },
    data: { label: "Start Node" },
  },
];

interface NodeGraphEditorProps {
  ruleChainId: string;
}

export function NodeGraphEditor({ ruleChainId }: NodeGraphEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu]: any = useState(null);
  const [edgeId, setEdgeId] = useState<string>("");
  const [connections, setConnections] = useState<Array<Object>>([]);

  const {
    isOpen: edgeOpen,
    openModal: openEdge,
    closeModal: closeEdge,
  } = useModal();

  const onNodeContextMenu = useCallback(
    (event: any, node: any) => {
      event.preventDefault();

      if (node?.data?.label === "Start Node" || node?.data?.label === "Start") {
        // اگه Start Node بود اصلا کاری نکن
        return;
      }

      if (!ref.current) return;

      const pane = ref.current.getBoundingClientRect();

      setMenu({
        id: node.id,
        name: node.data.label,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu]
  );

  const onEdgeContextMenu = useCallback((event: any, edge: any) => {
    event.preventDefault();

    if (edge.source === "start-node") return;

    setEdgeId(edge.id);
    openEdge();
  }, []);

  const onPaneClick = useCallback(() => {
    setMenu(null);
  }, [setMenu]);

  const [newNodes, setNewNodes] = useState<CustomNode[]>([]);

  const { data: metadata } = useRuleChainMetadata(ruleChainId);
  // console.log(metadata)
  console.log("Nodes" + nodes);

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
          type: "default",
          position: {
            x: node.additionalInfo?.layoutX || 0,
            y: node.additionalInfo?.layoutY || 0,
          },
          data: {
            label: node.name,
            raw: node,
          },
        })),
      ];

      const parsedEdges = metadata.connections !== null ? [
        metadata.firstNodeIndex !== null && {
          id: `e-start-node`,
          source: "start-node",
          target: metadata.nodes[metadata.firstNodeIndex].id.id,
          type: "floating",
          animated: true,
          label: "",
        },
        ...metadata.connections.map((conn: any) => ({
          id: `e${metadata.nodes[conn.fromIndex].id.id}-${
            metadata.nodes[conn.toIndex].id.id
          }`,
          source: metadata.nodes[conn.fromIndex].id.id,
          target: metadata.nodes[conn.toIndex].id.id,
          type: "floating",
          animated: true,
          label: conn.type,
        })),
      ] : [];

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
      // console.log(params);
      const from = params.source!;
      const to = params.target!;

      // if (willCreateLoop(from, to, nodes, edges)) {
      //   toast.error("اتصال ایجاد شده باعث حلقه می‌شود!");
      //   return;
      // }

      console.log(from);

      const node = nodes.filter((node) => node.id === from && node);
      console.log(node)
      // const nodeType = Object.entries(nodeTypeConfigs).filter((n) => n[0] === node[0].data.raw.type)
      // console.log(nodeType)

      // setConnections(nodeType[0][1].relations)

      
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

  const addNewNode = () => {
    const id = uuidv4();
    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: `Node ${prev.length}` },
      },
    ]);
  };

  const handleAddNode = (type: NodeType, config: Record<string, any>) => {
    const id = uuidv4();

    setNodes((prev) => [
      ...prev,
      {
        id,
        type: "default",
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          label: nodeTypeConfigs[type]?.label || "Custom Node",
          row: {
            type,
          },
          config,
        },
      },
    ]);

    setNewNodes((prev: any) => [
      ...prev,
      {
        id,
        type: "default",
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: {
          label: nodeTypeConfigs[type]?.label || "Custom Node",
          type,
          config,
        },
      },
    ]);

    setIsModalOpen(false); // مودال بسته بشه
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
    // console.log(finalData);
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

  return (
    <div className="w-full h-full relative" ref={ref}>
      <div className="w-full flex items-center gap-4 h-20 absolute pr-6">
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
        <MiniMap />
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
      <Popup isOpen={isOpen} onClose={closeModal}>
        <div className="w-full rounded-md bg-white p-4 flex flex-col items-start space-y-4">
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
      </Popup>
      <Popup isOpen={edgeOpen} onClose={closeEdge}>
        <div className="min-w-[600px] rounded-md bg-white p-4 flex flex-col items-start space-y-4">
          <h2 className="text-lg font-semibold">ویرایش یا حذف اتصال</h2>
          <div className="w-full flex items-center gap-4">
            <select
              name=""
              id=""
              className="w-full flex-1 px-4 py-2 rounded-lg border border-gray-300"
              onChange={(event: any) => {
                const edge = edges.filter((edge) => edge.id === edgeId);
                edge[0].label = event.target.value;
                // console.log(edge)
                // setEdgeLabel(event.target.value);
                closeEdge();
              }}
            >
              {connections.map((con: any, index: number) => (<option key={index} value={con.label}>{con.label}</option>))}
            </select>
            <button
              onClick={deleteEdge}
              className="bg-rose-600 rounded-lg px-4 py-3 w-40 text-white"
            >
              حذف اتصال
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
