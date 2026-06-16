import { http, HttpResponse, delay } from 'msw';
import type { App, GraphData } from '../types';

const APPS_MOCK: App[] = [
  { id: 'supertokens-golang', name: 'supertokens-golang', color: '#6366f1' },
  { id: 'supertokens-java', name: 'supertokens-java', color: '#a855f7' },
  { id: 'supertokens-python', name: 'supertokens-python', color: '#ef4444' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', color: '#ec4899' },
  { id: 'supertokens-go', name: 'supertokens-go', color: '#8b5cf6' }
];

const GRAPHS_MOCK: Record<string, GraphData> = {
  'supertokens-golang': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 150, y: 150 },
        data: { label: 'API Gateway', status: 'Healthy', sliderValue: 45, description: 'Main entry point for incoming REST traffic. Routes requests to internal microservices.' }
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 450, y: 80 },
        data: { label: 'Auth Service', status: 'Healthy', sliderValue: 20, description: 'Handles session validations and API token issuance.' }
      },
      {
        id: 'node-3',
        type: 'service',
        position: { x: 450, y: 300 },
        data: { label: 'Postgres', status: 'Healthy', sliderValue: 12, description: 'Primary relational storage for tenant configuration and API keys.' }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
      { id: 'edge-2', source: 'node-1', target: 'node-3', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }
    ]
  },
  'supertokens-java': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 150, y: 200 },
        data: { label: 'API Gateway', status: 'Degraded', sliderValue: 80, description: 'Legacy Java-based API Gateway interface.' }
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 450, y: 100 },
        data: { label: 'Auth Service', status: 'Healthy', sliderValue: 30, description: 'Centralized authentication worker.' }
      },
      {
        id: 'node-3',
        type: 'service',
        position: { x: 450, y: 320 },
        data: { label: 'Redis', status: 'Healthy', sliderValue: 50, description: 'Memory store containing user credentials blocklists.' }
      },
      {
        id: 'node-4',
        type: 'service',
        position: { x: 750, y: 200 },
        data: { label: 'Postgres', status: 'Down', sliderValue: 95, description: 'Critical database cluster containing authorization profiles.' }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
      { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
      { id: 'edge-3', source: 'node-2', target: 'node-4', animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } }
    ]
  },
  'supertokens-python': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 150, y: 200 },
        data: { label: 'API Gateway', status: 'Healthy', sliderValue: 15, description: 'FastAPI router configuration.' }
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 450, y: 100 },
        data: { label: 'Auth Service', status: 'Degraded', sliderValue: 85, description: 'Authenticates authorization requests via OAuth2.' }
      },
      {
        id: 'node-3',
        type: 'service',
        position: { x: 450, y: 300 },
        data: { label: 'MongoDB', status: 'Healthy', sliderValue: 40, description: 'Document store storing tenant usage logs and user settings.' }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } },
      { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } }
    ]
  },
  'supertokens-ruby': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 150, y: 200 },
        data: { label: 'API Gateway', status: 'Healthy', sliderValue: 35, description: 'Ruby-based ingress controller.' }
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 450, y: 100 },
        data: { label: 'Auth Service', status: 'Healthy', sliderValue: 25, description: 'Authentication microservice built on Rails.' }
      },
      {
        id: 'node-3',
        type: 'service',
        position: { x: 450, y: 300 },
        data: { label: 'Redis', status: 'Down', sliderValue: 99, description: 'Sidekiq job queue backend experiencing load failures.' }
      },
      {
        id: 'node-4',
        type: 'service',
        position: { x: 750, y: 200 },
        data: { label: 'Postgres', status: 'Healthy', sliderValue: 18, description: 'Relational data workspace.' }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
      { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
      { id: 'edge-3', source: 'node-2', target: 'node-4', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } }
    ]
  },
  'supertokens-go': {
    nodes: [
      {
        id: 'node-1',
        type: 'service',
        position: { x: 150, y: 180 },
        data: { label: 'API Gateway', status: 'Healthy', sliderValue: 10, description: 'High-performance Go-based API gateway proxy.' }
      },
      {
        id: 'node-2',
        type: 'service',
        position: { x: 450, y: 100 },
        data: { label: 'Auth Service', status: 'Healthy', sliderValue: 8, description: 'Go token verification module.' }
      },
      {
        id: 'node-3',
        type: 'service',
        position: { x: 450, y: 300 },
        data: { label: 'MongoDB', status: 'Healthy', sliderValue: 15, description: 'Session logs and metadata cluster.' }
      }
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },
      { id: 'edge-2', source: 'node-2', target: 'node-3', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } }
    ]
  }
};

export const handlers = [
  http.get('/api/apps', async () => {
    // Return standard list of apps without delay or error
    return HttpResponse.json(APPS_MOCK);
  }),

  http.get('/api/apps/:appId/graph', async ({ params }) => {
    const { appId } = params;
    
    // Simulate 800ms delay
    await delay(800);

    // Simulate 20% random error rate
    if (Math.random() < 0.20) {
      return new HttpResponse(null, {
        status: 500,
        statusText: 'Internal Server Error'
      });
    }

    const appGraph = GRAPHS_MOCK[appId as string];
    if (!appGraph) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Application Graph Not Found'
      });
    }

    return HttpResponse.json(appGraph);
  })
];
