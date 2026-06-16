# App Graph Builder

Responsive “App Graph Builder” UI built with **React + Vite + TypeScript**. It demonstrates:
- **ReactFlow (xyflow)** canvas with dotted background, drag/select/delete
- **Service Node inspector** (Config/Runtime tabs, synced slider + number input)
- **TanStack Query** mock data fetching with loading/error states + caching
- **Zustand** state management for selected app/node + mobile drawer
- **MSW** (Mock Service Worker) for `/api/apps` and `/api/apps/:appId/graph`

---

## Screenshot requirements (mapped)
- Top bar, left rail, right panel layout ✅
- Center canvas with dotted ReactFlow background ✅
- Mobile: right panel becomes a slide-over drawer (Zustand controlled) ✅
- ReactFlow: 3+ nodes, 2+ edges, drag, click-select, delete with Delete/Backspace ✅
- Inspector: status pill + Config/Runtime tabs + synced slider/number persisted to node data ✅
- TanStack Query: loading/error, caching, refetch on app change ✅
- Zustand: `selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab` ✅

---

## How the project was structured

### Entry / Providers
- `src/main.tsx` – mounts React
- `src/App.tsx` – wraps the app with:
  - `QueryClientProvider` (TanStack Query)
  - `ReactFlowProvider` (xyflow)
  - renders layout (TopBar / LeftRail / FlowCanvas / RightPanel / MobileDrawer)

### Layout
- `src/components/layout/TopBar.tsx` – brand/title + placeholder actions
- `src/components/layout/LeftRail.tsx` – icon navigation (static is fine)
- `src/components/layout/RightPanel.tsx` – right sidebar (apps list + node inspector)
- `src/components/layout/MobileDrawer.tsx` – slide-over drawer on small screens

### Canvas (ReactFlow)
- `src/components/canvas/FlowCanvas.tsx`
  - Renders `<ReactFlow />` with `Background` set to dotted variant
  - Loads graph via `useGraph(selectedAppId)`
  - Uses ReactFlow controlled state (`nodes`, `edges`)
  - Mirrors `nodes`/`edges` into `useFlowStore` so the inspector can read/update node data reliably

### Nodes
- `src/components/canvas/nodes/ServiceNode.tsx`
  - Custom ReactFlow node UI
  - Displays label, status, resource UI (driven from node `sliderValue`)

### Inspector
- `src/components/inspector/NodeInspector.tsx`
  - Shows empty-state until a node is selected
  - Tabs: **Config** and **Runtime**
- `src/components/inspector/ConfigTab.tsx`
  - Editable inputs:
    - Service Name (input)
    - Description (textarea)
    - Resource Allocated (0–100): **slider + number input**, synced both ways
  - Persists updates to the selected node via `useFlowStore.updateNode`
- `src/components/inspector/RuntimeTab.tsx`
  - Displays derived runtime values based on the node’s `sliderValue`
- `src/components/inspector/StatusPill.tsx`
  - Status badge for `Healthy | Degraded | Down`

### State (Zustand)
- `src/store/useAppStore.ts`
  - `selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab`
- `src/store/useFlowStore.ts`
  - `nodes`, `edges`
  - `setNodes`, `setEdges`
  - `updateNode(nodeId, updates)` updates node `data` in a single predictable place

### Data fetching (TanStack Query + MSW)
- `src/api/useApps.ts`
  - GET `/api/apps`
- `src/api/useGraph.ts`
  - GET `/api/apps/:appId/graph`
- `src/mocks/handlers.ts`
  - MSW handlers for the required endpoints
  - Simulates latency (`delay(800)`) and random failures (~20%)

---

## Key design decisions

### 1) Remove fragile window/event syncing
Originally the canvas/inspector was prone to “stuck” UI due to reliance on global `window` state and custom events.

Now:
- ReactFlow `nodes/edges` are mirrored into `useFlowStore`
- Inspector reads node directly from the store
- Inspector edits call `useFlowStore.updateNode`

This keeps UI updates consistent and predictable.

### 2) Single source of truth for node data
The store (`useFlowStore`) is the bridge between:
- ReactFlow rendering state
- inspector read/write

---

## Scripts

- `npm run dev` – Vite dev server
- `npm run build` – `tsc -b && vite build`
- `npm run preview` – preview production build
- `npm run lint` – eslint
- `npm run typecheck` – `tsc --noEmit`

---

## Setup & run

```bash
npm install
npm run dev
```

---

## Known limitations
- Graph edits are stored in client state only (no backend persistence).
- Graph error simulation is intentionally random in MSW to demonstrate error UI.

