import React from 'react';
import Home from './pages/Home';
import { FileText } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-800">DOC-AI</span>
          </div>
          
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        DOC-AI • AI Document Summarizer
      </footer>
    </div>
  );
}