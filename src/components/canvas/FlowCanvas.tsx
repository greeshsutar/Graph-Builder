import React, { useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow
} from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useGraph } from '../../api/useGraph';
import { useAppStore } from '../../store/useAppStore';
import { useFlowStore } from '../../store/useFlowStore';
import { ServiceNode } from './nodes/ServiceNode';
import type { ServiceNodeData } from '../../types';
import { AlertCircle, Network, RefreshCw } from 'lucide-react';

const nodeTypes = { service: ServiceNode };

export const FlowCanvas: React.FC = () => {
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);

  const { data, isLoading, error, refetch, isFetching } = useGraph(selectedAppId);
  const { fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<ServiceNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const setFlowNodes = useFlowStore((s) => s.setNodes);
  const setFlowEdges = useFlowStore((s) => s.setEdges);
  const storeNodes = useFlowStore((s) => s.nodes);

  // Load graph data into ReactFlow + Zustand once
  useEffect(() => {
    if (!data) return;
    const n = data.nodes || [];
    const e = data.edges || [];
    setNodes(n);
    setEdges(e);
    setFlowNodes(n);
    setFlowEdges(e);
    setTimeout(() => fitView({ duration: 500, padding: 0.2 }), 150);
  }, [data]);

  // Inspector edits → sync to ReactFlow
  // Only run when storeNodes changes FROM inspector (not from API load)
  const storeNodesStr = JSON.stringify(storeNodes.map(n => n.data));
  useEffect(() => {
    if (storeNodes.length === 0) return;
    setNodes((prev) =>
      prev.map((n) => {
        const updated = storeNodes.find((s) => s.id === n.id);
        return updated ? { ...n, data: updated.data } : n;
      })
    );
  }, [storeNodesStr]);

  // Fit view listener
  useEffect(() => {
    const handler = () => fitView({ duration: 400, padding: 0.15 });
    window.addEventListener('reactflow-fit-view', handler);
    return () => window.removeEventListener('reactflow-fit-view', handler);
  }, [fitView]);

  const handleNodesDelete = useCallback((deleted: Node<ServiceNodeData>[]) => {
    if (deleted.some((n) => n.id === selectedNodeId)) {
      setSelectedNodeId(null);
    }
  }, [selectedNodeId, setSelectedNodeId]);

  if (!selectedAppId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 select-none p-6 text-center">
        <div className="border border-zinc-800 p-4 rounded-2xl bg-zinc-900/25 mb-4 text-zinc-600 animate-pulse">
          <Network className="w-12 h-12" />
        </div>
        <p className="text-sm font-bold text-zinc-300">No Application Selected</p>
        <p className="text-xs text-zinc-500 mt-1.5 max-w-[280px]">
          Please select an application database stack in the right sidebar list to load and inspect its network topologies.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 select-none p-6">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-3" />
        <p className="text-xs font-semibold text-zinc-400">Loading Topology...</p>
        <p className="text-[10px] text-zinc-600 mt-1 font-mono">Fetching application dependency data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 select-none p-6 text-center gap-4">
        <div className="text-red-500 bg-red-500/10 border border-red-500/20 p-3.5 rounded-full">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-zinc-300">Topology Fetch Failure</p>
          <p className="text-xs text-zinc-500 max-w-[320px]">
            Simulated error occurred (20% random error threshold triggered).
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 text-xs bg-blue-600 hover:bg-blue-500 active:scale-95 text-white border border-blue-700 rounded-md font-semibold transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 relative h-full bg-zinc-950 text-white min-w-0">
      {isFetching && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-md text-[10px] font-semibold text-blue-400 shadow-md">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Refreshing cache...</span>
        </div>
      )}
      <ReactFlow<Node<ServiceNodeData>, Edge>
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={handleNodesDelete}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          setFlowNodes(nodes);
        }}
        onPaneClick={() => setSelectedNodeId(null)}
        deleteKeyCode={['Backspace', 'Delete']}
        fitViewOptions={{ padding: 0.2 }}
        className="w-full h-full"
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#27272a" />
        <Controls className="!bg-zinc-900 !border-zinc-800 !shadow-lg [&>button]:!bg-zinc-900 [&>button]:!border-zinc-800 [&>button]:!text-zinc-400 hover:[&>button]:!text-white hover:[&>button]:!bg-zinc-800 [&>svg]:!fill-zinc-400" />
        <MiniMap
          style={{ height: 100, width: 150 }}
          className="!bg-zinc-950 !border-zinc-800 rounded-lg overflow-hidden [&>.react-flow__minimap-mask]:!fill-zinc-900/80 [&>.react-flow__minimap-node]:!fill-zinc-800"
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};