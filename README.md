# Ainyx Graph Builder

A responsive "App Graph Builder" UI built with React + Vite + TypeScript.

![App Preview](https://github.com/greeshsutar/Graph-Builder/raw/main/public/preview.png)

Live -Link - https://graph-builder-five.vercel.app/

---

## Tech Stack

- **React + Vite** — Frontend framework and build tool
- **TypeScript (strict)** — Type-safe codebase
- **ReactFlow (@xyflow/react)** — Interactive node/edge canvas
- **Zustand** — Global UI state management
- **TanStack Query** — Data fetching with caching and loading/error states
- **MSW (Mock Service Worker)** — Fake API interception in browser
- **shadcn/ui + Tailwind CSS** — UI components and styling

---

## Features

- Top bar with brand title and Fit View button
- Left rail icon navigation
- Center canvas with dotted ReactFlow background
- Right panel with app list and node inspector
- Mobile responsive — right panel becomes slide-over drawer
- ReactFlow: 3+ nodes, 2+ edges, drag, click-select, delete with Delete/Backspace
- Node inspector: Config + Runtime tabs, status pill, synced slider + number input
- TanStack Query: loading/error states, caching, auto refetch on app change
- Zustand: selectedAppId, selectedNodeId, isMobilePanelOpen, activeInspectorTab

---

## Setup & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # TypeScript check + Vite build
npm run preview    # Preview production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check only
```

---

## Project Structure
src/

├── types/index.ts                    # All TypeScript interfaces

├── store/

│   ├── useAppStore.ts                # UI state (selected app/node, tabs, drawer)

│   └── useFlowStore.ts               # ReactFlow nodes/edges state

├── mocks/

│   ├── handlers.ts                   # MSW mock API handlers

│   └── browser.ts                    # MSW browser setup

├── api/

│   ├── useApps.ts                    # TanStack Query — fetch apps list

│   └── useGraph.ts                   # TanStack Query — fetch graph per app

├── components/

│   ├── layout/

│   │   ├── TopBar.tsx

│   │   ├── LeftRail.tsx

│   │   ├── RightPanel.tsx

│   │   └── MobileDrawer.tsx

│   ├── canvas/

│   │   ├── FlowCanvas.tsx

│   │   └── nodes/ServiceNode.tsx

│   ├── inspector/

│   │   ├── NodeInspector.tsx

│   │   ├── ConfigTab.tsx

│   │   ├── RuntimeTab.tsx

│   │   └── StatusPill.tsx

│   └── apps/AppList.tsx

├── main.tsx

└── App.tsx

---

## Key Design Decisions

### 1. Two Zustand Stores
- `useAppStore` — pure UI state (selected IDs, active tab, mobile drawer)
- `useFlowStore` — ReactFlow canvas state (nodes, edges, updateNode)

Separated because they have different responsibilities. Mixing them would make the store hard to maintain.

### 2. Single Source of Truth for Node Data
`useFlowStore.updateNode` is the only place node data is updated. Inspector reads from and writes to the store — ReactFlow re-renders automatically.

### 3. TanStack Query Key Strategy
```ts
queryKey: ['graph', appId]
```
When `appId` changes, TanStack Query sees a new key and automatically refetches. No manual useEffect needed for refetching.

### 4. MSW for API Mocking
MSW intercepts fetch calls at the Service Worker level — the app code is identical to how it would work with a real backend. Includes 800ms simulated latency and 20% random error rate to demonstrate loading/error states.

### 5. Responsive Layout
- Desktop: RightPanel fixed 320px sidebar
- Mobile: MobileDrawer slide-over controlled by `isMobilePanelOpen` in Zustand

---

## Mock API Endpoints

| Endpoint | Description |
|---|---|
| GET /api/apps | Returns list of 5 applications |
| GET /api/apps/:appId/graph | Returns nodes + edges for selected app |

Both endpoints have 800ms simulated delay. Graph endpoint has 20% random error rate to test error UI.

---

## Known Limitations

- Graph edits are client-side only — refreshing the page resets all changes
- Error simulation is random — sometimes switching apps triggers error state intentionally
- No real backend — MSW is removed in production builds automatically

---

## GitHub

[github.com/greeshsutar/Graph-Builder](https://github.com/greeshsutar/Graph-Builder)
