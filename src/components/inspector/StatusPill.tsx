import React from 'react';
import type { AppStatus } from '../../types';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StatusPillProps {
  status: AppStatus;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  let styleClasses = '';
  let Icon = CheckCircle2;

  switch (status) {
    case 'Healthy':
      styleClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25';
      Icon = CheckCircle2;
      break;
    case 'Degraded':
      styleClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/25';
      Icon = AlertTriangle;
      break;
    case 'Down':
      styleClasses = 'bg-red-500/10 text-red-400 border-red-500/25';
      Icon = XCircle;
      break;
  }

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styleClasses}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{status}</span>
    </div>
  );
};
