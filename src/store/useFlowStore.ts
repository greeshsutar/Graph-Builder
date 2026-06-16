import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';
import type { ServiceNodeData } from '../types';

interface FlowStore {
    nodes: Node<ServiceNodeData>[];
    edges: Edge[];
    setNodes: (nodes: Node<ServiceNodeData>[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNode: (nodeId: string, updates: Partial<ServiceNodeData>) => void;
}

export const useFlowStore = create<FlowStore>((set) => ({
    nodes: [],
    edges: [],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
    updateNode: (nodeId, updates) =>
        set((state) => ({
            nodes: state.nodes.map((n) =>
                n.id === nodeId
                    ? {
                        ...n,
                        data: {
                            ...n.data,
                            ...updates,
                        },
                    }
                    : n
            ),
        })),
}));

