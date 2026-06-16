import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useFlowStore } from '../../store/useFlowStore';
import { StatusPill } from './StatusPill';
import { ConfigTab } from './ConfigTab';
import { RuntimeTab } from './RuntimeTab';
import { Settings, Activity, Sliders } from 'lucide-react';

export const NodeInspector: React.FC = () => {
  const selectedNodeId = useAppStore((state) => state.selectedNodeId);
  const activeTab = useAppStore((state) => state.activeInspectorTab);
  const setActiveTab = useAppStore((state) => state.setActiveTab);
  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId);

  const nodes = useFlowStore((s) => s.nodes);
  const node = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null;


  if (!selectedNodeId || !node) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none text-zinc-500">
        <div className="border border-dashed border-zinc-800 p-4 rounded-full bg-zinc-950 mb-3 text-zinc-600 animate-pulse">
          <Sliders className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold text-zinc-400">No Node Selected</p>
        <p className="text-[11px] text-zinc-600 mt-1 max-w-[200px]">
          Click on any service node in the canvas to view configurations and real-time statistics.
        </p>
      </div>
    );
  }


  return (
    <div className="flex-1 flex flex-col min-h-0 bg-zinc-900/10 border-t border-zinc-900">
      {/* Node Header */}
      <div className="p-4 border-b border-zinc-900 flex items-center justify-between select-none">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold font-mono text-zinc-200">{node.data.label}</span>
          <span className="text-[10px] text-zinc-500 font-mono">ID: {node.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={node.data.status} />
          <button
            onClick={() => setSelectedNodeId(null)}
            className="text-xs text-zinc-500 hover:text-zinc-300 font-semibold px-2 py-1 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 rounded transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Tabs Headers */}
      <div className="flex border-b border-zinc-900 bg-zinc-950 p-1">
        <button
          onClick={() => setActiveTab('config')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === 'config'
            ? 'bg-zinc-900 text-blue-400 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
            }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Config</span>
        </button>
        <button
          onClick={() => setActiveTab('runtime')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === 'runtime'
            ? 'bg-zinc-900 text-blue-400 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
            }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Runtime</span>
        </button>
      </div>

      {/* Tabs Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'config' ? (
          <ConfigTab nodeId={selectedNodeId} />
        ) : (
          <RuntimeTab nodeId={selectedNodeId} />
        )}
      </div>
    </div>
  );
};
