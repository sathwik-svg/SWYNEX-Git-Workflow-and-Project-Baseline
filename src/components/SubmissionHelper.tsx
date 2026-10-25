import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Share2,
  Github,
  Linkedin,
  FileCode,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionHelperProps {
  completedChecklist: string[];
  setCompletedChecklist: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SubmissionHelper: React.FC<SubmissionHelperProps> = ({
  completedChecklist,
  setCompletedChecklist,
}) => {
  const [studentName, setStudentName] = useState('Sathwik Ganji');
  const [githubUrl, setGithubUrl] = useState(
    'https://github.com/sathwik-svg/SWYNEX-Final-Delivery-Pipeline'
  );
  const [pipelineDocUrl, setPipelineDocUrl] = useState(
    'https://github.com/sathwik-svg/SWYNEX-Final-Delivery-Pipeline/blob/main/PIPELINE.md'
  );
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState(
    window.location.origin.includes('run.app')
      ? window.location.href
      : 'https://ais-pre-ze3uf6qukon6gdukiw334v-981864576343.asia-east1.run.app'
  );
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedGitUrl, setCopiedGitUrl] = useState(false);
  const [copiedDocUrl, setCopiedDocUrl] = useState(false);

  const checklistItems = [
    {
      id: 'repo_name',
      label: 'Repository Named Clearly (SWYNEX-Final-Delivery-Pipeline)',
      description: 'Used official recommended repository name avoiding generic terms.',
    },
    {
      id: 'delivery_workflow',
      label: 'Single Unified CI/CD Pipeline (.github/workflows/delivery.yml)',
      description: 'Connects build, test, container packaging, staging deployment, and automated release notes into one pipeline.',
    },
    {
      id: 'pipeline_doc',
      label: 'Comprehensive Pipeline Description (PIPELINE.md)',
      description: 'Detailed architectural description of all 5 connected stages, SLAs, and rollback playbooks.',
    },
    {
      id: 'screenshots_proof',
      label: 'Screenshots & Visual Evidence of Successful Run Included',
      description: 'Visual record of successful GitHub Actions execution run with complete step outputs documented in PIPELINE.md and README.md.',
    },
    {
      id: 'release_notes',
      label: 'Automated Release Notes & Changelog (RELEASE_NOTES.md)',
      description: 'Changelog synthesized from Conventional Commits with version bump (v1.2.0) and release tarball.',
    },
    {
      id: 'container_baseline',
      label: 'Multi-Stage Docker & Compose Baseline Included',
      description: 'Alpine container with non-root security context (UID 10001) and healthcheck /health probe.',
    },
    {
      id: 'automated_tests',
      label: 'Automated Testing Gates (15 Tests Across Node 18, 20, 22)',
      description: 'Vitest suite enforcing Conventional Commits and branch invariants on each push.',
    },
    {
      id: 'public_repo',
      label: 'Repository Set to Public & Verified in Incognito Window',
      description: 'Confirmed repository and PIPELINE.md load in a private window without login prompts.',
    },
    {
      id: 'linkedin_mention',
      label: 'LinkedIn Post Mentions @SWYNEX Technologies',
      description: 'Tagged the official SWYNEX Technologies company page as required.',
    },
    {
      id: 'linkedin_hashtags',
      label: 'Relevant Hashtags Included in LinkedIn Post',
      description: 'Includes #SWYNEX #Internship #CICD #DevOps #ContinuousDelivery #FinalDeliveryPipeline.',
    },
  ];

  const toggleChecklist = (id: string) => {
    if (completedChecklist.includes(id)) {
      setCompletedChecklist(completedChecklist.filter((item) => item !== id));
    } else {
      const next = [...completedChecklist, id];
      setCompletedChecklist(next);
      if (next.length === checklistItems.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const generateLinkedInPost = () => {
    return `Thrilled to announce the completion of Task 4 — the Final Delivery Pipeline — for my software engineering internship with @SWYNEX Technologies! 🚀

For Task 4, I unified our engineering workflows into an end-to-end continuous delivery pipeline engineered to European and Dublin Silicon Docks standards.

Key Technical Deliverables:
🔹 Unified CI/CD Pipeline: Connected code quality checks, multi-version Node matrix tests, security audits, containerization, staging deployment, and automated release notes into a single workflow.
🔹 Automated Semantic Releases: Implemented commit-driven release note generation tagging releases (v1.2.0) and uploading production distribution archives.
🔹 Staging Smoke Verification: Configured pre-promotion container health probing ensuring zero downtime and automated failure recovery.
🔹 Visual Run Documentation: Documented a 100% green pipeline execution run with detailed step logs and screenshots in PIPELINE.md.
🔹 Interactive Delivery Workbench: Deployed an in-browser delivery simulator with live DAG monitoring and real-time telemetry.

📂 GitHub Repository:
${githubUrl}

📄 Complete Pipeline Documentation & Run Proof:
${pipelineDocUrl}

💻 Live Interactive Application:
${demoUrl}

A heartfelt thank you to the mentors and leadership at @SWYNEX Technologies for this incredible software engineering internship journey!

#SWYNEX #Internship #CICD #DevOps #ContinuousDelivery #Docker #GitHubActions #SoftwareEngineering #CloudEngineering #Automation`;
  };

  const handleCopyPost = () => {
    navigator.clipboard.writeText(generateLinkedInPost());
    setCopiedPost(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopiedPost(false), 2000);
  };

  const handleCopyGitUrl = () => {
    navigator.clipboard.writeText(githubUrl);
    setCopiedGitUrl(true);
    setTimeout(() => setCopiedGitUrl(false), 2000);
  };

  const handleCopyDocUrl = () => {
    navigator.clipboard.writeText(pipelineDocUrl);
    setCopiedDocUrl(true);
    setTimeout(() => setCopiedDocUrl(false), 2000);
  };

  const isGithubValid = githubUrl.startsWith('https://github.com/') && githubUrl.includes('SWYNEX');
  const isLinkedinValid =
    linkedinUrl.startsWith('https://www.linkedin.com/posts/') ||
    linkedinUrl.startsWith('https://linkedin.com/posts/');
  const progressPercent = Math.round((completedChecklist.length / checklistItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>SWYNEX Technologies Internship</span>
              <span aria-hidden="true">·</span>
              <span>Task 4: Final Delivery Pipeline</span>
              <span aria-hidden="true">·</span>
              <span>Reviewer Verification</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Task 4 Submission Readiness Suite
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Verify your unified CI/CD delivery pipeline, pipeline description document, run screenshots, and LinkedIn post copy.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 text-center sm:text-right">
            <span className="text-xs text-slate-400 block mb-1">Task 4 Readiness</span>
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                {progressPercent}%
              </span>
              <span className="text-xs text-slate-500">
                ({completedChecklist.length}/{checklistItems.length} items)
              </span>
            </div>
            <div className="w-36 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden mx-auto sm:ml-auto">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Checklist */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Task 4 Requirements Checklist</h3>
            </div>
            <button
              onClick={() => {
                if (completedChecklist.length === checklistItems.length) {
                  setCompletedChecklist([]);
                } else {
                  setCompletedChecklist(checklistItems.map((c) => c.id));
                  confetti({ particleCount: 50 });
                }
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {completedChecklist.length === checklistItems.length ? 'Clear All' : 'Select All'}
            </button>
          </div>

          <div className="space-y-2.5">
            {checklistItems.map((item) => {
              const isChecked = completedChecklist.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Critical Reviewer Instruction:</span>
              <p className="text-amber-300/80 leading-relaxed text-[11px]">
                Open your repository URL showing the PIPELINE.md document and delivery workflow in an <strong>Incognito / Private Window</strong> before submitting to ensure it opens without requiring permission.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Post Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 pb-2 border-b border-slate-850 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              Submission Form Links
            </h3>

            {/* Field 1: GitHub URL */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  Task 4 Submission Link (GitHub Repository URL) *
                </label>
                {isGithubValid && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Valid Repo Format
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs pr-16"
                />
                <button
                  onClick={handleCopyGitUrl}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white px-2 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {copiedGitUrl ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Field 2: Pipeline Description URL */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  Pipeline Description & Run Proof (PIPELINE.md)
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={pipelineDocUrl}
                  onChange={(e) => setPipelineDocUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs pr-16"
                />
                <button
                  onClick={handleCopyDocUrl}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white px-2 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {copiedDocUrl ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Field 3: LinkedIn Post URL */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                  LinkedIn Explanation Post Link *
                </label>
                {isLinkedinValid && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Valid Post URL
                  </span>
                )}
              </div>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/posts/..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs"
              />
            </div>
          </div>

          {/* LinkedIn Copy */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-200">Ready-to-Post LinkedIn Copy (Task 4)</h3>
              </div>
              <button
                onClick={handleCopyPost}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
              >
                {copiedPost ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Post</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 max-h-72 overflow-y-auto">
              <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed select-all">
                {generateLinkedInPost()}
              </pre>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Ready for copy & paste into LinkedIn</span>
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium"
              >
                Open LinkedIn Composer <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
