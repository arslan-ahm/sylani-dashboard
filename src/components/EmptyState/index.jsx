import { motion } from 'framer-motion';
import { InboxOutlined } from '@ant-design/icons';

/**
 * EmptyState Component - Beautiful empty state UI
 */
const EmptyState = ({ 
  icon: Icon = InboxOutlined, 
  title = 'No Data Available',
  description = 'There is no data to display at the moment.',
  action,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      {/* Icon */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 p-6"
      >
        <Icon className="text-5xl text-gray-400" />
      </motion.div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-gray-700">{title}</h3>

      {/* Description */}
      <p className="mb-6 max-w-sm text-sm text-gray-500">{description}</p>

      {/* Action Button (if provided) */}
      {action && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;
