import React from 'react';
import { AppList } from '../apps/AppList';
import { NodeInspector } from '../inspector/NodeInspector';

export const RightPanel: React.FC = () => {
  return (
    <aside className="w-[320px] border-l border-zinc-900 bg-zinc-950 flex flex-col h-full shrink-0 hidden md:flex">
      <div className="flex-1 flex flex-col min-h-0">
        <AppList />
        <NodeInspector />
      </div>
    </aside>
  );
};
