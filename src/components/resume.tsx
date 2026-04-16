'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';

export function Resume() {
  const resumeDetails = {
    title: "Mashfiq's CV / Resume",
    description: 'AI/ML Enthusiast and CSE Student',
    fileType: 'PDF',
    lastUpdated: '2026',
    fileSize: '0.3 MB',
    downloadUrl: '/Resume_Mashfiq_Naushad_AI.pdf',
  };

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeDetails.downloadUrl;
    link.download = resumeDetails.downloadUrl.split('/').pop() || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto w-full py-2 font-sans">
      <motion.div
        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/68 p-5 backdrop-blur-xl transition-all duration-300 dark:border-white/12 dark:bg-white/7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        whileHover={{ y: -1 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-400/10 to-transparent" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-medium dark:border-white/15 dark:bg-white/10">
                <FileText className="h-3.5 w-3.5" />
                CV Document
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {resumeDetails.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {resumeDetails.description}
              </p>
              <div className="mt-1 flex text-xs text-muted-foreground">
                <span>{resumeDetails.fileType}</span>
                <span className="mx-2">•</span>
                <span>Updated {resumeDetails.lastUpdated}</span>
                <span className="mx-2">•</span>
                <span>{resumeDetails.fileSize}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200/80 bg-white/70 p-3 text-sm text-slate-700 dark:border-white/12 dark:bg-white/8 dark:text-slate-200">
            <p className="font-semibold">Short CV Summary</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>AI/ML Engineer building NLP pipelines, LLM solutions, and deployment workflows.</li>
              <li>Hands-on backend engineering experience with FastAPI, Django, and Go.</li>
              <li>Focused on practical AI systems that deliver measurable user impact.</li>
            </ul>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-[#0171E3] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0660b8]"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>

            <a
              href={resumeDetails.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20"
            >
              <ExternalLink className="h-4 w-4" />
              Open PDF
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;