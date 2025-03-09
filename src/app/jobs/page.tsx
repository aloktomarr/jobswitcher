'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiMapPin, FiFilter, FiDollarSign, FiClock, FiBookmark, FiBriefcase, FiX } from 'react-icons/fi';

// Mock data for jobs
import { jobs } from '@/app/jobs/jobs';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [jobType, setJobType] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState('');
  const [datePosted, setDatePosted] = useState('');
  
  useEffect(() => {
    // Filter jobs based on search parameters
    let results = [...jobs];
    
    if (keyword) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(keyword.toLowerCase()) || 
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    if (location) {
      results = results.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (category) {
      results = results.filter(job => job.category === category);
    }
    
    if (jobType.length > 0) {
      results = results.filter(job => jobType.includes(job.type));
    }
    
    if (experienceLevel.length > 0) {
      results = results.filter(job => experienceLevel.includes(job.experienceLevel));
    }
    
    if (salaryRange) {
      // Implement salary range filtering logic
      // This would depend on how your salary data is structured
    }
    
    if (datePosted) {
      const now = new Date();
      const days = parseInt(datePosted);
      const cutoffDate = new Date(now.setDate(now.getDate() - days));
      
      results = results.filter(job => {
        const postedDate = new Date(job.postedDate);
        return postedDate >= cutoffDate;
      });
    }
    
    setFilteredJobs(results);
  }, [keyword, location, category, jobType, experienceLevel, salaryRange, datePosted]);
  
  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId]
    );
  };
  
  const toggleJobTypeFilter = (type: string) => {
    setJobType(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const toggleExperienceLevelFilter = (level: string) => {
    setExperienceLevel(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const clearFilters = () => {
    setKeyword('');
    setLocation('');
    setCategory('');
    setJobType([]);
    setExperienceLevel([]);
    setSalaryRange('');
    setDatePosted('');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="input-field pl-10"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  className="input-field pl-10"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            <button 
              type="button" 
              className="md:hidden btn-outline flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
          </form>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile */}
          {isFilterOpen && (
            <motion.div 
              className="md:hidden fixed inset-0 bg-gray-900/50 z-50 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="w-4/5 bg-white dark:bg-gray-800 h-full overflow-y-auto p-6"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                
                {/* Filter content - same as desktop */}
                {/* ... */}
              </motion.div>
            </motion.div>
          )}
          
          {/* Filters - Desktop */}
          <div className="hidden md:block w-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all
              </button>
            </div>
            
            {/* Job Type */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Job Type</h3>
              <div className="space-y-2">
                {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={jobType.includes(type)}
                      onChange={() => toggleJobTypeFilter(type)}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Experience Level */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Experience Level</h3>
              <div className="space-y-2">
                {['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={experienceLevel.includes(level)}
                      onChange={() => toggleExperienceLevelFilter(level)}
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Salary Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Salary Range</h3>
              <select
                className="input-field"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              >
                <option value="">Any Salary</option>
                <option value="0-50000">$0 - $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000-150000">$100,000 - $150,000</option>
                <option value="150000+">$150,000+</option>
              </select>
            </div>
            
            {/* Date Posted */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Date Posted</h3>
              <select
                className="input-field"
                value={datePosted}
                onChange={(e) => setDatePosted(e.target.value)}
              >
                <option value="">Any Time</option>
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </div>
          </div>
          
          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {filteredJobs.length} Jobs Found
              </h1>
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-400 mr-2">Sort by:</span>
                <select className="input-field py-1 px-3">
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Highest Salary</option>
                </select>
              </div>
            </div>
            
            {filteredJobs.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  <FiSearch size={48} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
                <button 
                  onClick={clearFilters}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
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
                            src={job.logo || '/images/company-placeholder.svg'} 
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
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center">
                              <FiClock className="mr-1" />
                              {job.postedDate}
                            </span>
                          </div>
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
                    
                    <Link href={`/jobs/${job.id}`} className="block">
                      <h2 className="text-xl font-bold mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {job.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {job.description}
                      </p>
                    </Link>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 