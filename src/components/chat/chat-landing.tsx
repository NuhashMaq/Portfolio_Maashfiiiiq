'use client';

import { motion } from 'framer-motion';
import { Award, Code, GraduationCap, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  setInput?: (value: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery, setInput }) => {
  // Suggested questions that the user can click on
  const suggestedQuestions = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      text: 'Who are you?',
    },
    {
      icon: <Code className="h-4 w-4" />,
      text: 'What projects have you worked on?',
    },
    {
      icon: <Award className="h-4 w-4" />,
      text: 'What are your skills?',
    },
    {
      icon: <Mail className="h-4 w-4" />,
      text: 'How can I contact you?',
    },
  ];

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome message */}
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h2 className="mb-3 text-2xl font-semibold">
          I'm Mashfiq's digital twin
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md">
          Ask about my AI/ML work, projects, and experience.
        </p>
      </motion.div>

      {/* Suggested questions */}
      <motion.div
        className="w-full max-w-md space-y-3"
        variants={containerVariants}
      >
        {suggestedQuestions.map((question, index) => (
          <motion.button
            key={index}
            className="flex w-full items-center rounded-xl border border-slate-200/80 bg-white/45 px-4 py-2 backdrop-blur-md transition-colors hover:bg-white/70 dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/16"
            onClick={() => {
              submitQuery(question.text);
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-3 rounded-full border border-slate-200/80 bg-white/60 p-2 dark:border-white/15 dark:bg-white/10">
              {question.icon}
            </span>
            <span className="text-left">{question.text}</span>
          </motion.button>
        ))}
      </motion.div>

    </motion.div>
  );
};

export default ChatLanding;
