'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiBriefcase, FiGlobe, FiCheckCircle } from 'react-icons/fi';

const stats = [
  {
    id: 'users',
    label: 'Active Users',
    value: '250,000+',
    icon: <FiUsers size={24} />,
  },
  {
    id: 'jobs',
    label: 'Jobs Posted',
    value: '125,000+',
    icon: <FiBriefcase size={24} />,
  },
  {
    id: 'companies',
    label: 'Companies',
    value: '15,000+',
    icon: <FiGlobe size={24} />,
  },
  {
    id: 'hires',
    label: 'Successful Hires',
    value: '75,000+',
    icon: <FiCheckCircle size={24} />,
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
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

export default function Stats() {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {stats.map((stat) => (
        <motion.div 
          key={stat.id} 
          className="flex flex-col items-center text-center"
          variants={item}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mb-4 text-white/80">
            {stat.icon}
          </div>
          <div className="text-4xl font-bold mb-2">{stat.value}</div>
          <div className="text-white/80">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
} 