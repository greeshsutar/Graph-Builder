import React from 'react';
import { Menu, Maximize, Moon, Network } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const TopBar: React.FC = () => {
  const toggleMobilePanel = useAppStore((state) => state.toggleMobilePanel);
  const selectedAppId = useAppStore((state) => state.selectedAppId);

  const triggerFitView = () => {
    window.dispatchEvent(new Event('reactflow-fit-view'));
  };

  return (
    <header className="h-12 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between px-4 select-none z-30 shrink-0">
      {/* Brand area */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleMobilePanel(true)}
          className="md:hidden text-zinc-400 hover:text-white p-1 hover:bg-zinc-900 rounded transition"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-white font-medium">
          <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
            <Network className="w-4 h-4 text-white" />
          </div>
          <span className="tracking-wide text-sm font-semibold">Ainyx Graph Builder</span>
          {selectedAppId && (
            <span className="hidden sm:inline text-xs bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-mono">
              {selectedAppId}
            </span>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={triggerFitView}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md font-medium transition active:scale-95"
          title="Align Graph to Center"
        >
          <Maximize className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fit View</span>
        </button>

        <button
          className="p-1.5 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-md transition"
          title="Theme Toggle (Dark Mode Forced)"
        >
          <Moon className="w-4 h-4 text-blue-400" />
        </button>
      </div>
    </header>
  );
};
