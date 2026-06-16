import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { AppList } from '../apps/AppList';
import { NodeInspector } from '../inspector/NodeInspector';
import { X } from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const isOpen = useAppStore((state) => state.isMobilePanelOpen);
  const toggleMobilePanel = useAppStore((state) => state.toggleMobilePanel);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end md:hidden">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={() => toggleMobilePanel(false)}
      />
      
      {/* Drawer content body */}
      <div className="relative w-[320px] max-w-[85vw] h-full bg-zinc-950 border-l border-zinc-900 shadow-2xl flex flex-col z-10">
        <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-900 bg-zinc-950 select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Navigation Panel</span>
          <button
            onClick={() => toggleMobilePanel(false)}
            className="text-zinc-400 hover:text-white p-1 hover:bg-zinc-900 rounded transition"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <AppList />
          <div className="flex-1 flex flex-col min-h-[300px]">
            <NodeInspector />
          </div>
        </div>
      </div>
    </div>
  );
};
