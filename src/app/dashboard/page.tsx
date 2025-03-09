'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBriefcase, FiBookmark, FiSettings, FiBell } from 'react-icons/fi';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                <FiUser size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{session?.user?.name || 'User'}</h2>
                <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                  <FiBriefcase size={20} />
                </div>
                <h3 className="text-lg font-semibold">Job Applications</h3>
              </div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">No applications yet</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3">
                  <FiBookmark size={20} />
                </div>
                <h3 className="text-lg font-semibold">Saved Jobs</h3>
              </div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">No saved jobs yet</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                  <FiBell size={20} />
                </div>
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">No notifications yet</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Recommended Jobs</h3>
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                We'll recommend jobs based on your profile and preferences.
              </p>
              <button 
                onClick={() => router.push('/jobs')}
                className="btn-primary mt-4"
              >
                Browse Jobs
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Complete Your Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Upload Resume</span>
                  <span className="text-red-500">Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Add Skills</span>
                  <span className="text-red-500">Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Work Experience</span>
                  <span className="text-red-500">Pending</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Education</span>
                  <span className="text-red-500">Pending</span>
                </div>
              </div>
              <button className="btn-outline w-full mt-4">
                Complete Profile
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Job Search Activity</h3>
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Your job search activity will appear here.
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Start by browsing and applying to jobs.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 