import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

export default function FileUploader({ selectedFile, onFileSelect, onFileRemove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
  const maxSizeBytes = 10 * 1024 * 1024; 

  const validateAndPassFile = (file) => {
    setErrorMessage('');
    
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Unsupported file format. Please upload a PDF or Image (PNG, JPG).');
      return;
    }

    if (file.size > maxSizeBytes) {
      setErrorMessage('File size exceeds 10MB limit.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {/* Drop Zone Area */}
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
              : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept=".pdf,image/png,image/jpeg,image/jpg"
            className="hidden"
          />

          <div className="p-3 bg-white rounded-full shadow-sm border border-slate-200 mb-3 text-indigo-600">
            <UploadCloud className="w-8 h-8" />
          </div>

          <p className="text-base font-semibold text-slate-700">
            Click to upload or drag & drop
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Supported formats: PDF, PNG, JPG (Max 10MB)
          </p>
        </div>
      ) : ( 
        <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3 truncate">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
              {selectedFile.type === 'application/pdf' ? (
                <FileText className="w-6 h-6" />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
            </div>
            <div className="truncate">
              <p className="text-sm font-medium text-slate-800 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-400">
                {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFileRemove}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-3"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
 
      {errorMessage && (
        <div className="flex items-center gap-2 mt-3 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}