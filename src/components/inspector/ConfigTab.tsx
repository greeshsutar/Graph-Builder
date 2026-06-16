import React from 'react';
import type { ServiceNodeData } from '../../types';
import { useFlowStore } from '../../store/useFlowStore';

interface ConfigTabProps {
  nodeId: string;
}

export const ConfigTab: React.FC<ConfigTabProps> = ({ nodeId }) => {
  const node = useFlowStore((s) => s.nodes.find((n) => n.id === nodeId)) ?? null;
  const updateNode = useFlowStore((s) => s.updateNode);


  if (!node) {
    return <div className="text-zinc-500 text-xs p-4">Loading node configurations...</div>;
  }

  const updateNodeData = (updates: Partial<ServiceNodeData>) => {
    updateNode(nodeId, updates);
  };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData({ label: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeData({ description: e.target.value });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    updateNodeData({ sliderValue: val });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (isNaN(val)) return;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    updateNodeData({ sliderValue: val });
  };

  return (
    <div className="space-y-4 p-4 text-zinc-300 select-none">
      {/* Name Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Service Name</label>
        <input
          type="text"
          value={node.data.label}
          onChange={handleNameChange}
          className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700 transition"
        />
      </div>

      {/* Description Textarea */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Description</label>
        <textarea
          value={node.data.description || ''}
          onChange={handleDescriptionChange}
          placeholder="No description provided."
          rows={3}
          className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 transition resize-none"
        />
      </div>

      {/* Resource Level Slider + Numeric Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Resource Allocated (%)</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="100"
            value={node.data.sliderValue}
            onChange={handleSliderChange}
            className="flex-1 accent-blue-500 bg-zinc-950 h-1 rounded-lg cursor-pointer"
          />
          <input
            type="number"
            min="0"
            max="100"
            value={node.data.sliderValue}
            onChange={handleNumberInputChange}
            className="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-center text-white focus:outline-none focus:border-zinc-700 transition font-mono"
          />
        </div>
      </div>
    </div>
  );
};
