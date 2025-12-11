import React from 'react';

/**
 * LoadingSpinner Component - Modern loading indicator
 */
const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-600`}></div>
      {text && <p className="mt-4 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
