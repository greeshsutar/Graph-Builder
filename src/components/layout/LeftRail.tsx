import React from 'react';
import { GitBranch, Database, Layers, Cpu, Settings, HardDrive, Share2 } from 'lucide-react';

export const LeftRail: React.FC = () => {
  return (
    <aside className="w-[60px] bg-zinc-950 border-r border-zinc-900 flex flex-col items-center py-4 justify-between select-none shrink-0 hidden sm:flex">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-zinc-900 rounded-lg"
          title="GitHub Repository"
        >
          <GitBranch className="w-5 h-5" />
        </a>

        <div className="w-8 h-[1px] bg-zinc-900" />

        <button
          className="text-blue-500 bg-blue-500/10 p-2 rounded-lg"
          title="Architecture Canvas"
        >
          <Layers className="w-5 h-5" />
        </button>

        <button
          className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
          title="Database Clusters"
        >
          <Database className="w-5 h-5" />
        </button>

        <button
          className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
          title="Compute Instances"
        >
          <Cpu className="w-5 h-5" />
        </button>

        <button
          className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
          title="Storage Volumes"
        >
          <HardDrive className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-4">
        <button
          className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
          title="Share Topology"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button
          className="text-zinc-500 hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-lg"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
