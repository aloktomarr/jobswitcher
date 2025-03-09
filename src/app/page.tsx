"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import FeaturedJobs from "@/components/FeaturedJobs";
import JobCategories from "@/components/JobCategories";
import SearchBar from "@/components/SearchBar";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section - Updated with dark mode support */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Find Your Dream Job With JobSwitch
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Connect with top employers and discover opportunities that match your skills and aspirations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/jobs" className="btn-primary text-center">
                  Browse Jobs
                </Link>
                <Link href="/employers/post-job" className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700 rounded-full px-6 py-2 transition-all duration-300 text-center">
                  Post a Job
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/images/hero-illustration.svg"
                alt="Job search illustration"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="w-full py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Jobs</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover opportunities from top companies that are hiring right now
            </p>
          </div>
          <FeaturedJobs />
          <div className="text-center mt-10">
            <Link href="/jobs" className="btn-outline">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore jobs by industry and find the perfect role for your expertise
            </p>
          </div>
          <JobCategories />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How JobSwitch Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your journey to finding the perfect job is just a few steps away
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <Stats />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-blue-600 dark:bg-blue-700 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Career Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have found their dream jobs through JobSwitch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-3 font-medium transition-all duration-300">
              Create an Account
            </Link>
            <Link href="/employers/post-job" className="bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-900 text-white rounded-full px-8 py-3 font-medium transition-all duration-300">
              For Employers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
