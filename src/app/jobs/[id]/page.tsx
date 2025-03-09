'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiDollarSign, FiBriefcase, FiShare2, FiBookmark, FiArrowLeft, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applicationError, setApplicationError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = await getDoc(doc(db, 'jobs', id as string));
        
        if (jobDoc.exists()) {
          setJob({ id: jobDoc.id, ...jobDoc.data() });
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchJob();
    }
    
    // Pre-fill form if user is logged in
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [id, session]);
  
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      router.push(`/auth/login?redirect=/jobs/${id}`);
      return;
    }
    
    setApplicationError('');
    setIsApplying(true);
    
    try {
      // Basic validation
      if (!name || !email || !coverLetter) {
        setApplicationError('Please fill in all required fields');
        setIsApplying(false);
        return;
      }
      
      // Submit application to Firestore
      await addDoc(collection(db, 'applications'), {
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        applicantId: session.user.id,
        name,
        email,
        phone,
        coverLetter,
        resumeUrl,
        status: 'pending',
        appliedAt: serverTimestamp()
      });
      
      setApplicationSuccess(true);
      
      // Reset form
      setPhone('');
      setCoverLetter('');
      setResumeUrl('');
      
      // Scroll to top
      window.scrollTo(0, 0);
      
    } catch (err) {
      console.error('Error submitting application:', err);
      setApplicationError('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };
  
  const toggleSaveJob = () => {
    setIsSaved(!isSaved);
    // In a real app, you would save this to the user's profile in Firestore
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Link href="/jobs" className="btn-primary">
            Browse Other Jobs
          </Link>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link href="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <Link href="/jobs" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <FiArrowLeft size={16} className="mr-2" />
            Back to Jobs
          </Link>
        </div>
        
        {applicationSuccess && (
          <motion.div 
            className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6 flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiCheck size={20} className="mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Application Submitted Successfully!</p>
              <p className="text-sm">We've sent a confirmation email with more details.</p>
            </div>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Job Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative mr-4 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      <Image 
                        src={job.logo || '/images/company-placeholder.svg'} 
                        alt={`${job.company} logo`} 
                        width={64} 
                        height={64}
                        className="rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/company-placeholder.svg';
                        }}
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={toggleSaveJob}
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label={isSaved ? "Unsave job" : "Save job"}
                    >
                      <FiBookmark 
                        size={20} 
                        className={isSaved ? "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400" : ""} 
                      />
                    </button>
                    <button 
                      className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Share job"
                    >
                      <FiShare2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
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
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{job.postedDate ? new Date(job.postedDate.toDate()).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              </div>
              
              {/* Job Description */}
              <div className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <p className="whitespace-pre-line">{job.description}</p>
                  
                  {job.requirements && (
                    <>
                      <h2 className="text-xl font-semibold mt-8 mb-4">Requirements</h2>
                      <p className="whitespace-pre-line">{job.requirements}</p>
                    </>
                  )}
                  
                  {job.benefits && (
                    <>
                      <h2 className="text-xl font-semibold mt-8 mb-4">Benefits</h2>
                      <p className="whitespace-pre-line">{job.benefits}</p>
                    </>
                  )}
                </div>
                
                {job.skills && job.skills.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div>
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-6">Apply for this position</h2>
              
              {applicationError && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md mb-4 flex items-center">
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                  <span>{applicationError}</span>
                </div>
              )}
              
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="input-field"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cover Letter *
                  </label>
                  <textarea
                    id="cover-letter"
                    rows={5}
                    className="input-field"
                    placeholder="Why are you interested in this position?"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Resume URL
                  </label>
                  <input
                    id="resume"
                    type="url"
                    className="input-field"
                    placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Provide a link to your resume or portfolio
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center"
                  disabled={isApplying}
                >
                  {isApplying ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Apply Now'}
                </button>
                
                {job.applicationUrl && (
                  <div className="text-center mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
                    <a 
                      href={job.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mt-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Apply on Company Website
                    </a>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 