'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiMapPin, FiClock, FiDollarSign, FiBookmark, FiBriefcase } from 'react-icons/fi';

// Mock data for featured jobs
const featuredJobs = [
  {
    id: 'job1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    logo: '/images/companies/techcorp.svg',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120K - $150K',
    posted: '2 days ago',
    featured: true,
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing user experiences.'
  },
  {
    id: 'job2',
    title: 'Product Designer',
    company: 'DesignHub',
    logo: '/images/companies/designhub.svg',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90K - $120K',
    posted: '1 day ago',
    featured: true,
    description: 'Join our design team to create beautiful and functional interfaces for our clients.'
  },
  {
    id: 'job3',
    title: 'DevOps Engineer',
    company: 'CloudSystems',
    logo: '/images/companies/cloudsystems.svg',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130K - $160K',
    posted: '3 days ago',
    featured: true,
    description: 'Help us build and maintain our cloud infrastructure and deployment pipelines.'
  },
  {
    id: 'job4',
    title: 'Marketing Manager',
    company: 'GrowthLabs',
    logo: '/images/companies/growthlabs.svg',
    location: 'Chicago, IL',
    type: 'Full-time',
    salary: '$85K - $110K',
    posted: '1 week ago',
    featured: true,
    description: 'Lead our marketing efforts to drive growth and brand awareness.'
  },
  {
    id: 'job5',
    title: 'Backend Developer',
    company: 'DataFlow',
    logo: '/images/companies/dataflow.svg',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110K - $140K',
    posted: '5 days ago',
    featured: true,
    description: 'Build robust and scalable backend systems for our data processing platform.'
  },
  {
    id: 'job6',
    title: 'UX Researcher',
    company: 'UserFirst',
    logo: '/images/companies/userfirst.svg',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$95K - $125K',
    posted: '2 days ago',
    featured: true,
    description: 'Conduct user research to inform our product design decisions.'
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

export default function FeaturedJobs() {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredJobs.map((job) => (
        <motion.div 
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="job-card"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 relative mr-4 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                <Image 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  width={40} 
                  height={40}
                  className="rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/company-placeholder.svg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{job.company}</h3>
              </div>
            </div>
            <button 
              onClick={() => toggleSaveJob(job.id)}
              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={savedJobs.includes(job.id) ? "Unsave job" : "Save job"}
            >
              <FiBookmark 
                size={20} 
                className={savedJobs.includes(job.id) ? "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" : ""} 
              />
            </button>
          </div>
          
          <Link href={`/jobs/${job.id}`} className="flex-grow">
            <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {job.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {job.description}
            </p>
          </Link>
          
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <FiMapPin className="mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <FiBriefcase className="mr-1" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <FiDollarSign className="mr-1" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center ml-auto">
                <FiClock className="mr-1" />
                <span>{job.posted}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 
