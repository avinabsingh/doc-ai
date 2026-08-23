import React from 'react';
import { AlignLeft, AlignCenter, AlignJustify } from 'lucide-react';

export default function SummaryOptions({ selectedLength, onLengthChange }) {
  const options = [
    {
      id: 'short',
      label: 'Short',
      description: 'Quick gist (1-2 paragraphs)',
      icon: <AlignLeft className="w-5 h-5" />
    },
    {
      id: 'medium',
      label: 'Medium',
      description: 'Balanced overview (Recommended)',
      icon: <AlignCenter className="w-5 h-5" />
    },
    {
      id: 'long',
      label: 'Long',
      description: 'Detailed breakdown with nuances',
      icon: <AlignJustify className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-full mt-6">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        Summary Length
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedLength === option.id;
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onLengthChange(option.id)}
              className={`relative flex flex-col items-start p-4 border rounded-xl text-left transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`mb-2 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}>
                {option.icon}
              </div>
              <span className={`text-sm font-semibold mb-1 ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                {option.label}
              </span>
              <span className={`text-xs ${isSelected ? 'text-indigo-700/80' : 'text-slate-500'}`}>
                {option.description}
              </span>
               
              {isSelected && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}