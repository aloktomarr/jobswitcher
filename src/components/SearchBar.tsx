'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiMapPin, FiBriefcase } from 'react-icons/fi';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct search URL with parameters
    const params = new URLSearchParams();
    if (keyword) params.append('q', keyword);
    if (location) params.append('location', location);
    if (category) params.append('category', category);
    
    // Navigate to jobs page with search params
    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6"
    >
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
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
        
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiBriefcase className="text-gray-400" />
            </div>
            <select
              className="input-field pl-10 appearance-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="software-development">Software Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="customer-service">Customer Service</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="btn-primary md:w-auto w-full">
          Search Jobs
        </button>
      </form>
    </motion.div>
  );
} 