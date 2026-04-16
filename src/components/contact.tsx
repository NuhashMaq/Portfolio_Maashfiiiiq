'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'mashfiq.cse.ruet@gmail.com',
      href: 'mailto:mashfiq.cse.ruet@gmail.com',
      accent: 'from-sky-500/30 to-cyan-500/10',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+880 1410 056159',
      href: 'tel:+8801410056159',
      accent: 'from-emerald-500/30 to-lime-500/10',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/mashfiqnaushad',
      href: 'https://www.linkedin.com/in/mashfiqnaushad/',
      accent: 'from-blue-500/30 to-indigo-500/10',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/NuhashMaq',
      href: 'https://github.com/NuhashMaq',
      accent: 'from-slate-500/30 to-slate-300/10',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: 'instagram.com/__maashfiiiiq__',
      href: 'https://www.instagram.com/__maashfiiiiq__/',
      accent: 'from-pink-500/30 to-fuchsia-500/10',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'House 52, Road 4/B, Surma R/A, Sylhet, Bangladesh',
      href: '#',
      accent: 'from-amber-500/30 to-orange-500/10',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200/70 bg-white/65 p-5 backdrop-blur-xl dark:border-white/12 dark:bg-white/6">
        <h2 className="text-2xl font-bold tracking-tight">Let&apos;s Connect</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Open to AI/ML opportunities, product collaborations, and practical problem-solving projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {contactInfo.map((contact, index) => (
          <motion.a
            key={contact.title}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/75 bg-white/60 p-4 backdrop-blur-xl transition-colors hover:bg-white/80 dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${contact.accent} opacity-60`}
            />
            <div className="relative flex items-start gap-3">
              <div className="rounded-xl border border-white/50 bg-white/70 p-2.5 shadow-sm dark:border-white/20 dark:bg-white/10">
                <contact.icon className="h-4 w-4 text-slate-800 dark:text-slate-100" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide text-slate-600 uppercase dark:text-slate-300">
                  {contact.title}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white break-words">
                  {contact.value}
                </p>
                <p className="mt-2 text-xs text-slate-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-300">
                  {contact.href === '#' ? 'Location details' : 'Open link'}
                </p>
                </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 text-sm text-slate-700 backdrop-blur-xl dark:border-white/12 dark:bg-white/6 dark:text-slate-200">
        <p className="font-semibold">Best fit opportunities</p>
        <p className="mt-1 text-muted-foreground">
          AI/ML engineering roles, NLP/LLM product work, and backend pipeline systems with measurable impact.
        </p>
      </div>
    </div>
  );
}
