import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ message = "Analyzing document and generating summary..." }) {
  return (
    <div className="w-full p-8 mt-6 bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="flex items-center justify-center space-x-3 mb-8 text-indigo-600">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm font-medium">{message}</span>
      </div>
 
      <div className="space-y-6 animate-pulse">
        <div>
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-full"></div>
            <div className="h-3 bg-slate-100 rounded w-5/6"></div>
          </div>
        </div>

        <div>
          <div className="h-4 bg-slate-200 rounded w-1/3 mb-4 mt-8"></div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-100 rounded w-3/4"></div>
            <div className="h-3 bg-slate-100 rounded w-2/3"></div>
            <div className="h-3 bg-slate-100 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}