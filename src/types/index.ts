import type { Node, Edge } from '@xyflow/react';

export type AppStatus = 'Healthy' | 'Degraded' | 'Down';

export interface App {
  id: string;
  name: string;
  color: string;
}

export type ServiceNodeData = {
  label: string;
  status: AppStatus;
  sliderValue: number;
  description?: string;
  activeTab?: 'CPU' | 'Memory' | 'Disk' | 'Region';
  [key: string]: unknown;
};

export interface GraphData {
  nodes: Node<ServiceNodeData>[];
  edges: Edge[];
}


