import Link from 'next/link';
import Image from 'next/image';
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image 
                src="/logo.svg" 
                alt="JobSwitch Logo" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">JobSwitch</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Connecting talented professionals with their dream careers. Find your next opportunity or the perfect candidate with JobSwitch.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <FiLinkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <FiTwitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <FiFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/saved-jobs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link href="/resources/resume-tips" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link href="/resources/career-advice" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/employers/post-job" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/employers/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/employers/resources" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/employers/success-stories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} JobSwitch. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 