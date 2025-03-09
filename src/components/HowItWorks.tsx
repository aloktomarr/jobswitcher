'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiEdit, FiSend, FiCheckCircle } from 'react-icons/fi';

const steps = [
  {
    id: 1,
    title: 'Create an Account',
    description: 'Sign up for free and complete your profile with your skills and experience.',
    icon: <FiEdit size={24} />,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  },
  {
    id: 2,
    title: 'Find Relevant Jobs',
    description: 'Search and filter jobs based on your preferences and requirements.',
    icon: <FiSearch size={24} />,
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  },
  {
    id: 3,
    title: 'Apply with Ease',
    description: 'Submit your application with just a few clicks and track your status.',
    icon: <FiSend size={24} />,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
  },
  {
    id: 4,
    title: 'Get Hired',
    description: 'Interview with employers and land your dream job.',
    icon: <FiCheckCircle size={24} />,
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HowItWorks() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {steps.map((step) => (
        <motion.div 
          key={step.id} 
          className="flex flex-col items-center text-center"
          variants={item}
        >
          <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mb-4 relative`}>
            {step.icon}
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 dark:bg-white text-white dark:text-gray-800 flex items-center justify-center text-sm font-bold">
              {step.id}
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
} 

