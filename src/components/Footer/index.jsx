import React, { useState, useEffect } from 'react';
import { GithubOutlined, HeartFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { GITHUB_USERNAME } from '../../utils/constants';

const Footer = () => {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const githubUsername = GITHUB_USERNAME;

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        const data = await response.json();
        setGithubData(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [githubUsername]);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 py-4 md:py-6">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <span>© {currentYear} Sylani Dashboard.</span>
            <span className="hidden sm:inline">Made with</span>
            <HeartFilled className="text-red-500" />
            <span className="hidden sm:inline">for education</span>
          </motion.div>

          {/* GitHub Profile Section */}
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
            </div>
          ) : githubData ? (
            <motion.a
              href={githubData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm transition-all hover:shadow-md"
            >
              <img
                src={githubData.avatar_url}
                alt={githubData.name || githubData.login}
                className="h-8 w-8 rounded-full border-2 border-gray-200"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {githubData.name || githubData.login}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <GithubOutlined />
                  <span>@{githubData.login}</span>
                </span>
              </div>
            </motion.a>
          ) : (
            <motion.a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <GithubOutlined className="text-lg" />
              <span>@{githubUsername}</span>
            </motion.a>
          )}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-center text-xs text-gray-500"
        >
          <p>All rights reserved. Built with React, Firebase & Ant Design</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;