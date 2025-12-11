import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from './Dashboard';
import Student from './Dashboard/Student/StudentNew';
import Course from './Dashboard/Course/CourseNew';
import Login from './Login';

function Router() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* Public Route - Login */}
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/" replace /> : <Login />} 
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <Student />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course"
        element={
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route
        path="/*"
        element={
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[500px] flex-col items-center justify-center"
          >
            <div className="text-center">
              <h1 className="mb-4 text-9xl font-bold text-gray-300">404</h1>
              <h2 className="mb-2 text-3xl font-semibold text-gray-800">Page Not Found</h2>
              <p className="mb-8 text-gray-600">
                The page you're looking for doesn't exist.
              </p>
              <a
                href="/"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-all hover:from-blue-700 hover:to-purple-700"
              >
                Go Back Home
              </a>
            </div>
          </motion.div>
        }
      />
    </Routes>
  );
}

export default Router;
