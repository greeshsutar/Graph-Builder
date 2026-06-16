import React from 'react';

import { useFlowStore } from '../../store/useFlowStore';
import { Clock, Cpu, HardDrive, Activity } from 'lucide-react';



interface RuntimeTabProps {
  nodeId: string;
}

export const RuntimeTab: React.FC<RuntimeTabProps> = ({ nodeId }) => {
  const node = useFlowStore((s) => s.nodes.find((n) => n.id === nodeId)) ?? null;

  if (!node) {
    return <div className="text-zinc-500 text-xs p-4">Loading runtime statistics...</div>;
  }


  const sliderVal = node.data.sliderValue;
  // Calculate dynamic stats from slider value to make UI feel alive
  const cpuPercent = Math.max(2, sliderVal);
  const memUsed = Math.max(16, Math.round(sliderVal * 7.8));
  const memMax = 1024;
  const memPercent = Math.round((memUsed / memMax) * 100);
  const ioRate = (sliderVal * 0.45).toFixed(1);

  return (
    <div className="space-y-4 p-4 text-zinc-300 select-none">
      {/* Uptime Stat */}
      <div className="flex items-center justify-between p-2.5 rounded bg-zinc-950 border border-zinc-900">
        <div className="flex items-center gap-2 text-zinc-400">
          <Clock className="w-4 h-4 text-emerald-500" />
          <span className="text-xs">Uptime</span>
        </div>
        <span className="text-xs font-semibold text-white font-mono">14 days, 6 hours, 32 mins</span>
      </div>

      {/* CPU Usage */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>CPU Usage</span>
          </div>
          <span className="font-semibold text-white font-mono">{cpuPercent}%</span>
        </div>
        <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${cpuPercent}%` }}
          />
        </div>
      </div>

      {/* Memory Usage */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <HardDrive className="w-3.5 h-3.5 text-purple-400" />
            <span>Memory (RAM)</span>
          </div>
          <span className="font-semibold text-white font-mono">{memUsed} MB / {memMax} MB</span>
        </div>
        <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900 overflow-hidden">
          <div
            className="bg-purple-500 h-full transition-all duration-300"
            style={{ width: `${memPercent}%` }}
          />
        </div>
      </div>

      {/* Network IO */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-orange-400" />
            <span>Network I/O Rate</span>
          </div>
          <span className="font-semibold text-white font-mono">{ioRate} MB/s</span>
        </div>
        <div className="w-full bg-zinc-950 rounded-full h-1.5 border border-zinc-900 overflow-hidden">
          <div
            className="bg-orange-500 h-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.round(Number(ioRate) * 2))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
