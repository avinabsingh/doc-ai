import React from 'react';
import { Sparkles, ListChecks, Lightbulb } from 'lucide-react';

export default function SummaryDisplay({ data }) {
  if (!data) return null;

  return (
    <div className="w-full mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       
      <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-indigo-600">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold text-slate-800">Smart Summary</h2>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {data.summary_text}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-emerald-600">
            <ListChecks className="w-5 h-5" />
            <h3 className="text-md font-semibold text-slate-800">Key Points</h3>
          </div>
          <ul className="space-y-3">
            {data.key_points.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-emerald-500" />
                <span className="text-slate-600 text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
 
        <div className="p-6 bg-amber-50 border border-amber-100 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <Lightbulb className="w-5 h-5" />
            <h3 className="text-md font-semibold text-amber-900">Document Insights</h3>
          </div>
          <p className="text-amber-800/80 text-sm leading-relaxed">
            {data.improvement_suggestions}
          </p>
        </div>
      </div>
      
    </div>
  );
}