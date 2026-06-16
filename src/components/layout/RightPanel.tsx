import React from 'react';
import { AppList } from '../apps/AppList';
import { NodeInspector } from '../inspector/NodeInspector';
import { useAppStore } from '../../store/useAppStore';

export const RightPanel: React.FC = () => {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);

  return (
    <aside className="w-[320px] border-l border-zinc-900 bg-zinc-950 flex flex-col h-full shrink-0 hidden md:flex">
      <div className="flex-1 flex flex-col min-h-0">
        {selectedNodeId ? (
          <NodeInspector />
        ) : (
          <AppList />
        )}
      </div>
    </aside>
  );
};