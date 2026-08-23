import React, { useState } from 'react';
import { Sparkles, ListChecks, Lightbulb, Copy, Download, Check } from 'lucide-react';

export default function SummaryDisplay({ data, fileName }) {
  const [isCopied, setIsCopied] = useState(false);

  if (!data) return null;

  //   Markdown generator
  const generateMarkdown = () => {
    try {
      const fileHeader = fileName ? `\n**Source File:** ${fileName}\n` : '';
       
      const safeKeyPoints = Array.isArray(data.key_points) 
        ? data.key_points.map(point => `- ${point}`).join('\n')
        : '- No key points generated.';

      const safeSummary = data.summary_text || 'No summary text generated.';
      const safeInsights = data.improvement_suggestions || 'No insights generated.';

      return `# Document Summary${fileHeader}
## Smart Summary
${safeSummary}

## Key Points
${safeKeyPoints}

## Document Insights
${safeInsights}
`.trim();
    } catch (err) {
      console.error("Error generating markdown:", err);
      return "Error generating markdown content.";
    }
  };

  //   Copy Handler with error alerts
  const handleCopy = async () => {
    try {
      const markdownContent = generateMarkdown();
       
      if (!navigator?.clipboard) {
        alert("Clipboard API is not available in this environment. (Are you on localhost/HTTPS?)");
        return;
      }

      await navigator.clipboard.writeText(markdownContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy to clipboard. Check the browser console (F12).');
    }
  };

  //  Download Handler with error alerts
  const handleDownload = () => {
    try {
      const markdownContent = generateMarkdown();
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url; 
      const safeFileName = fileName ? fileName.replace(/\.[^/.]+$/, "") + '.md' : 'summary.md';
      link.download = safeFileName;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download file: ', err);
      alert('Failed to download the file. Check the browser console (F12).');
    }
  };

  return (
    <div className="w-full mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Action Bar */}
      <div className="flex items-center justify-end gap-3 mb-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
          title="Copy to clipboard"
        >
          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
          title="Download as Markdown"
        >
          <Download className="w-4 h-4" />
          <span>Export .md</span>
        </button>
      </div>
 
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
            {Array.isArray(data.key_points) && data.key_points.map((point, index) => (
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