import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * StatsCard Component - Modern card for displaying statistics
 */
const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  link, 
  color = 'blue',
  trend,
  loading = false 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
  };

  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br ${colorClasses[color]} p-4 sm:p-5 md:p-6 shadow-medium transition-all duration-300`}
    >
      {/* Background Pattern */}
      <div className="absolute right-0 top-0 opacity-10">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="white" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
            {Icon && <Icon className="h-8 w-8 text-white" />}
          </div>
          {trend && (
            <div className={`flex items-center text-sm font-medium text-white ${
              trend > 0 ? 'opacity-100' : 'opacity-70'
            }`}>
              <span>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="h-8 w-24 animate-pulse rounded bg-white/30"></div>
            <div className="h-4 w-32 animate-pulse rounded bg-white/20"></div>
          </div>
        ) : (
          <>
            <h3 className="mb-1 text-3xl sm:text-4xl font-bold text-white">{value}</h3>
            <p className="text-xs sm:text-sm font-medium text-white/90">{title}</p>
          </>
        )}
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" 
           style={{ transform: 'skewX(-20deg) translateX(-100%)' }} />
    </motion.div>
  );

  if (link) {
    return <Link to={link}>{cardContent}</Link>;
  }

  return cardContent;
};

export default StatsCard;
