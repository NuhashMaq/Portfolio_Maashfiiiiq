'use client';
import FluidCursor from '@/components/FluidCursor';
import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import ToolRenderer from '@/components/chat/tool-renderer';
import { Contact } from '@/components/contact';
import AboutPhotoAlbum from '../about-photo-album';
import AllProjects from '@/components/projects/AllProjects';
import Resume from '@/components/resume';
import Skills from '@/components/skills';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import WelcomeModal from '@/components/welcome-modal';
import {
  Github,
  Info,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react';
import { GithubButton } from '../ui/github-button';
import { ThemeToggle } from '../ui/ThemeToggle';
import HelperBoost from './HelperBoost';

const MOTION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

const Chat = () => {
  const getMessageText = (message: any) => {
    const parts = Array.isArray(message?.parts) ? message.parts : [];
    const textFromParts = parts
      .filter((part: any) => part?.type === 'text' && typeof part?.text === 'string')
      .map((part: any) => part.text)
      .join('\n')
      .trim();

    if (textFromParts.length > 0) return textFromParts;
    if (typeof message?.content === 'string') return message.content.trim();
    return '';
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('query');
  const [draftInput, setDraftInput] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const sentInitialQueryRef = useRef<string | null>(null);
  const isSendingRef = useRef(false);

  const chatApi = useChat({
    onResponse: (response: any) => {
      if (response) {
        setLoadingSubmit(false);
      }
    },
    onFinish: () => {
      setLoadingSubmit(false);
    },
    onError: (error: any) => {
      setLoadingSubmit(false);
      console.error('Chat error:', error.message, error.cause);
      toast.error(`Error: ${error.message}`);
    },
    onToolCall: (tool: any) => {
      const toolName = tool.toolCall.toolName;
      console.log('Tool call:', toolName);
    },
  } as any);

  const {
    messages,
    stop,
    regenerate: reload,
    sendMessage,
    addToolResult,
  } = chatApi as any;

  const isLoading = Boolean((chatApi as any)?.isLoading);

  const visibleMessages = useMemo(() => {
    return messages.filter((message: any) => {
      if (message?.role !== 'assistant' && message?.role !== 'user') return false;
      const hasToolResults =
        message?.role === 'assistant' &&
        Array.isArray(message?.parts) &&
        message.parts.some(
          (part: any) =>
            part?.type === 'tool-invocation' && part?.toolInvocation?.state === 'result'
        );
      return getMessageText(message).length > 0 || hasToolResults;
    });
  }, [messages]);

  const isToolInProgress = isLoading && messages.some(
    (m: any) =>
      m.role === 'assistant' &&
      m.parts?.some(
        (part: any) =>
          part.type === 'tool-invocation' &&
          part.toolInvocation?.state !== 'result'
      )
  );

  //@ts-ignore
  const submitQuery = (query) => {
    const normalizedQuery = query ?? '';
    if (!normalizedQuery.trim() || isSendingRef.current) return;
    isSendingRef.current = true;
    setLoadingSubmit(true);
    void sendMessage({ text: normalizedQuery }).finally(() => {
      isSendingRef.current = false;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftInput(e.target.value);
  };

  useEffect(() => {
    if (!initialQuery) return;

    const dedupeKey = `initial-query:${initialQuery}`;
    if (typeof window !== 'undefined') {
      const alreadySent = window.sessionStorage.getItem(dedupeKey);
      if (alreadySent === '1') return;
      window.sessionStorage.setItem(dedupeKey, '1');
    }

    if (sentInitialQueryRef.current === initialQuery) return;

    sentInitialQueryRef.current = initialQuery;
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/chat');
    }
    setDraftInput('');
    submitQuery(initialQuery);
  }, [initialQuery]);

  //@ts-ignore
  const onSubmit = (e) => {
    e.preventDefault();
    const normalizedInput = draftInput ?? '';
    if (!normalizedInput.trim()) return;
    submitQuery(normalizedInput);
    setDraftInput('');
  };

  const handleStop = () => {
    stop();
    setLoadingSubmit(false);
  };

  const isEmptyState = visibleMessages.length === 0 && !loadingSubmit;

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/mashfiqnaushad/', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://github.com/NuhashMaq', label: 'GitHub', icon: Github },
    { href: 'https://www.instagram.com/__maashfiiiiq__/', label: 'Instagram', icon: Instagram },
    { href: 'mailto:mashfiq.cse.ruet@gmail.com', label: 'Email', icon: Mail },
  ];

  return (
    <div className="chat-gpt-font relative isolate h-[100dvh] overflow-hidden overscroll-none bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-black dark:to-neutral-950">
      <div className="absolute top-5 right-4 z-51 flex items-center justify-center gap-1 md:right-8 md:flex-row">
        <ThemeToggle />
        <WelcomeModal
          trigger={
            <div className="cursor-pointer rounded-2xl px-2.5 py-1.5 transition-colors hover:bg-white/60 dark:hover:bg-white/10">
              <Info className="text-accent-foreground h-6" />
            </div>
          }
        />
        <GithubButton
          animationDuration={1.5}
          label="Star"
          size={'sm'}
          repoUrl="https://github.com/NuhashMaq"
        />
      </div>

      <div className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-black/70">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-3 md:px-4">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              aria-label="Go to landing page"
              className="rounded-full border border-slate-400/70 bg-white/70 p-1.5 shadow-lg backdrop-blur-xl transition-transform hover:scale-[1.03] hover:bg-white/85 dark:border-white/30 dark:bg-black/78 dark:hover:bg-black/85"
            >
              <Image
                src="/landing-memojis.png"
                alt="Mashfiq memoji"
                width={44}
                height={44}
                className="h-10 w-auto rounded-full object-contain"
                priority
              />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-full max-w-3xl flex-col">
        <div className="custom-scrollbar flex-1 overflow-y-auto px-2 pb-56 pt-18 md:px-3 md:pb-58">
          <AnimatePresence mode="popLayout">
            {isEmptyState ? (
              <motion.div
                key="landing"
                className="flex min-h-full items-center justify-center"
                {...MOTION_CONFIG}
              >
                <ChatLanding submitQuery={submitQuery} setInput={setDraftInput} />
              </motion.div>
            ) : (
              <div className="flex flex-col gap-5 px-1 py-3 md:px-2">
                {visibleMessages.map((message: any, index: number) => {
                  const toolInvocations =
                    message.parts
                      ?.filter(
                        (part: any) =>
                          part.type === 'tool-invocation' &&
                          part.toolInvocation?.state === 'result'
                      )
                      .map((part: any) =>
                        part.type === 'tool-invocation' ? part.toolInvocation : null
                      )
                      .filter(Boolean) || [];

                  const hasTool = toolInvocations.length > 0;

                  const previousMessage = index > 0 ? visibleMessages[index - 1] : null;
                  const previousUserText =
                    previousMessage?.role === 'user'
                      ? getMessageText(previousMessage).toLowerCase()
                      : '';

                  const shouldRenderProjectsFallback =
                    message.role === 'assistant' &&
                    !hasTool &&
                    /(project|projects|what are you working on)/.test(previousUserText);

                  const shouldRenderSkillsFallback =
                    message.role === 'assistant' &&
                    !hasTool &&
                    /(skill|skills|tech stack|hard skill|soft skill)/.test(previousUserText);

                  const shouldRenderResumeFallback =
                    message.role === 'assistant' &&
                    !hasTool &&
                    /(resume|cv|curriculum vitae)/.test(previousUserText);

                  const shouldRenderAboutMeAlbumFallback =
                    message.role === 'assistant' &&
                    !hasTool &&
                    /(who are you|about you|about yourself|tell me about yourself|yourself|about me|your photo|picture)/.test(previousUserText);

                  const shouldRenderContactFallback =
                    message.role === 'assistant' &&
                    !hasTool &&
                    /(contact|reach|email|linkedin|instagram|github)/.test(previousUserText);

                  return (
                    <motion.div key={message.id} {...MOTION_CONFIG}>
                      {message.role === 'assistant' && hasTool && (
                        <div className="mb-3">
                          <ToolRenderer
                            toolInvocations={toolInvocations as any[]}
                            messageId={message.id || 'assistant-tool'}
                          />
                        </div>
                      )}

                      {shouldRenderProjectsFallback && (
                        <div className="mb-3 w-full overflow-hidden rounded-lg">
                          <AllProjects />
                        </div>
                      )}

                      {shouldRenderSkillsFallback && (
                        <div className="mb-3 w-full overflow-hidden rounded-lg">
                          <Skills />
                        </div>
                      )}

                      {shouldRenderResumeFallback && (
                        <div className="mb-3 space-y-3">
                          <div className="w-full overflow-hidden rounded-lg">
                            <Resume />
                          </div>
                          <AboutPhotoAlbum compact />
                          <div className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm text-slate-700 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                            <p className="font-semibold">CV Snapshot</p>
                            <ul className="mt-2 list-disc space-y-1 pl-5">
                              <li>AI/ML Engineer focused on NLP, LLM pipelines, and deployment-ready systems.</li>
                              <li>Experience: BRITTOO.XYZ (AI/ML Engineer), VIVASOFT (Software Engineering Intern).</li>
                              <li>Strong stack: Python, FastAPI, Django, TensorFlow, HuggingFace, Go, PostgreSQL.</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {shouldRenderContactFallback && (
                        <div className="mb-3 w-full overflow-hidden rounded-lg">
                          <Contact />
                        </div>
                      )}

                      {shouldRenderAboutMeAlbumFallback && (
                        <div className="mb-3 w-full overflow-hidden rounded-lg">
                          <AboutPhotoAlbum />
                        </div>
                      )}

                      <ChatBubble
                        variant={message.role === 'user' ? 'sent' : 'received'}
                        className={message.role === 'user' ? 'justify-end' : ''}
                      >
                        {message.role === 'assistant' && (
                          <ChatBubbleAvatar
                            src="/landing-memojis.png"
                            fallback="M"
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        )}
                        <ChatBubbleMessage
                          className={
                            message.role === 'user'
                              ? 'max-w-[86%] rounded-2xl border border-cyan-300/60 bg-gradient-to-br from-cyan-200/55 via-sky-200/40 to-blue-200/35 px-4 py-2.5 text-[14px] text-slate-900 shadow-[0_8px_30px_rgba(14,116,144,0.16)] backdrop-blur-xl dark:border-cyan-300/25 dark:from-cyan-500/25 dark:via-sky-500/20 dark:to-blue-500/18 dark:text-slate-100 md:max-w-[76%] md:text-[14px]'
                              : 'max-w-full rounded-2xl border border-slate-200/80 bg-white/65 px-4 py-3 text-[14px] backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:text-[14px]'
                          }
                        >
                          <ChatMessageContent
                            message={message}
                            isLast={false}
                            isLoading={isLoading}
                            reload={reload}
                            addToolResult={addToolResult}
                          />
                        </ChatBubbleMessage>
                      </ChatBubble>
                    </motion.div>
                  );
                })}

                {loadingSubmit && (
                  <motion.div key="loading" {...MOTION_CONFIG} className="px-1">
                    <ChatBubble variant="received">
                      <ChatBubbleAvatar
                        src="/landing-memojis.png"
                        fallback="M"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <ChatBubbleMessage
                        isLoading
                        className="rounded-2xl border border-slate-200/80 bg-white/70 px-3 py-2 backdrop-blur-md dark:border-white/10 dark:bg-white/10"
                      />
                    </ChatBubble>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 px-2 pb-2 md:px-3 md:pb-3">
          <div className="pointer-events-auto mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white/72 p-2 backdrop-blur-2xl dark:border-white/12 dark:bg-black/58">
            <div className="px-1 pt-1">
              <HelperBoost submitQuery={submitQuery} setInput={setDraftInput} />
            </div>

            <div className="mt-2">
              <ChatBottombar
                input={draftInput}
                handleInputChange={handleInputChange}
                handleSubmit={onSubmit}
                isLoading={isLoading}
                stop={handleStop}
                isToolInProgress={isToolInProgress}
              />
            </div>

            <div className="mt-0.5 flex flex-wrap items-center justify-center gap-2 px-1 pb-1.5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/55 px-2.5 py-0.5 text-[11px] text-slate-700 transition hover:bg-white dark:border-white/12 dark:bg-white/6 dark:text-slate-200 md:gap-1.5 md:px-3.5 md:py-1 md:text-[13px]"
                >
                  <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
  </div>
      <FluidCursor />
    </div>
  );
};

export default Chat;
