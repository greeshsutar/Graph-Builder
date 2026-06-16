import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from './components/layout/TopBar';
import { LeftRail } from './components/layout/LeftRail';
import { RightPanel } from './components/layout/RightPanel';
import { MobileDrawer } from './components/layout/MobileDrawer';
import { FlowCanvas } from './components/canvas/FlowCanvas';

// Create TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false, // Turn off automatic query retries to let manual retry buttons execute
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-white select-none">
        {/* Navigation Top Header */}
        <TopBar />

        {/* Primary Layout Body */}
        <div className="flex-1 flex min-h-0 overflow-hidden relative">
          <LeftRail />
          
          {/* ReactFlow Canvas container wrapped inside provider */}
          <ReactFlowProvider>
            <FlowCanvas />
          </ReactFlowProvider>
          
          <RightPanel />
        </div>

        {/* Sliding Panel Drawer Overlay for Mobile/Tablet sizes */}
        <MobileDrawer />
      </div>
    </QueryClientProvider>
  );
}
