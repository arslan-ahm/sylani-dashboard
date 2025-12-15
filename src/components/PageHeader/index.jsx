import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageHeader Component - Modern page header with breadcrumbs
 */
const PageHeader = ({ title, subtitle, actions, breadcrumbs = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-3 flex text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              <span className={index === breadcrumbs.length - 1 ? 'font-medium text-gray-900' : ''}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Header Content */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-xs sm:text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex flex-wrap gap-3">
            {actions}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </motion.div>
  );
};

export default PageHeader;
