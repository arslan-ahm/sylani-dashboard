import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ApartmentOutlined,
  HomeOutlined,
  TeamOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import Router from './pages/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();
  
  // Don't show layout on login page
  const isLoginPage = location.pathname === '/login';

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: '/student',
      label: <Link to="/student">Students</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: '/course',
      label: <Link to="/course">Courses</Link>,
      icon: <ApartmentOutlined />,
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  // If on login page, just render the router without layout
  if (isLoginPage) {
    return (
      <>
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  }

  return (
    <Layout className="min-h-screen">
      {/* Desktop Sidebar */}
      {currentUser && (
        <div className="hidden md:block">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="fixed left-0 top-0 z-40 h-screen overflow-auto shadow-lg"
            width={240}
          >
            {/* Logo Section */}
            <div className="flex h-16 items-center justify-center border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
              {!collapsed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <h1 className="text-xl font-bold text-white">Sylani</h1>
                  <p className="text-xs text-white/80">Admin Portal</p>
                </motion.div>
              ) : (
                <HomeOutlined className="text-2xl text-white" />
              )}
            </div>

            {/* User Info */}
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-gray-700 p-4"
              >
                <p className="text-sm text-gray-300">Welcome,</p>
                <p className="text-lg font-semibold text-white">Administrator</p>
              </motion.div>
            )}

            {/* Menu */}
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="border-0 bg-transparent"
            />
          </Sider>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {currentUser && (
        <AnimatePresence>
          {mobileMenuVisible && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'tween' }}
                className="fixed left-0 top-0 z-50 h-screen w-64 bg-gray-900 shadow-2xl md:hidden"
              >
                {/* Mobile Logo */}
                <div className="flex h-16 items-center justify-center border-b border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
                  <div className="text-center">
                    <h1 className="text-xl font-bold text-white">Sylani</h1>
                    <p className="text-xs text-white/80">Admin Portal</p>
                  </div>
                </div>

                {/* Mobile Menu */}
                <Menu
                  theme="dark"
                  mode="inline"
                  selectedKeys={[location.pathname]}
                  items={menuItems}
                  onClick={toggleMobileMenu}
                  className="border-0 bg-transparent"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}

      {/* Main Layout */}
      <Layout className={currentUser ? "md:ml-[240px]" : ""}>
        {/* Navbar */}
        {currentUser && (
          <Navbar
            onMenuClick={() => {
              if (window.innerWidth < 768) {
                toggleMobileMenu();
              } else {
                setCollapsed(!collapsed);
              }
            }}
            collapsed={collapsed}
          />
        )}

        {/* Content Area */}
        <Content className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Router />
          </motion.div>
        </Content>

        {/* Footer */}
        {currentUser && <Footer />}
      </Layout>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
};

export default App;
