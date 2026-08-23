import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import SummaryOptions from '../components/SummaryOptions';
import SummaryDisplay from '../components/SummaryDisplay';
import Loader from '../components/Loader';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [length, setLength] = useState('medium');
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setSummaryData(null);
    setError(null);
  };

  const handleFileRemove = () => {
    setFile(null);
    setSummaryData(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setSummaryData(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('length', length);

    try { 
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to process the document.');
      }

      const result = await response.json();
      setSummaryData(result);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8"> 
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Transform Documents into <span className="text-indigo-600">Smart Insights</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Upload any PDF or image to extract key takeaways, summaries, and document clarity recommendations in seconds.
        </p>
      </div>
 
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit}>
          <FileUploader
            selectedFile={file}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
          />

          <SummaryOptions
            selectedLength={length}
            onLengthChange={setLength}
          />
 
          <button
            type="submit"
            disabled={!file || isLoading}
            className={`w-full mt-6 py-3 px-4 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
              !file || isLoading
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white hover:shadow'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isLoading ? 'Processing Document...' : 'Generate Summary'}</span>
          </button>
        </form>
      </div> 
      {error && (
        <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
 
      {isLoading && <Loader />}

       
      {summaryData && <SummaryDisplay data={summaryData} />}
    </div>
  );
}