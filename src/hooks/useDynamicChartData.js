import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Custom hook to get dynamic chart data from Firebase
 */
export const useDynamicChartData = () => {
  const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);
  const [courseStatusData, setCourseStatusData] = useState({ inProgress: 0, completed: 0, upcoming: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);

        // Fetch students for enrollment trends
        const studentsSnapshot = await getDocs(collection(db, 'students'));
        const students = [];
        studentsSnapshot.forEach((doc) => {
          students.push({ id: doc.id, ...doc.data() });
        });

        // Group students by month from enrolledDate
        const monthlyData = Array(12).fill(0);
        students.forEach((student) => {
          if (student.enrolledDate) {
            const date = new Date(student.enrolledDate);
            const month = date.getMonth();
            monthlyData[month]++;
          }
        });
        setStudentEnrollmentData(monthlyData);

        // Fetch courses for status distribution
        const coursesSnapshot = await getDocs(collection(db, 'courses'));
        const courses = [];
        coursesSnapshot.forEach((doc) => {
          courses.push({ id: doc.id, ...doc.data() });
        });

        // Calculate course status
        const now = new Date();
        let inProgress = 0;
        let completed = 0;
        let upcoming = 0;

        courses.forEach((course) => {
          if (course.startDate && course.endDate) {
            const start = new Date(course.startDate);
            const end = new Date(course.endDate);

            if (now >= start && now <= end) {
              inProgress++;
            } else if (now > end) {
              completed++;
            } else {
              upcoming++;
            }
          }
        });

        setCourseStatusData({ inProgress, completed, upcoming });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return { studentEnrollmentData, courseStatusData, loading };
};
