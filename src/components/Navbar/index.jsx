import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MenuOutlined, 
  BellOutlined, 
  UserOutlined, 
  SettingOutlined,
  LogoutOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import { Dropdown, Badge, Input, Avatar } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Modern Navbar Component
 */
const Navbar = ({ onMenuClick, collapsed }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = async ({ key }) => {
    if (key === 'logout') {
      await logout();
      navigate('/login');
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: currentUser?.email || 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm"
    >
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <MenuOutlined className="text-xl" />
          </button>

          {/* Logo/Title */}
          <div className="hidden md:block">
            <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              Sylani Dashboard
            </h2>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden flex-1 max-w-md px-4 md:block">
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search..."
            className="rounded-lg"
            size="large"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchVisible(!searchVisible)}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          >
            <SearchOutlined className="text-xl" />
          </button>

          {/* Notifications */}
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'New student registered',
                },
                {
                  key: '2',
                  label: 'Course updated',
                },
                {
                  key: '3',
                  label: 'System notification',
                },
              ],
            }}
            placement="bottomRight"
            trigger={['click']}
          >
            <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
              <Badge count={3} size="small">
                <BellOutlined className="text-xl" />
              </Badge>
            </button>
          </Dropdown>

          {/* User Profile */}
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            placement="bottomRight"
            trigger={['click']}
          >
            <button className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-100">
              {currentUser?.photoURL ? (
                <Avatar src={currentUser.photoURL} size={32} />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <UserOutlined />
                </div>
              )}
              <span className="hidden text-sm font-medium text-gray-700 md:block">
                {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Admin'}
              </span>
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-200 p-4 md:hidden"
        >
          <Input
            prefix={<SearchOutlined className="text-gray-400" />}
            placeholder="Search..."
            className="rounded-lg"
            autoFocus
          />
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;