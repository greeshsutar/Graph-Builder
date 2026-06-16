import { create } from 'zustand';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: 'config' | 'runtime';
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  toggleMobilePanel: (open: boolean) => void;
  setActiveTab: (tab: 'config' | 'runtime') => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  setSelectedAppId: (id) => set({ selectedAppId: id, selectedNodeId: null, isMobilePanelOpen: false }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  toggleMobilePanel: (open) => set({ isMobilePanelOpen: open }),
  setActiveTab: (tab) => set({ activeInspectorTab: tab }),
}));
