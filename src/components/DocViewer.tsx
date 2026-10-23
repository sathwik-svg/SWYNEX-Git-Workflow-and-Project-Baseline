import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Code, Eye, FolderTree } from 'lucide-react';
import { REPOSITORY_FILES, RepoFile } from '../data/repoFiles';

export const DocViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(REPOSITORY_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'raw' | 'preview'>('raw');

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllAsScript = () => {
    // Generate a quick shell setup script that initializes all files locally
    let script = `#!/usr/bin/env bash
# ==============================================================================
# SWYNEX Technologies - Project Baseline Generator Script
# Run this script in an empty folder to create the full repository structure
# ==============================================================================

set -e

echo "🚀 Initializing SWYNEX-Git-Workflow-and-Project-Baseline..."

mkdir -p .github/workflows
`;

    REPOSITORY_FILES.forEach((file) => {
      // Escape for bash EOF
      script += `
cat << 'EOF' > "${file.name}"
${file.content}
EOF
`;
    });

    script += `
echo "✅ Baseline files successfully created!"
echo "Initializing Git repository..."
git init
git add .
git commit -m "feat(baseline): establish SWYNEX Git workflow and initial application"
git branch -M main
echo "Repository baseline ready to push!"
`;

    const blob = new Blob([script], { type: 'text/x-sh;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'setup-swynex-baseline.sh';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Explainer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Repository Baseline</span>
            <span aria-hidden="true">·</span>
            <span>Task 1 Deliverables</span>
            <span aria-hidden="true">·</span>
            <span>Production Ready</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Baseline Documentation & Config Inspector
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Review, copy, or export the actual configuration files established for this project baseline.
          </p>
        </div>

        <button
          onClick={downloadAllAsScript}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download All Files (.sh script)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: File List (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-xs font-semibold text-slate-300">
            <FolderTree className="w-4 h-4 text-indigo-400" />
            <span>Project Baseline Files</span>
          </div>

          <div className="space-y-1">
            {REPOSITORY_FILES.map((file) => {
              const isSelected = selectedFile.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => {
                    setSelectedFile(file);
                    setCopied(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500/70 text-white font-medium'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="font-mono truncate">{file.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase shrink-0 ml-2">
                    {file.language}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
            <p className="font-medium text-slate-300">Target Repository Name:</p>
            <p className="font-mono text-indigo-300 break-all">
              SWYNEX-Git-Workflow-and-Project-Baseline
            </p>
          </div>
        </div>

        {/* Right Main Viewer (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          {/* File Toolbar */}
          <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="text-xs font-mono font-bold text-white block">{selectedFile.name}</span>
                <span className="text-[11px] text-slate-400 hidden sm:block">{selectedFile.description}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Raw vs Preview Toggle */}
              {selectedFile.language === 'markdown' && (
                <div className="flex items-center bg-slate-900 p-0.5 rounded-md border border-slate-800">
                  <button
                    onClick={() => setViewMode('raw')}
                    className={`px-2 py-1 text-[11px] font-medium rounded transition-colors flex items-center gap-1 ${
                      viewMode === 'raw' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code className="w-3 h-3" /> Raw
                  </button>
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`px-2 py-1 text-[11px] font-medium rounded transition-colors flex items-center gap-1 ${
                      viewMode === 'preview' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Eye className="w-3 h-3" /> Preview
                  </button>
                </div>
              )}

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                title="Download single file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 max-h-[550px] overflow-y-auto">
            {viewMode === 'raw' ? (
              <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
                {selectedFile.content}
              </pre>
            ) : (
              <div className="prose prose-invert prose-xs max-w-none text-slate-300 space-y-4">
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg whitespace-pre-line text-xs font-mono leading-relaxed">
                  {selectedFile.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
