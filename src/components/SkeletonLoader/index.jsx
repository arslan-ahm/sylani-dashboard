import React from 'react';

/**
 * SkeletonLoader Component - Modern skeleton loading state
 */
const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
            <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
        );
      
      case 'table-row':
        return (
          <tr className="border-b">
            {[1, 2, 3, 4, 5].map((i) => (
              <td key={i} className="px-4 py-3">
                <div className="h-4 animate-pulse rounded bg-gray-200"></div>
              </td>
            ))}
          </tr>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};

export default SkeletonLoader;
