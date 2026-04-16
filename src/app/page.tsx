'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/ui/github-button';
import WelcomeModal from '@/components/welcome-modal';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import {
  ArrowRight,
  Github,
  Info,
  Instagram,
  Linkedin,
  Mail,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
  UserSearch,
  BriefcaseIcon,
  CodeIcon,
  GraduationCapIcon,
  PartyPopper as PartyPopperIcon,
  MailIcon,
  CircleEllipsis,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle'; // Import the theme toggle
import AttachTools from '@/components/chat/attach-tools';
import { Drawer } from 'vaul';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const maellen = localFont({
  src: './fonts/Maellen-e9j06.otf',
  display: 'swap',
});

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: 'What’s the craziest thing you’ve ever done? What are your hobbies?',
  Contact: 'How can I contact you?',
} as const;

const specialQuestions = [
  'Who are you? Tell me about your background and current focus.',
  'Show me your projects and what you are currently building.',
  'Show me your core technical skills and tools.',
  'Show me your contact details and preferred collaboration types.',
  'Show me your resume and highlight key achievements.',
  'Tell me your work experience highlights.',
  'Tell me the craziest thing you have done and your hobbies.',
  'What sports do you follow or play?',
] as const;

const questionsByCategory = [
  {
    id: 'me',
    name: 'Me',
    icon: UserSearch,
    questions: [
      'Who are you? Tell me about your background and current focus.',
      'What are your strongest interests in AI/ML right now?',
      'How did you get started in tech?',
      'What is your long-term direction as an engineer?',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: BriefcaseIcon,
    questions: [
      'Show me your resume and highlight key achievements.',
      'Tell me your work experience highlights.',
      'What makes you a valuable team member?',
      'Why should I hire you for AI/ML and backend roles?',
      'What is your educational background?',
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: CodeIcon,
    questions: ['Show me your projects and what you are currently building.'],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: GraduationCapIcon,
    questions: ['Show me your core technical skills and tools.'],
  },
  {
    id: 'fun',
    name: 'Fun',
    icon: PartyPopperIcon,
    questions: [
      'Tell me the craziest thing you have done and your hobbies.',
      'What sports do you follow or play?',
      'What kind of challenges do you enjoy outside work?',
    ],
  },
  {
    id: 'contact',
    name: 'Contact & Future',
    icon: MailIcon,
    questions: [
      'Show me your contact details and preferred collaboration types.',
      'What kind of project would make you say yes immediately?',
      'Where are you located and open to remote work?',
    ],
  },
] as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

const socialLinks = [
  { href: 'https://www.linkedin.com/in/mashfiqnaushad/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://github.com/NuhashMaq', label: 'GitHub', icon: Github },
  { href: 'https://www.instagram.com/__maashfiiiiq__/', label: 'Instagram', icon: Instagram },
  { href: 'mailto:mashfiq.cse.ruet@gmail.com', label: 'Email', icon: Mail },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToChat = (query: string) =>
    router.push(`/chat?query=${encodeURIComponent(query)}`);

  const handleDrawerQuestionClick = (question: string) => {
    setIsMoreDrawerOpen(false);
    goToChat(question);
  };

  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8 },
    },
  };
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8, delay: 0.2 },
    },
  };

  useEffect(() => {
    // Précharger les assets du chat en arrière-plan
    const img = new window.Image();
    img.src = '/landing-memojis.png';

    // Précharger les vidéos aussi
    const linkWebm = document.createElement('link');
    linkWebm.rel = 'preload'; // Note: prefetch au lieu de preload
    linkWebm.as = 'video';
    linkWebm.href = '/final_memojis.webm';
    document.head.appendChild(linkWebm);

    const linkMp4 = document.createElement('link');
    linkMp4.rel = 'prefetch';
    linkMp4.as = 'video';
    linkMp4.href = '/final_memojis_ios.mp4';
    document.head.appendChild(linkMp4);
  }, []);

  return (
    <div className="relative flex h-[100dvh] flex-col items-center justify-start overflow-hidden px-4 pt-20 pb-4 md:justify-between md:pt-6 md:pb-10">
      {/* GitHub button */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-2">
        <ThemeToggle />
        <WelcomeModal
          trigger={
            <div className="cursor-pointer rounded-2xl px-2.5 py-1.5 transition-colors hover:bg-white/60 dark:hover:bg-white/10">
              <Info className="text-accent-foreground h-6" />
            </div>
          }
        />
        <GithubButton
          //targetStars={69}
          animationDuration={1.5}
          label="Star"
          size={'sm'}
          repoUrl="https://github.com/NuhashMaq"
        />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => goToChat('Are you looking for an internship?')}
          className="relative flex cursor-pointer items-center gap-2 rounded-full border border-neutral-400 bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Looking for a talent?
        </button>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-28 mb-1 flex flex-col items-center text-center md:mt-26 md:mb-2"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className="w-12 md:w-14 lg:w-16"
            priority
          />
        </div>

        <h2 className="text-secondary-foreground mt-1 w-full text-center text-2xl font-semibold md:text-2xl">
          <span className="font-bold">Hey, I&apos;m</span>
        </h2>
        <h2 className={`${maellen.className} text-secondary-foreground mt-6 w-full text-center text-5xl tracking-[0.1em] font-normal md:mt-6 md:text-6xl`}>
          Mashfiq Naushad
        </h2>
        <h1 className="mt-3 w-full text-center text-4xl font-bold sm:text-5xl md:mt-4 md:text-6xl lg:text-7xl">
          AI Engineer
        </h1>
      </motion.div>

      {/* centre memoji */}
      <div className="relative z-10 mt-15 h-52 w-52 sm:h-56 sm:w-56 md:-mt-3 md:h-64 md:w-64">
        <Image
          src="/landing-memojis.png"
          alt="Hero memoji"
          width={2000}
          height={2000}
          priority
          className="translate-y-1 scale-[1.2] object-cover"
        />
      </div>

      {/* input + quick buttons */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="fixed right-0 bottom-3 left-0 z-20 flex w-full flex-col items-center justify-center px-3 md:static md:z-10 md:-mt-10 md:px-0"
      >
        {/* quick-question grid */}
        <div className="mt-2 flex w-full max-w-2xl flex-nowrap items-center justify-center gap-1.5 overflow-x-auto pb-1 sm:gap-2">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => goToChat(questions[key])}
              variant="outline"
              className="h-9 w-auto shrink-0 cursor-pointer rounded-lg border border-neutral-300 bg-white/28 px-2.5 py-1.5 shadow-none backdrop-blur-md transition-colors hover:bg-white/45 active:scale-95 dark:border-white/40 md:h-10 md:px-3 md:py-2"
            >
              <div className="flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-100 md:gap-2">
                <Icon
                  className="h-4 w-4 md:h-4 md:w-4"
                  strokeWidth={2}
                  color={color}
                />
                <span className="text-[12px] leading-none font-medium md:text-[13px]">
                  {key}
                </span>
              </div>
            </Button>
          ))}

          <Drawer.Root open={isMoreDrawerOpen} onOpenChange={setIsMoreDrawerOpen}>
            <Drawer.Trigger asChild>
              <Button
                variant="outline"
                aria-label="Open more quick questions"
                className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-neutral-300 bg-white/28 p-0 shadow-none backdrop-blur-md transition-colors hover:bg-white/45 active:scale-95 dark:border-white/40 md:h-10 md:w-10"
              >
                <div className="flex items-center justify-center text-gray-700 dark:text-gray-100">
                  <CircleEllipsis className="h-4 w-4" strokeWidth={2} />
                </div>
              </Button>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs" />
              <Drawer.Content className="fixed right-0 bottom-0 left-0 z-[130] mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-background outline-none lg:h-[60%]">
                <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-card p-4">
                  <div className="mx-auto max-w-md space-y-4">
                    <div
                      aria-hidden
                      className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-muted"
                    />
                    <div className="mx-auto w-full max-w-md">
                      <div className="space-y-8 pb-16">
                        {questionsByCategory.map((category) => (
                          <div key={category.id} className="space-y-3">
                            <div className="flex items-center gap-2.5 px-1">
                              <category.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                              <Drawer.Title className="text-[22px] font-medium text-gray-900 dark:text-gray-100">
                                {category.name}
                              </Drawer.Title>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3">
                              {category.questions.map((question) => {
                                const isSpecial = specialQuestions.includes(
                                  question as (typeof specialQuestions)[number],
                                );

                                return (
                                  <button
                                    key={question}
                                    onClick={() => handleDrawerQuestionClick(question)}
                                    className={cn(
                                      'flex w-full items-center justify-between rounded-[10px] text-md px-6 py-4 text-left font-normal transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                                      isSpecial
                                        ? 'bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700'
                                        : 'bg-secondary text-foreground hover:bg-secondary/80',
                                    )}
                                  >
                                    <span className="pr-3">{question}</span>
                                    <ChevronRight className="h-5 w-5 shrink-0 opacity-70" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* free-form question */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) goToChat(input.trim());
          }}
          className="relative mt-2 w-full max-w-lg"
        >
          <div className="mx-auto flex items-center gap-2 rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-3 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <AttachTools compact showOnboardingHint hintScope="landing" />

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight  className="h-5 w-5" />
            </button>
          </div>
        </form>

        <div className="mt-2 flex w-full max-w-lg flex-wrap items-center justify-center gap-1.5 px-1">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white/30 px-2.5 py-1.5 text-[11px] text-slate-700 backdrop-blur-md transition-colors hover:bg-white/50 dark:border-white/20 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20 md:gap-1.5 md:px-3 md:py-1.5 md:text-xs"
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </motion.div>
      <FluidCursor />
    </div>
  );
}
