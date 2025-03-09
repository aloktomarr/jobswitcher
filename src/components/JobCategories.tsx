'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiCode, 
  FiPenTool, 
  FiBarChart2, 
  FiDollarSign, 
  FiHeadphones, 
  FiDatabase, 
  FiTrendingUp, 
  FiUsers 
} from 'react-icons/fi';

const categories = [
  {
    id: 'software-development',
    name: 'Software Development',
    icon: <FiCode size={24} />,
    count: 1243,
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
  },
  {
    id: 'design',
    name: 'Design',
    icon: <FiPenTool size={24} />,
    count: 857,
    color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <FiBarChart2 size={24} />,
    count: 623,
    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
  },
  {
    id: 'sales',
    name: 'Sales',
    icon: <FiTrendingUp size={24} />,
    count: 578,
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    icon: <FiHeadphones size={24} />,
    count: 412,
    color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: <FiDollarSign size={24} />,
    count: 324,
    color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 'data',
    name: 'Data Science',
    icon: <FiDatabase size={24} />,
    count: 289,
    color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
  },
  {
    id: 'hr',
    name: 'Human Resources',
    icon: <FiUsers size={24} />,
    count: 176,
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function JobCategories() {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={item}>
          <Link 
            href={`/jobs?category=${category.id}`}
            className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-4`}>
              {category.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{category.count} jobs available</p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
} 