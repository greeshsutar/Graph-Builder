import React, { useState } from 'react';
import { useApps } from '../../api/useApps';
import { useAppStore } from '../../store/useAppStore';
import { 
  Lightbulb, 
  Settings, 
  Rocket, 
  ClipboardList, 
  Puzzle, 
  ChevronRight, 
  Search, 
  Plus, 
  AlertCircle 
} from 'lucide-react';

const getAppIcon = (name: string) => {
  switch (name) {
    case 'supertokens-golang':
      return Lightbulb;
    case 'supertokens-java':
      return Settings;
    case 'supertokens-python':
      return Rocket;
    case 'supertokens-ruby':
      return ClipboardList;
    case 'supertokens-go':
      return Puzzle;
    default:
      return Settings;
  }
};

export const AppList: React.FC = () => {
  const { data: apps, isLoading, error } = useApps();
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const setSelectedAppId = useAppStore((state) => state.setSelectedAppId);
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2.5 p-4 select-none">
        <div className="h-9 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse mb-2" />
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center justify-between p-3 rounded-lg border border-zinc-900 bg-zinc-900/40 animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800" />
              <div className="h-4 w-32 bg-zinc-800 rounded" />
            </div>
            <div className="w-4 h-4 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 select-none flex flex-col items-center justify-center text-center gap-2 border border-zinc-800/50 rounded-xl bg-zinc-900/10">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="text-sm text-zinc-300 font-medium">Failed to load apps</p>
        <p className="text-xs text-zinc-500">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }

  const filteredApps = apps?.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="flex flex-col h-full select-none">
      <div className="p-4 border-b border-zinc-900 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">Application</h2>
          <button 
            className="bg-blue-600 hover:bg-blue-500 text-white p-1 rounded transition-colors active:scale-95"
            title="Create Application"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[260px] md:max-h-none border-b border-zinc-900">
        {filteredApps.length === 0 ? (
          <p className="text-center text-xs text-zinc-500 py-4">No applications found</p>
        ) : (
          filteredApps.map((app) => {
            const IconComponent = getAppIcon(app.name);
            const isSelected = selectedAppId === app.id;

            return (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-150 text-left ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-700 shadow-lg text-white'
                    : 'bg-zinc-950 border-zinc-900 hover:bg-zinc-900/50 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow"
                    style={{ backgroundColor: app.color }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold font-mono tracking-tight">{app.name}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-zinc-200 translate-x-0.5' : 'text-zinc-600'}`} />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
