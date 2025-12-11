import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CourseData from './contexts/courseData';
import StdContext from './contexts/studentData';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StdContext>
          <CourseData>
            <App />
          </CourseData>
        </StdContext>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
