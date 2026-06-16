import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import type { ServiceNodeData } from '../../../types';
import { Database, Server, Leaf, Cpu, Key, Settings, AlertCircle, CheckCircle2 } from 'lucide-react';

const getServiceDetails = (label: string) => {
  const name = label.toLowerCase();
  if (name.includes('postgres')) {
    return {
      Icon: Database,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-950/40 border-blue-900/50',
    };
  } else if (name.includes('redis')) {
    return {
      Icon: Server,
      iconColor: 'text-red-400',
      bgColor: 'bg-red-950/40 border-red-900/50',
    };
  } else if (name.includes('mongodb') || name.includes('mongo')) {
    return {
      Icon: Leaf,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-900/50',
    };
  } else if (name.includes('gateway')) {
    return {
      Icon: Cpu,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-950/40 border-indigo-900/50',
    };
  } else {
    return {
      Icon: Key,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-900/50',
    };
  }
};

type ServiceNodeProps = NodeProps<Node<ServiceNodeData>>;

export const ServiceNode: React.FC<ServiceNodeProps> = ({ data, selected }) => {
  const [activeSubTab, setActiveSubTab] = useState<'CPU' | 'Memory' | 'Disk' | 'Region'>('CPU');
  
  const { Icon, iconColor, bgColor } = getServiceDetails(data.label);
  
  const sliderVal = data.sliderValue;
  const isHealthy = data.status === 'Healthy';

  // Calculate resources displays
  const cpuVal = (sliderVal / 100).toFixed(2);
  const memVal = `${(sliderVal * 0.05).toFixed(2)} GB`;
  const diskVal = `${(sliderVal * 0.5 + 5).toFixed(2)} GB`;
  const regionVal = '1';

  // Active resource slider tracking percentage
  let activeSliderPercent = sliderVal;
  if (activeSubTab === 'Memory') {
    activeSliderPercent = Math.min(100, Math.round((sliderVal * 0.05 / 5) * 100));
  } else if (activeSubTab === 'Disk') {
    activeSliderPercent = Math.min(100, Math.round(( (sliderVal * 0.5 + 5) / 100) * 100));
  } else if (activeSubTab === 'Region') {
    activeSliderPercent = 100;
  }

  return (
    <div className={`w-[260px] bg-zinc-950 border rounded-xl p-3 shadow-2xl transition-all select-none ${
      selected 
        ? 'border-blue-500 ring-2 ring-blue-500/25' 
        : 'border-zinc-800/80 hover:border-zinc-700'
    }`}>
      {/* Target handle on the left */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2.5 h-2.5 bg-zinc-700 border-2 border-zinc-950 rounded-full hover:bg-blue-400 transition"
      />

      {/* Header section */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg border ${bgColor}`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <span className="text-xs font-bold font-mono text-zinc-100">{data.label}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
            $0.03/HR
          </span>
          <button className="text-zinc-500 hover:text-zinc-300 p-0.5 transition rounded hover:bg-zinc-900">
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Numeric values row */}
      <div className="grid grid-cols-4 text-center text-[9px] text-zinc-500 font-semibold font-mono mt-3 mb-1">
        <div className={activeSubTab === 'CPU' ? 'text-zinc-200' : ''}>{cpuVal}</div>
        <div className={activeSubTab === 'Memory' ? 'text-zinc-200' : ''}>{memVal}</div>
        <div className={activeSubTab === 'Disk' ? 'text-zinc-200' : ''}>{diskVal}</div>
        <div className={activeSubTab === 'Region' ? 'text-zinc-200' : ''}>{regionVal}</div>
      </div>

      {/* Resource tabs selectors */}
      <div className="grid grid-cols-4 bg-zinc-900/40 p-0.5 border border-zinc-900 rounded-lg text-[8px] font-bold text-zinc-500">
        <button
          onClick={() => setActiveSubTab('CPU')}
          className={`py-1 rounded-md transition ${activeSubTab === 'CPU' ? 'bg-zinc-900 text-white shadow-sm border border-zinc-800' : 'hover:text-zinc-300'}`}
        >
          CPU
        </button>
        <button
          onClick={() => setActiveSubTab('Memory')}
          className={`py-1 rounded-md transition ${activeSubTab === 'Memory' ? 'bg-zinc-900 text-white shadow-sm border border-zinc-800' : 'hover:text-zinc-300'}`}
        >
          Memory
        </button>
        <button
          onClick={() => setActiveSubTab('Disk')}
          className={`py-1 rounded-md transition ${activeSubTab === 'Disk' ? 'bg-zinc-900 text-white shadow-sm border border-zinc-800' : 'hover:text-zinc-300'}`}
        >
          Disk
        </button>
        <button
          onClick={() => setActiveSubTab('Region')}
          className={`py-1 rounded-md transition ${activeSubTab === 'Region' ? 'bg-zinc-900 text-white shadow-sm border border-zinc-800' : 'hover:text-zinc-300'}`}
        >
          Region
        </button>
      </div>

      {/* Custom styled slider gradient track */}
      <div className="relative w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-red-500 rounded-full mt-3">
        <div
          className="absolute w-2.5 h-2.5 bg-white rounded-full border border-zinc-800 -top-0.75 shadow transform -translate-x-1/2"
          style={{ left: `${activeSliderPercent}%` }}
        />
      </div>

      {/* Footer info section */}
      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-zinc-900">
        {/* Status indicator */}
        {isHealthy ? (
          <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Success</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[9px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span>Error</span>
          </div>
        )}

        {/* AWS Logo decoration */}
        <div className="flex flex-col items-end opacity-80" title="AWS Infrastructure">
          <span className="text-[9px] font-bold tracking-tighter text-zinc-400 font-mono">
            aws
          </span>
          <div className="w-5 h-1 border-b border-orange-500 rounded-b-lg -mt-1 transform scale-y-[0.3]" />
        </div>
      </div>

      {/* Source handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2.5 h-2.5 bg-zinc-700 border-2 border-zinc-950 rounded-full hover:bg-blue-400 transition"
      />
    </div>
  );
};
