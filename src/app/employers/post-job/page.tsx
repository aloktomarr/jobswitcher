'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiDollarSign, FiMapPin, FiBriefcase, FiClock, FiTag, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'];
const categories = [
  { id: 'software-development', name: 'Software Development' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'customer-service', name: 'Customer Service' },
  { id: 'finance', name: 'Finance' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
];

export default function PostJobPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [skills, setSkills] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('');
  
  // Check if user is authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    router.push('/auth/login?redirect=/employers/post-job');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Basic validation
    if (!title || !company || !location || !type || !category || !description) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create job listing in Firestore
      const jobData = {
        title,
        company,
        location,
        type,
        category,
        experienceLevel,
        salary,
        description,
        requirements,
        benefits,
        skills: skills.split(',').map(skill => skill.trim()),
        applicationUrl,
        postedBy: session?.user?.email,
        postedDate: serverTimestamp(),
        status: 'active'
      };
      
      await addDoc(collection(db, 'jobs'), jobData);
      
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setCompany('');
      setLocation('');
      setType('');
      setCategory('');
      setExperienceLevel('');
      setSalary('');
      setDescription('');
      setRequirements('');
      setBenefits('');
      setSkills('');
      setApplicationUrl('');
      
      // Scroll to top
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Error posting job:', error);
      setError('An error occurred while posting the job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
          
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6">
              <p className="font-medium">Job posted successfully!</p>
              <p className="text-sm mt-1">Your job listing is now live and visible to job seekers.</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6 flex items-start">
              <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title *
                </label>
                <input
                  id="title"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Senior Frontend Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name *
                </label>
                <input
                  id="company"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location *
                </label>
                <div className="input-with-icon-container">
                  <div className="input-icon">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    className="input-field input-with-icon"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Type *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBriefcase className="text-gray-400" />
                  </div>
                  <select
                    id="type"
                    className="input-field pl-10 appearance-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTag className="text-gray-400" />
                  </div>
                  <select
                    id="category"
                    className="input-field pl-10 appearance-none"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiClock className="text-gray-400" />
                  </div>
                  <select
                    id="experience"
                    className="input-field pl-10 appearance-none"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salary Range
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  id="salary"
                  type="text"
                  className="input-field pl-10"
                  placeholder="e.g. $80K - $100K per year"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FiFileText className="text-gray-400" />
                </div>
                <textarea
                  id="description"
                  rows={6}
                  className="input-field pl-10"
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Requirements
              </label>
              <textarea
                id="requirements"
                rows={4}
                className="input-field"
                placeholder="List the requirements for this position..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Benefits
              </label>
              <textarea
                id="benefits"
                rows={4}
                className="input-field"
                placeholder="List the benefits offered with this position..."
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Required Skills (comma separated)
              </label>
              <input
                id="skills"
                type="text"
                className="input-field"
                placeholder="e.g. React, TypeScript, Node.js"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="application-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Application URL
              </label>
              <input
                id="application-url"
                type="url"
                className="input-field"
                placeholder="https://your-company.com/careers/job-application"
                value={applicationUrl}
                onChange={(e) => setApplicationUrl(e.target.value)}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Leave empty if you want candidates to apply through JobSwitch
              </p>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting Job...
                  </>
                ) : 'Post Job'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 