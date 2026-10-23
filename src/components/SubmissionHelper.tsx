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
  Sparkles,
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
    'https://github.com/sathwik-svg/SWYNEX-Git-Workflow-and-Project-Baseline'
  );
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState(
    window.location.origin.includes('run.app') ? window.location.href : 'https://ais-pre-ze3uf6qukon6gdukiw334v-981864576343.asia-east1.run.app'
  );
  const [copiedPost, setCopiedPost] = useState(false);
  const [copiedGitUrl, setCopiedGitUrl] = useState(false);

  const checklistItems = [
    {
      id: 'repo_name',
      label: 'Repository Named Clearly with SWYNEX',
      description: 'Used suggested name: SWYNEX-Git-Workflow-and-Project-Baseline (avoids generic names like test or mycode).',
    },
    {
      id: 'readme',
      label: 'Comprehensive README.md Included',
      description: 'Documents project overview, setup commands, architecture, and conventional commit guidelines.',
    },
    {
      id: 'gitignore',
      label: 'Clean .gitignore Established',
      description: 'Excludes node_modules, dist, .env secrets, logs, and OS caches while tracking .env.example.',
    },
    {
      id: 'branching_notes',
      label: 'Formal Branching Notes (BRANCHING.md)',
      description: 'Outlines Git Flow & trunk branching model, branch protection, rebase vs merge rules, and SemVer tags.',
    },
    {
      id: 'sample_app',
      label: 'Small Working Sample Application Built',
      description: 'Interactive Git workflow workbench, commit graph simulator, CLI sandbox, and baseline inspector.',
    },
    {
      id: 'public_repo',
      label: 'GitHub Repository Set to Public',
      description: 'Accessible to reviewers without requiring special login permissions.',
    },
    {
      id: 'incognito_check_git',
      label: 'Tested GitHub Link in Private / Incognito Window',
      description: 'Opens cleanly without 404 or authorization prompts.',
    },
    {
      id: 'linkedin_mention',
      label: 'LinkedIn Post Mentions @SWYNEX Technologies',
      description: 'Tagged official company page as required by internship guidelines.',
    },
    {
      id: 'linkedin_hashtags',
      label: 'Relevant Hashtags Included in LinkedIn Post',
      description: 'Includes #SWYNEX #Internship #GitWorkflow #SoftwareEngineering.',
    },
    {
      id: 'incognito_check_linkedin',
      label: 'Tested LinkedIn Post Link in Incognito Window',
      description: 'Post visibility set to Public so the reviewer can watch the demo without barriers.',
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

  // Generate customized LinkedIn post text
  const generateLinkedInPost = () => {
    return `Excited to share that I have completed Task 1 of my software engineering internship with @SWYNEX Technologies! 🚀

For Task 1: "Git Workflow and Project Baseline", I established a clean, production-grade Git workflow and project architecture.

Key learnings & deliverables:
🔹 Configured an enterprise Git branching strategy (main, develop, feature/*, hotfix/*, release/*) with formal branch protection rules.
🔹 Implemented Conventional Commits (v1.0.0) standardizing semantic commit history and changelog traceability.
🔹 Created a production-ready .gitignore, PR review templates, and CI verification pipeline (GitHub Actions).
🔹 Developed an interactive Git Workflow Simulator and developer workbench application to visualize commit graphs, merges, and terminal CLI commands.

📂 GitHub Repository:
${githubUrl}

💻 Live Interactive Application:
${demoUrl}

A huge thank you to the team and mentors at @SWYNEX Technologies for this rigorous engineering challenge!

#SWYNEX #Internship #GitWorkflow #WebDevelopment #SoftwareEngineering #DevOps #CleanCode #OpenSource`;
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

  const isGithubValid = githubUrl.startsWith('https://github.com/') && githubUrl.includes('SWYNEX');
  const isLinkedinValid = linkedinUrl.startsWith('https://www.linkedin.com/posts/') || linkedinUrl.startsWith('https://linkedin.com/posts/');
  const progressPercent = Math.round((completedChecklist.length / checklistItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>SWYNEX Technologies Internship</span>
              <span aria-hidden="true">·</span>
              <span>Task 1 Submission Portal</span>
              <span aria-hidden="true">·</span>
              <span>Reviewer Verification</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Task 1 Submission Readiness Suite
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Complete your pre-submission verification, generate an optimized LinkedIn post, and double-check all public URLs.
            </p>
          </div>

          {/* Readiness Meter */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 text-center sm:text-right">
            <span className="text-xs text-slate-400 block mb-1">Readiness Score</span>
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
        {/* Left Column: Interactive Checklist (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">Task 1 Requirements Checklist</h3>
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

          {/* Incognito Warning Banner */}
          <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-lg flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Critical Reviewer Instruction:</span>
              <p className="text-amber-300/80 leading-relaxed text-[11px]">
                Before submitting in the SWYNEX portal, open both your GitHub repository link and LinkedIn post in a <strong>Private / Incognito Window</strong>. Ensure they load without asking for login credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Links & LinkedIn Generator (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Submission Links Validator */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" />
              Submission Form Fields
            </h3>

            {/* Field 1: GitHub URL */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  Task Submission Link *
                </label>
                {isGithubValid ? (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Valid Repository Format
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-400">Must include SWYNEX</span>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-xs pr-16"
                />
                <button
                  onClick={handleCopyGitUrl}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white px-2 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  {copiedGitUrl ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Suggested name: <code className="text-indigo-300 font-mono">SWYNEX-Git-Workflow-and-Project-Baseline</code>
              </p>
            </div>

            {/* Field 2: LinkedIn Post URL */}
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
              <p className="text-[11px] text-slate-500">
                Paste the URL of your published LinkedIn demo explanation post here.
              </p>
            </div>
          </div>

          {/* LinkedIn Post Copy Generator */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-slate-200">Ready-to-Post LinkedIn Copy</h3>
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
              <span>Ready for copy & paste into LinkedIn composer</span>
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium"
              >
                Open LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
