import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleEllipsis,
  CodeIcon,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  PartyPopper,
  Sparkles,
  UserRoundSearch,
  UserSearch,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
}

const questions = {
  Me: 'Who are you? Tell me about your background and current focus.',
  Projects: 'Show me your projects and what you are currently building.',
  Skills: 'Show me your core technical skills and tools.',
  Fun: 'Tell me the craziest thing you have done and your hobbies.',
  Contact: 'Show me your contact details and preferred collaboration types.',
};

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

// Helper drawer data
const specialQuestions = [
  'Who are you? Tell me about your background and current focus.',
  'Show me your projects and what you are currently building.',
  'Show me your core technical skills and tools.',
  'Show me your contact details and preferred collaboration types.',
  'Show me your resume and highlight key achievements.',
  'Tell me your work experience highlights.',
  'Tell me the craziest thing you have done and your hobbies.',
  'What sports do you follow or play?',
];

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
      "What is your educational background?",
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: CodeIcon,
    questions: [
      'Show me your projects and what you are currently building.',
    ],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: GraduationCapIcon,
    questions: [
      'Show me your core technical skills and tools.',
    ],
  },
  {
    id: 'fun',
    name: 'Fun',
    icon: PartyPopper,
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
      "What kind of project would make you say yes immediately?",
      'Where are you located and open to remote work?',
    ],
  },
];

// Animated Chevron component
const AnimatedChevron = () => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0], // Subtle up and down motion
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-primary mb-1.5"
    >
      <ChevronUp size={16} />
    </motion.div>
  );
};

export default function HelperBoost({
  submitQuery,
  setInput,
}: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);

  const handleQuestionClick = (questionKey: string) => {
    const question = questions[questionKey as keyof typeof questions];
    if (submitQuery) {
      submitQuery(question);
    }
  };

  const handleDrawerQuestionClick = (question: string) => {
    if (submitQuery) {
      submitQuery(question);
    }
    setOpen(false);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {/* Toggle Button */}
          <div
            className={
              isVisible
                ? 'mb-2 flex justify-center'
                : 'mb-0 flex justify-center'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 md:gap-1.5 md:px-4 md:py-1.5 md:text-sm"
            >
              {isVisible ? (
                <>
                  <ChevronDown size={14} />
                  Hide quick questions
                </>
              ) : (
                <>
                  <ChevronUp size={14} />
                  Show quick questions
                </>
              )}
            </button>
          </div>

          {/* HelperBoost Content */}
          {isVisible && (
            <div className="w-full">
              <div className="custom-scrollbar flex w-full flex-nowrap items-center justify-between gap-1 overflow-x-auto px-2 md:flex-wrap md:justify-center md:gap-2 md:overflow-visible md:px-2">
                {questionConfig.map(({ key, color, icon: Icon }) => (
                <Button
                  key={key}
                  onClick={() => handleQuestionClick(key)}
                  variant="outline"
                  className="h-8 w-auto shrink-0 cursor-pointer rounded-lg border border-slate-200/80 bg-white/45 px-2 py-0.5 shadow-none backdrop-blur-md transition-none hover:bg-white/65 active:scale-95 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/16 md:h-10 md:px-3.5 md:py-2"
                >
                  <div className="flex items-center justify-center gap-1.5 text-gray-900 dark:text-gray-100 md:gap-2">
                    <Icon size={14} strokeWidth={2} color={color} className="md:h-4 md:w-4" />
                    <span className="text-[11px] font-medium md:text-[13px]">{key}</span>
                  </div>
                </Button>
                ))}

                {/* Need Inspiration Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Drawer.Trigger className="group relative flex h-8 w-auto shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-white/45 px-2 py-0.5 backdrop-blur-md transition-all duration-200 hover:bg-white/65 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/16 md:h-10 md:px-3.5 md:py-2">
                      <motion.div
                        className="flex w-full items-center justify-center"
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-1.5 text-gray-900 dark:text-gray-100 md:gap-2">
                          <CircleEllipsis
                            className="h-3.5 w-3.5 text-primary dark:text-primary-light md:h-4 md:w-4"
                            strokeWidth={2}
                          />
                          <span className="text-[11px] font-medium md:text-[13px]">More</span>
                        </div>
                      </motion.div>
                      </Drawer.Trigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />

          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-background outline-none lg:h-[60%]">
            <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-card p-4">
              <div className="mx-auto max-w-md space-y-4">
                <div
                  aria-hidden
                  className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-muted"
                />
                <div className="mx-auto w-full max-w-md">
                  <div className="space-y-8 pb-16">
                    {questionsByCategory.map((category) => (
                      <CategorySection
                        key={category.id}
                        name={category.name}
                        Icon={category.icon}
                        questions={category.questions}
                        onQuestionClick={handleDrawerQuestionClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Component for each category section
interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: string[];
  onQuestionClick: (question: string) => void;
}

function CategorySection({
  name,
  Icon,
  questions,
  onQuestionClick,
}: CategorySectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 px-1">
        <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        {/* <Drawer.Title className="text-[22px] font-medium text-gray-900"> */}
        <Drawer.Title className="text-[22px] font-medium text-gray-900 dark:text-gray-100">
          {name}
        </Drawer.Title>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onClick={() => onQuestionClick(question)}
            isSpecial={specialQuestions.includes(question)}
          />
        ))}
      </div>
    </div>
  );
}

// Component for each question item with animated chevron
interface QuestionItemProps {
  question: string;
  onClick: () => void;
  isSpecial: boolean;
}

function QuestionItem({ question, onClick, isSpecial }: QuestionItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        'flex w-full items-center justify-between rounded-[10px]',
        'text-md px-6 py-4 text-left font-normal',
        'transition-colors duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isSpecial
          ? 'bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700' // lighter on hover for dark bg
          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200'
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        {isSpecial && <Sparkles className="mr-2 h-4 w-4 text-white" />}
        <span className={isSpecial ? 'font-medium text-white' : ''}>
          {question}
        </span>
      </div>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        <ChevronRight
          className={cn(
            'h-5 w-5 shrink-0',
            isSpecial ? 'text-white' : 'text-primary'
          )}
        />
      </motion.div>
    </motion.button>
  );
}